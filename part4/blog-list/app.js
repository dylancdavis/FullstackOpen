const http = require('http')
const express = require('express')
const app = express()
const config = require('./utils/config')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.MONGO_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app