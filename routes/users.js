const express = require('express')
const userController = require('../controllers/users')
const router = express.Router()

//router.post("/signup", userController.signUp)

router.get("/deleteuser", userController.deleteUser)
router.get("/users", userController.getUser)
module.exports = router