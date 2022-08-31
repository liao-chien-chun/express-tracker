const express = require('express')
const router = express.Router()

// 引入 record model
const Record = require('../../models/record')
const Category = require('../../models/category')
const category = require('../../models/category')

//{ name: 'eric', date: '2022-08-01', category: '4', amount: '2' }

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  const { name, date, categoriesId, amount } = req.body
  const id = Number(categoriesId)
  Category.findOne({ id })
    .lean()
    .then(category => {
      const categoryId = category._id
      return Record.create({ name, date, categoryId, amount, userId})
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

// edit頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  let _id = req.params.id
  Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      res.render('edit', { record })
    })
})

// 更新資料路由
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const id = req.body.categoriesId
  Category.findOne({ id })
    .then(category => {
      const category_id = category._id
      const { name, date, amount } = req.body
      return Record.findOneAndUpdate({ _id, userId }, {
        name,
        date,
        amount,
        categoryId: category_id
      })
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 刪除
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})



module.exports = router