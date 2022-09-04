const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  const select = req.query.select
  let title = '類別'
  let totalAmount = 0
  if(!select) {
    Record.find({ userId })
    .lean()
    .sort({ _id: 'desc' })
    .then(records =>{ 
      records.filter(record => {
        totalAmount += record.amount
      })
      return res.render('index', { records, totalAmount, title })
    })
    .catch(err => console.log(err))
  } else {
    Category.findOne({ id: select })
      .then(category => {
        const categoryId = category._id
        const categoryName = category.name
        let title = categoryName
        Record.find({ categoryId, userId })
          .lean()
          .then(records => {
            records.filter(record => {
              totalAmount += record.amount
            })
             return res.render('index', { records, totalAmount, title })
          })
      })
  }
})


  



module.exports = router