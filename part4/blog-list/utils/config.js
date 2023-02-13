require('dotenv').config()

const PORT = 3003
const MONGO_URI = process.env.MONGO_URI

module.exports = {PORT, MONGO_URI}