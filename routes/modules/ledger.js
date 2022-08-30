const express = require('express')
const router = express.Router()

// 引入 record model
const Record = require('../../models/record')
const Category = require('../../models/category')

//{ name: 'eric', date: '2022-08-01', category: '4', amount: '2' }

router.get('/new', (req, res) => {
  res.render('new')
})

// { name: '買蘋果', date: '2022-09-01', category: '4', amount: '12' }
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
    .then(record => res.render('edit', { record }))
    .catch(err => console.log(err))
})

// 更新資料路由
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOneAndUpdate({ _id, userId }, { ...req.body })
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