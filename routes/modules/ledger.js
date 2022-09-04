const express = require('express')
const router = express.Router()

// 引入 record model
const Record = require('../../models/record')
const Category = require('../../models/category')


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
      const categoryIcon = category.icon
      return Record.create({ name, date, categoryId, amount, userId, categoryIcon})
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
      const categoryId = record.categoryId
      Category.findOne({ _id: categoryId })
        .lean()
        .then(category => {
          res.render('edit', { record, category })
        })
    })
})

// 更新資料路由
router.put('/:id', (req, res) => {
  const userId = req.user._id     // 拿到此登入使用者的_id
  const _id = req.params.id       // 此筆紀錄的_id
  const id = req.body.categoriesId  // 拿到category 資料表裡此分類的 id
  Category.findOne({ id })         // 找出此分類
    .then(category => {
      const category_id = category._id   
      const categoryIcon = category.icon
      const { name, date, amount } = req.body
      return Record.findOneAndUpdate({ _id, userId }, {
        name,
        date,
        amount,
        categoryIcon,
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