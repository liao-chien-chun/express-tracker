const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USER = {
    name: '廣志',
    email: 'user1@example.com',
    password: '123',
}

const SEED_EXPENSE = [
  { name: '早餐', date: '2022-08-30', amount: 50, categoryID: 4 },
  { name: '坐車', date: '2022-08-30', amount: 30, categoryID: 2 },
  { name: '看電影', date: '2022-08-30', amount: 200, categoryID: 3 },
]

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      Promise.all(Array.from(SEED_EXPENSE, expense => {
        const { name, date, amount, categoryID } = expense
        Category.findOne({ id: categoryID })
          .then(category => {
            const categoryId = category._id
            Record.create({
              name,
              date,
              amount,
              categoryId,
              userId
            })
          })
      }))
    }) 
})