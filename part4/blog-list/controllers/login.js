const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body

    // Check that username exists
    const user = await User.findOne({username})
    if (!user) return res.status(401).json({error: "username not found"})

    // Compare password
    const passwordHash = user.passwordHash
    const passwordCorrect = await bcrypt.compare(password, passwordHash)

    // Return error if incorrect password
    if (!passwordCorrect) return res.status(401).json({error: "incorrect password"})

    // Username and password correct
    const userForToken = {username: user.username, id: user._id}

    // Create token
    const token = jwt.sign(userForToken, process.env.SECRET)

    // Send token
    res.status(200).send({token, username: user.username, name: user.name})
})

module.exports = loginRouter