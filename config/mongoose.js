const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI_TRACKER)

const db = mongoose.connection

db.on('err', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

module.exports = db