const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

// 登入 使用 passport驗證
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

// 送出註冊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  // 檢查是否註冊
  User.findOne({ email })
    .then(user => {
      // 已經註冊過了
      if (user) {
        console.log('this email already exists.')
        res.render('register', {
          name, 
          email, 
          password, 
          confirmPassword
        })
      } else {
        // 還沒註冊過 新增
        return User.create({ 
          name,
          email,
          password
        })
          .then(() => res.redirect('/users/login'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router