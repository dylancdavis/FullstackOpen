const blogsRouter = require('express').Router()
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
  const objToAdd = request.body
  
  // add likes field if it does not exist
  if (!objToAdd.likes) {
    objToAdd.likes = 0
  }

  // Get user to add to blog (any user)
  const creator = await User.findOne({})

  objToAdd.user = creator
  
  // Save blog to schema
  const blog = new Blog(objToAdd)
  try {
    const result = await blog.save()

    // use blogs id to save to creator
    creator.blogs = creator.blogs.concat(result.id)
    creator.save()

    response.status(201).json(result)
  } catch(err) {
    if (err.name === "ValidationError") {
      response.status(400).json({error: `Validation error: ${err.message}`})
    }
  }
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