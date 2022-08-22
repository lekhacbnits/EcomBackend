const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min:0,
        max:20,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        max:10,
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 4,
        max:10,
    },
    
email:{
    type:String,
    required: true,
    trim:true,
    min:5,
    max:20,
    unique:true,
},
confirmed:{
    type:Boolean,
    default:false
},
contact:{
    type :String,
    required:true,
    unique:true,
},
address:{
    type:String,
    required:false
},
date:{ type: Date, default: Date.now },
photo:{
    type:Buffer,
    required:false
},
Token:{
    type:String,
    required:true
},
role:{
    type:String,
    default: "User"
}
})
module.exports = mongoose.model('User', userSchema)
