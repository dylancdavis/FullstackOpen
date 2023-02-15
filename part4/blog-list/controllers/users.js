const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (req, res) => {

    const { username, name, password } = req.body;
    const minlength = 3;

    if (!username || !password) return res.status(400).json({error: 'Missing username or password in request'})
    if (username.length < minlength) return res.status(400).json({error: `Username must be at least ${minlength} characters long`})
    if (password.length < minlength) return res.status(400).json({error: `Password must be at least ${minlength} characters long`})

    const userExists = await User.findOne({ username })
    if (userExists) return res.status(400).json({error: 'Username already exists'})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const blogs = []

    const user = new User({username, name, passwordHash, blogs})

    const ret = await user.save()

    res.status(201).json(ret)
})

userRouter.get('/', async (req, res) => {
    const users = await User
        .find({})
        .populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    res.json(users)
})

userRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const foundUser = await User
      .findById(id)
      .populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    if (foundUser) {
      res.json(foundUser)
    } else {
      res.status(404).end()
    }
  })

module.exports = userRouter