const jwt = require("jsonwebtoken")
const User = require('../models/user')

const userExtractor = async (req, res, next) => {
    if (req.token) {
    
        // Decode token
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if (!decodedToken.id) {
            console.log('no id in token');
            return res.status(401).json({error: 'invalid token'})
        }
  
        // Find user and assign to request
        const user = await User.findById(decodedToken.id)
        req.user = user
    }
    next()
}

module.exports = userExtractor