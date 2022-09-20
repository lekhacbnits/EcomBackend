const express = require('express')
const User = require('../models/users')
const jwt = require("jsonwebtoken");
const ErrorHandler = require('../utils/errorhandler');
const config = process.env;

const tokenvar = async(req,res,next) =>{
 try {

  const authHeader = req.headers.authorization
  const token = authHeader.split(" ")[1]
  const varifytoken = jwt.verify(token,config.TOKEN_KEY );
  const users = await User.findOne({id: varifytoken.user_id})
  if(!users){
    throw new Error("user not found")}
    res.status(200).json(users)     
  
  next()
 } catch (error) {
  res.status(401).json({status:401, message:"Unauthorized no token provide"})
}
}


module.exports = tokenvar



