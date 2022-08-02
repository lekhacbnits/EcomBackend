const mongoose = require('mongoose')
const {Schema} = mongoose;

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
price:{
    type:Number,
    required:true
},
quantity:{
    type:Number,
    required:true
},
discription:{
    type:String,
    required:false
},
date:{ type: Date, default: Date.now },
photo:{
    type:Buffer,
    required:false
},

})
const products = mongoose.model('Product', productSchema)
module.exports = products