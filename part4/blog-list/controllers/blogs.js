const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const foundBlog = await Blog.findByIdAndRemove(id)
  if (foundBlog) {
    response.json(foundBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const objToAdd = request.body
  if (!objToAdd.likes) {
    objToAdd.likes = 0
  }
  const blog = new Blog(objToAdd)
  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch(err) {
    if (err.name === "ValidationError") {
      response.status(400).end()
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