const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const routes = require('./routes')
require('./config/mongoose') // 引用mongoose 連線設定

const app = express()
const PORT = 3001

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs') 

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)


app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})