const express = require('express')
const exphbs = require('express-handlebars')


require('./config/mongoose') // 引用mongoose 連線設定

const app = express()
const PORT = 3001

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs') 






app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})