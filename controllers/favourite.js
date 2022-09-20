const Product = require('../models/products')
const Favourite = require('../models/favourite')

module.exports.addFavourite= async (req, res) => {
    // console.log(req.body, Cart, Product);
    try {
        // const product  =  await Product.findOne({ '_id': req.body.id });
        const cart = await Favourite.create({ "userId": req.body.userId, "productId": req.body.productId })
        res.status(200).json(cart)
        console.log("this is logged", cart)
    } catch (error) {
        res.status(400).json({ "error": error })
        console.log("error message:", error);
    }
};
module.exports.getFavourite = async (req, res) => {
    // console.log(req.body, Cart, Product);
    try {
        const carts = await Favourite.find({ userId: req.body.userId }, { productId: 1, _id: 0 });
        //  if(carts)
        const CartId = carts.map(cart => cart.productId);
        const products = await Product.find({ _id: CartId })
        console.log(products)
        res.status(200).json(products)

    } catch (error) {
        res.status(400).json({ "error": error })
        console.log("error message:", error);
    }
};

module.exports.deleteFavouriteItem = async (req, res) => {
    console.log("delete favourite Item")
    try {
        const FavouriteId  =  await Favourite.find({ productId: req.body.productId, userId: req.body.userId },{_id:1});
        const cart = await Favourite.deleteOne({ "_id": FavouriteId })
        res.json(cart)
    } catch (error) {
        console.log(error);
    }
};