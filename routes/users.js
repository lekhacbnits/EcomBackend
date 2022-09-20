const express = require('express')
const userController = require('../controllers/users')
const profileController = require('../controllers/profile')

const router = express.Router()
const auth = require('../middleware/auth')
// router.post("/signup", userController.signUp)

//router.get("/deleteuser", userController.deleteUser)
router.get("/users", userController.getUser)
// router.post("/updateUser", userController.updateUser)
 router.get("/loggedUser", userController.loggedUser)
 router.get("/admin/:id", userController.getUserDetails)

router.post("/resetPassEmail", userController.resetPassEmail)
router.post("/resetPass/:_id/:token", userController.resetPass)
// router.get("/edit", profileController.editloading)
router.put("/:id", profileController.updateProfile)
router.put("/admin/:id", userController.updateUserByAdmin)
router.delete("/admin/:id", userController.deleteUser)


module.exports = router