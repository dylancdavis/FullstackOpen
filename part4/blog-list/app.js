const http = require('http')
const express = require('express')
require('express-async-errors')
const app = express()
const config = require('./utils/config')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const tokenFromReqest = require('./utils/tokenExtractor')
const errorHandler = require('./utils/errorHandler.js')

mongoose.connect(config.MONGO_URI)

app.use(cors())
app.use(express.json())
app.use(tokenFromReqest)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)



module.exports = app