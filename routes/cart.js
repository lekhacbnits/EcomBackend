const express = require('express')
const cartController = require('../controllers/cart.js')
const router = express.Router()

router.post("/cart", cartController.getCart)
router.post("/deletecart", cartController.deleteCartItem)

module.exports = router