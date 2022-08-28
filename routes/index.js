// 總路由器
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const ledger = require('./modules/ledger')
const users = require('./modules/users')

const { authenticator } = require('../middleware/auth') // 把驗證登入狀態 middleware載入 

router.use('/ledger', authenticator, ledger)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router