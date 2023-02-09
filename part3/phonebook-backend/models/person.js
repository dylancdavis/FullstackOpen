const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

// const url=`mongodb+srv://dylcdav:${password}@phonebook.hjrjhsm.mongodb.net/?retryWrites=true&w=majority`
const url= process.env.MONGO_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

const Person = mongoose.model('Person', personSchema)
module.exports = Person