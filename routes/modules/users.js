const express = require('express')
const passport = require('passport')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

// 登入 使用 passport驗證
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureFlash: true,
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

// 送出註冊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都要填寫'})
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼不相符合！'})
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  // 檢查是否註冊
  User.findOne({ email })
    .then(user => {
      // 已經註冊過了
      if (user) {
        errors.push({ message: "此 Email 已經註冊過了"})
        res.render('register', {
          errors,
          name, 
          email, 
          password, 
          confirmPassword
        })
      } 
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/users/login'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出')
  res.redirect('/users/login')
})

module.exports = router