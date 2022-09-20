const mongoose = require('mongoose')
const {Schema} = mongoose;
const validator = require('validator')
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
        trim: true,
        maxlength: [30, "Name cannot exceed 30 charactors"],
        minLenght: [4, "Your name cannot bi less then 4 chararctors"],
    },
    password: {
        type: String,
        required: [true, "Please Enter your password"],
        minlength: 4,
        max: 10,
        select:false
    },
    
email:{
    type:String,
    required: [true, "Please Enter your email"],
    trim:true,
    unique:true,
    validate : [validator.isEmail, "Please enter a valid email"]
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
avatar: {
    public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
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
    default: "Admin",
  },
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
