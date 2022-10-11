const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const User = require('../models/users')
const catchAsyncErrors = require('../middleware/catchAsyncError')

module.exports.photo = catchAsyncErrors(async(req,res, next)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({error:"pic canot post"})
         }
         res.json(result)
    })
   
  })