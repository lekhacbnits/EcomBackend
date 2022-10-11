const express = require('express')
const profilepicController = require('../controllers/profilepic')
const router = express.Router()


router.put("/photo", profilepicController.photo ) // for user to update profile pic
module.exports = router