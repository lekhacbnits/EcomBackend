const mongoose = require('mongoose')
const { Schema } = mongoose;
const User = require('../models/users')
const Product = require('../models/products')

const CartSchema = new Schema({

    userId: [{
        type: Schema.Types.ObjectId,
        ref: User
    }],

    productId: [{
        //type:String,
        type: Schema.Types.ObjectId,
        ref: Product
    }],
    quantity: {
        type: Number,
        required: true
    },

})
const cart = mongoose.model('Cart', CartSchema)
module.exports = cart