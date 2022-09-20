const Order = require('../models/order')
const Product = require('../models/products')
const catchAsyncErrors = require('../middleware/catchAsyncError')
const ErrorHandler = require('../utils/errorhandler')
const ApiFeatures = require('../utils/apifeatures')

exports.newOrder = catchAsyncErrors(async(req,res,next) =>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        ItemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice

    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        ItemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user:req.user._id
    });

    res.status(201).json({
        success:true,
        order
    })
    next()
})

//user orders
exports.getSingleOrder = catchAsyncErrors(async(req,res,next) =>{
    const order = await Order.findById(req.params.id).populate(
        "user", 
        "name email"
    );
    console.log(order)
    if(!order){
        return next(new ErrorHandler("order not found with this id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
})

//logged in user orders
exports.myOrders = catchAsyncErrors(async(req,res, next) =>{
    const order = await Order.find({user : req.user._id});
    if(!order){
        return next( new ErrorHandler(
            "order not fount with this id", 404))
        }
    res.status(200).json({
        success :true,
        order,
    });
})

//get all oders -- admin site
exports.myOrders = catchAsyncErrors(async(req,res, next) =>{
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
})


//update orders status --Admin
exports.updateOrder = catchAsyncErrors(async(req,res,next) => {
    const order = await Order.find(req.params.id);

    if(order.orderStatus === "Delivered"){
        return next( new ErrorHandler("You have already delivered this order", 400))
    }

    order.orderItems.forEach(async(order) => {
     await updateStock(order.Product, order.quantity);
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
    product.stock -= quantity;
    await product.save({validateBeforeSave:false})
}