const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const User = require('../models/users')

module.exports.updateProfile = async (req,res)=>{
    const id = req.params.id
//    console.log(id)
   User.findOneAndUpdate({_id:req.params.id}, {
    $set:{
       name: req.body.name,
       email: req.body.email,
      contact:req.body.contact
    }
   }).then(result =>{
    res.status(200).json({
        updated_products: result
    })
   }).catch(err=>{
    console.log(err)
    res.status(500).json({
        error:err
    })
   })
}


// module.exports.updateUser = async(req, res) => {
//   const { name,  contact,  address, zipcode } = req.body;
//   await User.findByIdAndUpdate ((req.body.id), {$set:{name:name, contact:contact, address:address, zipcode:zipcode}})
//   res.json("updated user document")
// }