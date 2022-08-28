const express = require('express')
const router = express.Router()

// 引入 record model
const Record = require('../../models/record')

//{ name: 'eric', date: '2022-08-01', category: '4', amount: '2' }

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, date, category, amount } = req.body
  return Record.create({ name, date, categoryId: category, amount})
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
  })

// edit頁面
router.get('/:id/edit', (req, res) => {
  let _id = req.params.id
  Record.findOne({ _id })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(err => console.log(err))
})

// 更新資料路由
router.put('/:id', (req, res) => {
  const _id = req.params.id
  return Record.findOneAndUpdate({ _id }, { ...req.body })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})




module.exports = router