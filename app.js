const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

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
usePassport(app) 
app.use(routes)


app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})