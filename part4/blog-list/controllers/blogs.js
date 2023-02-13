const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
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
    console.log(err.name);
    if (err.name === "ValidationError") {
      console.log('validation error detected');
      response.status(400).end()
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

module.exports = blogsRouter