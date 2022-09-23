const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/order.js')
const auth = require('../middleware/auth')

router.post("/order",  OrderController.newOrder )
//admin can watch user  ordered products
router.get("/:id", OrderController.getSingleOrder ) //for admin
router.delete("/:id", OrderController.deleteOrder ) // for admin

module.exports = router;