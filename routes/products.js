const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/products.js')
const authorisedRole = require('../middleware/role')


// router.get("/getfashion", productController.getfashion)
// router.get("/addfashion", productController.addfashion)
// router.get("/updatefashion", productController.updatefashion)
// router.get("/deletefashion", productController.deletefashion)

// router.get("/addgrocery", productController.addgrocery)
// router.get("/getgroceries", productController.getgroceries)
// router.get("/updategrocery", productController.updategrocery)
// router.get("/deletegrocery", productController.deletegrocery)

// router.get("/addelectronic", productController.addelectronic)
// router.get("/getelectronics", productController.getelectronics)
// router.get("/updateelectronic", productController.updateelectronic)
// router.get("/deleteelectronic", productController.deleteelectronic)

// router.get("/addcosmetic", productController.addcosmetic)
// router.get("/getcosmetics", productController.getcosmetics)
// router.get("/updatecosmetic", productController.updatecosmetic)
// router.get("/deletecosmetic", productController.deletecosmetic)


//products section
router.post('/createproducts', ProductController.createProduct)
router.get('/getallproducts', ProductController.getAllProducts)
router.get('/product/:id', ProductController.getproductdetails)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)



// router.get('/getProducts', ProductController.getProducts )
// router.get("/:id", ProductController.getProduct)

// router.get("/", (req, res, next)=>{
//     res.json("hello offers")
//     console.log("this is offer products")
//     next()
// })
module.exports = router