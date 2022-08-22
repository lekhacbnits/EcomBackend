const express = require('express')
const paymentController = require('../controllers/payment.js')
const router = express.Router()

router.post("/paytmpayment", paymentController.paytmpayment)

module.exports = router