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

//user order by admin
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

//delete order --Admin
exports.deleteOrder = catchAsyncErrors(async(req,res,next) => {
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("order not found with id", 401))
    }
    await order.remove()
    res.status(200).json({
        success:true
    })
})