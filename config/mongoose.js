const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const MONGODB_URI_TRACKER = process.env.MONGODB_URI_TRACKER

mongoose.connect(MONGODB_URI_TRACKER)

const db = mongoose.connection

db.on('err', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

module.exports = db