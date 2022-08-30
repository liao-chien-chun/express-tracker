const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

const routes = require('./routes')
require('./config/mongoose') // 引用mongoose 連線設定
const usePassport = require('./config/passport')

const app = express()
const PORT = 3001

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs') 

// middleware
app.use(session({
  secret: "ThisIsEricSecret",
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)  // 使用驗證機制
app.use(flash())
app.use((req, res, next) => {   // 設定本地變數 res.locals
  res.locals.isAuthenticated = req.isAuthenticated() // 驗證會回傳true or false
  res.locals.user = req.user  // 使用者資料交接給 res使用
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)


app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})