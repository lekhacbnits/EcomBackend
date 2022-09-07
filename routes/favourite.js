const express = require('express')
const favouriteController = require('../controllers/favourite.js')
const router = express.Router()

router.post("/favourite", favouriteController.addFavourite)
router.post("/getfavourite", favouriteController.getFavourite)
router.post("/deletefavourite", favouriteController.deleteFavouriteItem)

module.exports = router