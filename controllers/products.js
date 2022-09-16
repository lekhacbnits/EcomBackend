const Product = require('../models/products')
const express = require('express')
const jwt = require("jsonwebtoken");
const ErrorHandler = require('../utils/errorhandler');
const config = process.env;
const catchAsyncErrors = require('../middleware/catchAsyncError')
const ApiFeatures = require('../utils/apifeatures')
const adminAuth = require('../middleware/adminAuth')
const User = require('../models/users')

// const adminRole = require('../middleware/role')
//const mongoose = require('mongoose')

//Fashion CRUD
// module.exports.getfashion = (req, res)=>{
//     res.json("inside getfashion controllers")
// }
// module.exports.addfashion = (req, res)=>{
//     res.json("inside addfashion product controllers")
// }
// module.exports.updatefashion = (req, res)=>{
//    res.json("inside updatefashion product controllers")
// }
//    module.exports.deletefashion = (req, res)=>{
//     res.json("inside deletefashion product controllers")
// }

//Grocery CRUD
// module.exports.getgroceries = (req, res)=>{
//     res.json("inside getgroceries controllers")
//    }
//    module.exports.updategrocery = (req, res)=>{
//     res.json("inside updategrocery controllers")
//    }
//    module.exports.deletegrocery = (req, res)=>{
//     res.json("inside deletegrocery controllers")
//    }
//    module.exports.addgrocery = (req, res)=>{
//     res.json("inside addgrocery controllers")
//    }

//electronics CRUD
// module.exports.getelectronics = (req, res)=>{
//    res.json("inside getelectronics controllers")
//     }
// module.exports.addelectronic = (req, res)=>{
//     res.json("inside addelectronic controllers")
//     }
// module.exports.deleteelectronic = (req, res)=>{
//    res.json("inside deleteelectronic controllers")
//     }
// module.exports.updateelectronic = (req, res)=>{
//    res.json("inside updateelectronic controllers")
// }

//Cosmetics CRUD
// module.exports.getcosmetics = (req, res)=>{
//     res.json("inside getcosmetics controllers")
// }            
// module.exports.addcosmetic = (req, res)=>{
//     res.json("inside addcosmetic controllers")
// }
// module.exports.updatecosmetic = (req, res)=>{
//     res.json("inside updatecosmetic controllers")
// }
// module.exports.deletecosmetic = (req, res)=>{
//     res.json("inside deletecosmetic controllers")
// }

//create product api --Admin
module.exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    const authHeader = req.headers.authorization
    const token = authHeader.split(" ")[1]
  
    const varifytoken = jwt.verify(token,config.TOKEN_KEY );
    const rootUser = await User.findOne({id: varifytoken.user_id})
    req.body.user = rootUser._id

    const product = await Product.create(req.body);
    res.status(201).json({
       success:true,
       product
   });
});

//get products api with filter, search pagination option
module.exports.getAllProducts = catchAsyncErrors(async (req, res, next)=>{
   const resultPerpage = 5;
   // const productCount = await Product.countDocuments();
   let apiFeatures = new ApiFeatures(Product.find(), req.query)
   .search()
   .filter()
   .pagination(resultPerpage)
   const getproducts = await apiFeatures.query
   // Product.find()
   res.status(201).json({
       success:true,
       getproducts,
       // productCount
   })
});

////get product details 
module.exports.getproductdetails = catchAsyncErrors(async (req, res, next)=>{
   const getproduct = await Product.findById(req.params.id)
   if(!getproduct){
       // res.status(500).json({
       //     success:false,
       //     message: "product not fount"
       // })
       return next(new ErrorHandler("Product not found", 404));
   }
   return res.status(200).json({
       success:true,
       getproduct 

   })
})

//get products api --user site
// module.exports.getProducts = async (req,res) =>{
//    try {
//         const products  =  await Product.find({ });
//         res.json(products)
//         // console.log(products);
    
//    } catch (error) {
//     console.log(error);
//    }
// };

//update product
module.exports.updateProduct = catchAsyncErrors(async (req,res,next) =>{
   let product = await Product.findById(req.params.id);
   if(!product){
       // return res.status(500).json({
       //     success:false,
       //     message: "product not found"
       // })
       return next(new ErrorHandler("Product not found", 404));

   }
   product = await Product.findByIdAndUpdate( req.params.id, req.body, {
       new: true,
       runValidators: true,
       useFindAndModify: false,
   });

   return res.status(200).json({
       success: true,
       product,
   });
   
})

//delete product
module.exports.deleteProduct = catchAsyncErrors(async (req,res, next) =>{
   let product = await Product.findById(req.body.id);
   if(!product){
       // return res.status(500).json({
       //     success:false,
       //     message: "product not found"
       // })
       return next(new ErrorHandler("Product not found", 404));

   }
   await Product.deleteOne()
   return res.status(200).json({
       success: true,
       message: "product deleted successfully"
   });
})





// module.exports.getProduct = async (req,res) =>{
//     console.log(req.params);

//     try {
//          const product  =  await Product.findOne({ 'id': req.params.id });
//          res.json(product)
//         //  
//     } catch (error) {
//      console.log(error);
       

//     }
   
//  };
 