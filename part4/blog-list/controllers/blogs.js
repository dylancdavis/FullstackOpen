const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const userExtractor = require("../utils/userExtractor");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const foundBlog = await Blog.findById(id).populate("user", {
    username: 1,
    name: 1,
  });
  if (foundBlog) {
    response.json(foundBlog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  if (!request.token)
    return response.status(400).json({ error: "missing token" });
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id)
    return response.status(401).json({ error: "invalid token" });

  // Find creator and extract blog
  const creator = await User.findById(decodedToken.id);
  const blogToAdd = request.body;

  // Populate likes and user fields of blog
  if (!blogToAdd.likes) blogToAdd.likes = 0;
  blogToAdd.user = creator._id;
  blogToAdd.comments = [];

  // Save blog to database
  const blog = new Blog(blogToAdd);
  const result = await (await blog.save()).populate("user");

  // Save blog ID to creator in database
  creator.blogs = creator.blogs.concat(result.id);
  creator.save();

  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  // Return error if no token provided
  if (!request.token)
    return response.status(400).json({ error: "missing token" });

  // Decode token and throw erorr for invalid format
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id)
    return response.status(401).json({ error: "invalid token" });

  // Search for the blog, send 204 if not found
  const blog = await Blog.findById(request.params.id).populate("user");
  if (!blog) return response.status(204).end();

  // If found, check permissions by comparing IDs, otherwise 401 unauthorized
  if (decodedToken.id !== blog.user.id) {
    return response.status(401).json({
      error: `unauthorized: not note owner. owner is ${blog.user.id}, token says ${decodedToken.id}`,
    });
  }

  // If allowed, delete and return 204 no content
  await Blog.findByIdAndRemove(blog.id);
  return response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const updated = await Blog.findByIdAndUpdate(id, request.body, { new: true });
  if (updated) {
    response.json(updated);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const id = request.params.id;
  const foundBlog = await Blog.findById(id);
  console.log("foundBlog:", foundBlog);

  if (foundBlog) {
    const comment = request.body.text;
    const newComments = { comments: [...foundBlog.comments, comment] };
    console.log("new comments", newComments);

    const updated = await Blog.findByIdAndUpdate(id, newComments, {
      new: true,
    });
    response.json(updated);
  } else {
    response.status(400).end();
  }
});

module.exports = blogsRouter;
