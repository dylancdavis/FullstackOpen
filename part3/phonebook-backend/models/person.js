const mongoose = require('mongoose')
require('dotenv').config()

// const url=`mongodb+srv://dylcdav:${password}@phonebook.hjrjhsm.mongodb.net/?retryWrites=true&w=majority`
const url= process.env.MONGO_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 3,
      required: true,
    },
    number: {
      type: String,
      minLength: 8,
      required: true,
      validate: {
        validator: v => {
          if (v.includes('-')) {
            // Case: contains a hyphen
            const splitByHyphen = v.split('-')
            if (splitByHyphen.length > 2) return false // test for number of hypens
            if (splitByHyphen[0].length < 2 || splitByHyphen[0].length > 3 ) return false // test for length of first part
            return (/^\d+$/.test(splitByHyphen[0]) && /^\d+$/.test(splitByHyphen[1])) // test if number
          } else {
            return /^\d+$/.test(v)
          }
        },
        message: () => 'Incorrect phone number format'
        }
    }
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