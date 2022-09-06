const express = require('express')
const userController = require('../controllers/users')
const profileController = require('../controllers/profile')

const router = express.Router()

//router.post("/signup", userController.signUp)

router.get("/deleteuser", userController.deleteUser)
router.get("/users", userController.getUser)
 router.get("/loggedUser", userController.loggedUser)
router.post("/resetPassEmail", userController.resetPassEmail)
router.post("/resetPass/:_id/:token", userController.resetPass)
// router.get("/edit", profileController.editloading)
router.put("/:id", profileController.updateProfile)

module.exports = router