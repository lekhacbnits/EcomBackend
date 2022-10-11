const Order = require('../models/order')
const Product = require('../models/products')
const catchAsyncErrors = require('../middleware/catchAsyncError')
const ErrorHandler = require('../utils/errorhandler')
const ApiFeatures = require('../utils/apifeatures')
const path = require('path');
const multer = require('multer')
const User = require('../models/users')

// const fileStorageEngine = multer.diskStorage({
//     destination:(req, file, cb)=>{
//         cb(null, path.join(__dirname, '../../front/public/Image/'));
//     },
//     filename:(req, file, cb)=>{
//         cb(null, '--'+file.originalname)
//     }
// })
// const upload = multer({storage: fileStorageEngine})
// //app.post('/post', upload.single('image'), (req, res)=>{
//     module.exports.profilePhoto = upload.single('image'),(req, res)=>{
//         // const { id, filePath } = req.body;
//         // User.findByIdAndUpdate((id), {$set:{photo:URL.createObjectURL(filePath)}})
//             res.send('one file uploaded')
// }
// module.exports.updateProfile = async (req,res)=>{
//     const id = req.params.id
// //    console.log(id)
//    User.findOneAndUpdate({_id:req.params.id}, {
//     $set:{
//        name: req.body.name,
//        email: req.body.email,
//       contact:req.body.contact
//     }
//    }).then(result =>{
//     res.status(200).json({
//         updated_products: result
//     })
//    }).catch(err=>{
//     console.log(err)
//     res.status(500).json({
//         error:err
//     })
//    })
// }


// // module.exports.updateUser = async(req, res) => {
// //   const { name,  contact,  address, zipcode } = req.body;
// //   await User.findByIdAndUpdate ((req.body.id), {$set:{name:name, contact:contact, address:address, zipcode:zipcode}})
// //   res.json("updated user document")
// // }


//logged in user orders
exports.userOrders = catchAsyncErrors(async(req,res, next) =>{
    const orders = await Order.find({user: req.user._id});

    res.status(200).json({
        success :true,
        orders,
    });
    next()
})

//create new review or update the review
module.exports.createreview = catchAsyncErrors(async(req, res, next)=>{
      const {rating, comment, productId} = req.body;
      const product = await Product.findById(productId);

      const review = {     
         user:req.user._id,
         name :req.user.name,
        rating: Number(rating),
        comment,
      };
      product.reviews.push(review)

  
      const isReview = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
      )
      if(isReview){
          product.reviews.forEach((rev)=>{
            if(rev.user.toString() ===  req.user._id.toString())
            (rev.rating = rating), (rev.comment = comment)
          });
      }else{
          product.reviews.push(review)
          product.numOfReviews = product.reviews.length;
      }
      let avg = 0;
      product.ratings = product.reviews.forEach((rev)=>{
          avg+= rev.rating;
      })
      product.ratings = avg / product.reviews.length;
  
      await product.save({ validateBeforeSave: false });
    
      return res.status(200).json({
        success: true,
        message: "review done"
      });
      next()
  })


  //get product reviews
  module.exports.allreviews = catchAsyncErrors(async (req,res,next)=>{
      const product = await Product.findById(req.query.id);
  
      if(!product){
          return next(new ErrorHandler("Product not found", 404));
      }
      res.status(200).json({
          success:true,
          reviews:product.reviews
      })
  })
  
  // Delete Review
  exports.deletereviews = catchAsyncErrors(async (req, res, next) => {
      const product = await Product.findById(req.query.productId);
    
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }
    
      const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
      );
    
      let avg = 0;
    
      reviews.forEach((rev) => {
        avg += rev.rating;
      });
    
      let ratings = 0;
    
      if (reviews.length === 0) {
        ratings = 0;
      } else {
        ratings = avg / reviews.length;
      }
    
      const numOfReviews = reviews.length;
    
      await Product.findByIdAndUpdate(
        req.query.productId,
        {
          reviews,
          ratings,
          numOfReviews,
        },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
    
      res.status(200).json({
        success: true,
      });
    });


    
//get all oders -- admin site
exports.gelallorders = catchAsyncErrors(async(req,res, next) =>{
  const order = await Order.find();
 
  let totalAmount = 0;
  order.forEach((order)=>{
      totalAmount += order.totalPrice;
  });
  res.status(200).json({
      success :true,
      totalAmount,
      order,
      
  });
  next()
})


//Admin Section 
//update orders status --Admin
exports.OrderUpdate = catchAsyncErrors(async(req,res,next) => {
  const order = await Order.findById(req.params.id);

  if(order.orderStatus === "Delivered"){
      return next( new ErrorHandler("You have already delivered this order", 400))
  }

  order.orderItems.forEach(async(order) => {
   await updateStock(order.id, order.quantity);
  });

  order.orderStatus = req.body.status;

  if(req.body.status === "Delivered"){
    order.deliveredAt = Date.now();
  }
  await order.save({validateBeforeSave:false});

  res.status(200).json({
      success:true
  })
})

async function updateStock (id, quantity) {
  const product = await Product.findById(id);
  console.log('product', product)
  product.stock -= quantity;
  await product.save({validateBeforeSave:false})
}
  

