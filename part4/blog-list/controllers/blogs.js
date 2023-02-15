const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const foundBlog = await Blog
    .findById(id)
    .populate('user', { username: 1, name: 1})
  if (foundBlog) {
    response.json(foundBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {

  if (!request.token) return response.status(400).json({error: 'missing token or incorrect authorization scheme'})
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) return response.status(401).json({error: 'invalid token'})

  // Find creator and extract blog
  console.log('decoded id:',decodedToken.id);
  const creator = await User.findById(decodedToken.id)
  const blogToAdd = request.body
  
  // Populate likes and user fields of blog
  if (!blogToAdd.likes) blogToAdd.likes = 0
  console.log("creator:",creator);
  blogToAdd.user = creator._id
  
  // Save blog to database
  const blog = new Blog(blogToAdd)
  const result = await blog.save()

  // Save blog ID to creator in database
  creator.blogs = creator.blogs.concat(result.id)
  creator.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const updated = await Blog.findByIdAndUpdate(id, request.body, {new: true})
  if (updated) {
    response.json(updated)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter