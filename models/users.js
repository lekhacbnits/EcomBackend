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
gender: {
    type: String,
},
address: {
    type: String,
},
address1: {
    type: String,
},
address2: {
    type: String,
},
city: {
    type: String,
},
country: {
    type: String,
},
state: {
    type: String,
},
zipcode: {
    type: String,
},
housenumber: {
    type: String,
},
cardName: {
    type: String,
},
cardNumber: {
    type: String,
},
cardExp: {
    type: String,
},
confirmed: {
    type: Boolean,
    default: false
},
contact: {
    type: String,
    required: true,
    unique: true,
},
resetLink: {
    data: String,
    default: ''
},
address: {
    type: String,
    required: false
},
date: { type: Date, default: Date.now },
photo: {
    type: Buffer,
    required: false
},
Token: {
    type: String,
    required: true
},
role: {
    type: String,
    default: "User"
}
})


// userSchema.methods.generateAuthToken = function(){
//     const token = jwt.sign(
//               { user_id: newUser._id, email },
//               process.env.TOKEN_KEY,
//               {
//                 expiresIn: "2h",
//               }
//             );
//             return token
// }

// const User = mongoose.model("user", userSchema)
// const validate = (data) =>{
//     const schema = Joi.object({
//         name:Joi.string().required().label("name"),
//         email:Joi.string().email().required().label("email"),
//         password:passwordComplexity().required().label("password")
//     });
//     return schema.validate(data)
// }
//  module.exports = ('User',validate)
 module.exports = mongoose.model("User", userSchema)
