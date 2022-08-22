const express = require('express')
const productController = require('../controllers/products.js')
const router = express.Router()

router.get("/getfashion", productController.getfashion)
router.get("/addfashion", productController.addfashion)
router.get("/updatefashion", productController.updatefashion)
router.get("/deletefashion", productController.deletefashion)

router.get("/addgrocery", productController.addgrocery)
router.get("/getgroceries", productController.getgroceries)
router.get("/updategrocery", productController.updategrocery)
router.get("/deletegrocery", productController.deletegrocery)

router.get("/addelectronic", productController.addelectronic)
router.get("/getelectronics", productController.getelectronics)
router.get("/updateelectronic", productController.updateelectronic)
router.get("/deleteelectronic", productController.deleteelectronic)

router.get("/addcosmetic", productController.addcosmetic)
router.get("/getcosmetics", productController.getcosmetics)
router.get("/updatecosmetic", productController.updatecosmetic)
router.get("/deletecosmetic", productController.deletecosmetic)



router.get('/getProducts', productController.getProducts )
router.get("/:id", productController.getProduct)

// router.get("/", (req, res, next)=>{
//     res.json("hello offers")
//     console.log("this is offer products")
//     next()
// })
module.exports = router