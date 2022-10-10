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
    email: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20,
        unique: true,
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
    gender: {
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
    date: { type: Date, default: Date.now },
    photo: {
        type: String,
        default:'/Image/user1.jpg'
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
