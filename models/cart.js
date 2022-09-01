const mongoose = require('mongoose')
const {Schema} = mongoose;

const CartSchema = new Schema({

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