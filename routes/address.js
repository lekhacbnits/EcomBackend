const express = require('express')
const addressController = require('../controllers/address')
const router = express.Router()

router.post("/address", addressController.address)


module.exports = router