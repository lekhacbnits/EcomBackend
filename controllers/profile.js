const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const User = require('../models/users')

module.exports.updateuserdata = async (req,res)=>{
    const id = req.query.id
    const user = await User.findById({id:_id})

      if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.contact = req.body.email || user.contact;
    
    const updateUser = await user.save();

    res.json({
        _id:updateUser._id,
        name: updateUser.name,
        email:updateUser.email,
        contact: updateUser.contact 

    })
}else{
    res.status(404);
    throw new Error("User Not Found")
}



// const newData = {
//  name : req.body.name,
//  email: req.body.email,
//  conatct: req.body.contact 
// }

// const user = await User.findByIdAndUpdate(req.user._id, newData, {
//     new:true,
//     runValidators:true,
//     useFindAndMondify: false
// })
// res.status(200).json({
//     succes:true
// })



}