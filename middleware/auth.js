const express = require('express')
const User = require('../models/users')
const jwt = require("jsonwebtoken");
const ErrorHandler = require('../utils/errorhandler');
const config = process.env;

const tokenvar = async(req,res,next) =>{
 try {

  const authHeader = req.headers.authorization
  console.log(authHeader)
  const token = authHeader.split(" ")[1]
  const varifytoken = jwt.verify(token,config.TOKEN_KEY );
  const rootUser = await User.findOne({id: varifytoken.user_id})
  if(!rootUser){
    throw new Error("user not found")}
    res.status(200).json(rootUser)     
  
  next()
 } catch (error) {
  res.status(401).json({status:401, message:"Unauthorized no token provide"})
}
}


module.exports = tokenvar



