const express = require('express')
const userController = require('../controllers/users')
const profileController = require('../controllers/profile')

const router = express.Router()
const auth = require('../middleware/auth')
// router.post("/signup", userController.signUp)

//router.get("/deleteuser", userController.deleteUser)
router.post("/getUser", userController.getUser)
router.post("/updateUser", userController.updateUser)
router.post("/updatePhoto", userController.updatePicture)
 router.get("/loggedUser", userController.loggedUser)
 router.get("/admin/:id", userController.getUserDetails)

router.post("/resetPassEmail", userController.resetPassEmail)
router.post("/resetPass/:_id/:token", userController.resetPass)
//  router.post("/profilePhoto", profileController.profilePhoto)
//router.put("/:id", profileController.updateProfile)
router.get("/userOrders", profileController.userOrders) // logged users can see all the orders
router.put('/review', profileController.createreview)
router.get('/allreviews', profileController.allreviews)
router.delete('/deletereview', profileController.deletereviews)

//admin 
router.get("/orders", profileController.gelallorders ) // for admin
router.put("/:id", profileController.OrderUpdate ) // for admin


module.exports = router