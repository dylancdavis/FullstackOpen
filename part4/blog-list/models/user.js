const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    name: String,
    passwordHash: {
      type: String,
      required: true
    }
  }
)

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User