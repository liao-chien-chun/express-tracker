// 總路由器
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const ledger = require('./modules/ledger')

router.use('/', home)
router.use('/ledger', ledger)

module.exports = router