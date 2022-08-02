const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
email:{
    type:String,
    required:true
},
contact:{
    type:String,
    required:true
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
