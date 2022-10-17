const Order = require('../models/order')
const User = require('../models/users')
const Product = require('../models/products')
const catchAsyncErrors = require('../middleware/catchAsyncError')
const ErrorHandler = require('../utils/errorhandler')
const ApiFeatures = require('../utils/apifeatures')

exports.newOrder = catchAsyncErrors(async(req,res,next) =>{
    const {userId, productId, quantity, taxPrice, shippingPrice} = req.body;
    const shippingInfo = await User.findById(userId);
    if(shippingInfo.address1){
    const orderItems = await Product.findById(productId);

    const {name, contact, address1, address2, city, country, state, zipcode}= shippingInfo
    const {price, images}= orderItems

     const order = await Order.create({
         shippingInfo:{ name, contact, address1, address2, city, country, state, zipcode},
    paymentInfo:{status:"succeeded"},
    paidAt: Date.now(),
    user:userId,
    orderItems:{  price, images, name: orderItems.name, quantity , productId },
    taxPrice,
    shippingPrice,
    totalPrice: shippingPrice+taxPrice+(orderItems.price)*quantity,
})
      
    // });
console.log("order:", order)
    res.status(201).json({
        success:true,
        order
    })
}else{
    res.send("Please add the address for shipping")
}
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