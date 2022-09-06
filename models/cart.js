const mongoose = require('mongoose')
const {Schema} = mongoose;
const User = require('../models/users')

const CartSchema = new Schema({

    users:[{
        type:"ObjectId",
        ref:'User'
    }],

    ProductId:{
        type:String,
    } ,
    quantity:{
    type:Number,
    required:true
},

})
const cart = mongoose.model('Cart', CartSchema)
module.exports = cart