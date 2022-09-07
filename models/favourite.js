const mongoose = require('mongoose')
const { Schema } = mongoose;
const User = require('../models/users')
const Product = require('../models/products')

const favouriteSchema = new Schema({

    userId: [{
        type: Schema.Types.ObjectId,
        ref: User
    }],

    productId: [{
        type: Schema.Types.ObjectId,
        ref: Product
    }],

})
const favourite = mongoose.model('Favourite', favouriteSchema)
module.exports = favourite