const Product = require('../models/products')
const Cart = require('../models/cart')

module.exports.getCart = async (req,res) =>{
    console.log(req.body, Cart, Product);
    try {
         const product  =  await Product.findOne({ '_id': req.body.id });
         const cart  =  await Cart.create({"ProductId":product._id, "quantity":req.body.quantity})   
         res.status(200).json({"product":product, "quantity":cart.quantity})
         console.log(cart)
    } catch (error) {
        res.json(400, {"error": error})
     console.log(error);
    }
 };

 module.exports.deleteCartItem = async (req,res) =>{
    console.log(req.body, Cart, Product);
    try {
        // const product  =  await Product.findOne({ '_id': req.body.id });
         const cart  =  await Cart.deleteOne({"_id":req.body.id})   
         res.json(cart)
    } catch (error) {
     console.log(error);
    }
 };