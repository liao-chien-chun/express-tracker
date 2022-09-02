const Category = require('../category')
const db = require('../../config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const CATEGORY = [
  { id: 1, name: '家居物業', icon: 'fa-solid fa-house' },
  { id: 2, name: '交通出行', icon: 'fa-solid fa-van-shuttle'},
  { id: 3, name: '休閒娛樂', icon: 'fa-solid fa-face-grin-beam'},
  { id: 4, name: '餐飲食品', icon: 'fa-solid fa-utensils'},
  { id: 5, name: '其他', icon: 'fa-solid fa-pen'},
]

db.once('open', () => {
  console.log('開始建立分類資料')
  Promise.all(Array.from(CATEGORY, CategorySEED => Category.create(CategorySEED)))
    .then(() => {
      console.log('done')
      process.exit()
    })
})