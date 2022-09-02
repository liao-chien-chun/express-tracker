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
  { name: '早餐', date: '2022-08-30', amount: 50, categoryID: 4, categoryIcon: 'fa-solid fa-utensils' },
  { name: '坐車', date: '2022-08-30', amount: 30, categoryID: 2, categoryIcon: 'fa-solid fa-van-shuttle' },
  { name: '看電影', date: '2022-08-30', amount: 200, categoryID: 3, categoryIcon: 'fa-solid fa-face-grin-beam' },
]

db.once('open', async () => {
  console.log('開始建立record 種子資料')
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(SEED_USER.password, salt)
  const user = await User.create({
                name: SEED_USER.name,
                email: SEED_USER.email,
                password: hash
              })
  const userId = user._id
  for (const expense of SEED_EXPENSE) {
    const { name, date, amount, categoryID, categoryIcon } = expense
    const category = await Category.findOne({ id: categoryID })
    const categoryId = category._id
    const record = await Record.create(
    {
      name,
      date,
      amount,
      categoryId,
      categoryIcon,
      userId
    })
    console.log('record created!')
  }

  console.log('done')
  process.exit()
})