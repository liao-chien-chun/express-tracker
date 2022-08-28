// 總路由器
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const ledger = require('./modules/ledger')
const users = require('./modules/users')

router.use('/', home)
router.use('/ledger', ledger)
router.use('/users', users)

module.exports = router