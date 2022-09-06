const express = require('express')
const cartController = require('../controllers/cart.js')
const router = express.Router()

router.post("/cart", cartController.addCart)
router.put("/updatecart", cartController.updateCart)
router.post("/getcart", cartController.getCart)
router.post("/deletecart", cartController.deleteCartItem)

module.exports = router