const Product = require('../models/products')
const Cart = require('../models/cart')

module.exports.addCart = async (req,res) =>{
   // console.log(req.body, Cart, Product);
    try {
        // const product  =  await Product.findOne({ '_id': req.body.id });
         const cart  =  await Cart.create({"userId": req.body.userId, "productId":req.body.productId, "quantity":req.body.quantity})   
         res.status(200).json(cart)
         console.log("this is logged",cart)
    } catch (error) {
        res.status(400).json({"error": error})
     console.log("error message:",error);
    }
 };
 module.exports.updateCart = async(req, res) => {
   const { quantity } = req.body;
   await Cart.findByIdAndUpdate ((req.body.id), {$set:{quantity:quantity}})
   res.json("updated cart quantity")
 }
 module.exports.getCart = async (req,res) =>{
   // console.log(req.body, Cart, Product);
    try {
         const carts  = await Cart.find({userId: req.body.userId},{productId:1, _id:0});
       //  if(carts)
         const CartId =  carts.map(cart=>cart.productId);
        const products = await Product.find({_id:CartId}) 
    console.log(products)
          res.status(200).json(products)
        
    } catch (error) {
        res.status(400).json({"error": error})
     console.log("error message:",error);
    }
 };

 module.exports.deleteCartItem = async (req,res) =>{
   //  console.log(req.body, Cart, Product);
    try {
         const CartId  =  await Cart.find({ productId: req.body.productId, userId: req.body.userId },{_id:1});
         const cart  =  await Cart.deleteOne({"_id":CartId})   
        console.log("CartId:",cart)
         res.json(cart)
    } catch (error) {
     console.log(error);
    }
 };