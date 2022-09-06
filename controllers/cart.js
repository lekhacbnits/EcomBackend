const Product = require('../models/products')
const Cart = require('../models/cart')

module.exports.addCart = async (req,res) =>{
   // console.log(req.body, Cart, Product);
    try {
        // const product  =  await Product.findOne({ '_id': req.body.id });
         const cart  =  await Cart.create({"userId": req.body.userId, "ProductId":req.body._id, "quantity":req.body.quantity})   
         res.status(200).json(cart)
         console.log("this is logged",cart)
    } catch (error) {
        res.status(400).json({"error": error})
     console.log("error message:",error);
    }
 };
 module.exports.getCart = async (req,res) =>{
   // console.log(req.body, Cart, Product);
    try {
         const carts  = await Cart.find({userId: req.body.id},{ProductId:1, _id:0});
       //  if(carts)
         const CartId =  carts.map(cart=>cart.ProductId);
        const products = await Product.find({_id:CartId}) 
    console.log(products)
          res.status(200).json(products)
        
    } catch (error) {
        res.status(400).json({"error": error})
     console.log("error message:",error);
    }
 };

 module.exports.deleteCartItem = async (req,res) =>{
   // console.log(req.body, Cart, Product);
    try {
         const CartID  =  await Cart.findOne({ 'ProductId': req.body.id });
         const cart  =  await Cart.deleteOne({"_id": CartID._id})   
         res.json(cart)
    } catch (error) {
     console.log(error);
    }
 };