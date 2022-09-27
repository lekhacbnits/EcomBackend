const express = require('express')
const stripeController = require('../controllers/stripe')
const router = express.Router()

router.post("/pay", stripeController.stripePay)


module.exports = router