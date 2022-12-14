const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    index: true,
    required: true
  },
  categoryIcon: {
    type: String,
    required: true
  },
  userId: {  // 關聯使用者
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
})

module.exports = mongoose.model('Record', recordSchema)