const express = require('express')
const paymentController = require('../controllers/payment.js')
const router = express.Router()

// router.post("/paytmpayment", paymentController.paytmpayment)
router.post("/pay", paymentController.paypalpayment)
router.post("/success", paymentController.successpaypalpayment)
router.post("/cancel", paymentController.cancelpaypalpayment)

module.exports = router