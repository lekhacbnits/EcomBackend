const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/order.js')
const auth = require('../middleware/auth')

router.post("/order",  OrderController.newOrder )
//admin can watch user  ordered products
router.post("/:id", OrderController.getSingleOrder ) //for admin
router.post("/my/:id", OrderController.myOrders ) //for user ordered
// router.post("/allorders", OrderController.getallorders ) // for admin



module.exports = router;