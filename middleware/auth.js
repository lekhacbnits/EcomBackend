const express = require('express')
// const router = express.Router()
// const register = require('../controllers/auth.js')

// // router.post("/signup", register.signUp)
// // router.post("/login", register.login)
// // // (req, res)=>{
// // //     res.json(register)
// // //     console.log()
// // // })
// // module.exports = router

const jwt = require("jsonwebtoken");

 const config = process.env;

// const verifyToken = async(req, res, next) => {
//   const token =
//     // req.body.token || req.query.token || req.headers["x-access-token"];
//     req.headers.authorization;

//   if (!token) {
//     return res.status(403).send("You must be logged in");
//   }
//   try {
//     const decoded = jwt.verify(token, config.TOKEN_KEY);
//     req.user = decoded;
// console.log( req.user);
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }


//   return next();
//   //try {
// //     const token = req.headers.authorization;
    
// //     const verifytoken = jwt.verify(token,config.TOKEN_KEY);
    
// //     const rootUser = await userdb.findOne({_id:config.TOKEN_KEY});
    
// //     if(!rootUser) {throw new Error("user not found")}

// //     req.token = token
// //     req.rootUser = rootUser
// //     req.userId = rootUser._id

// //     next();

// // } catch (error) {
// //     res.status(401).json({status:401,message:"Unauthorized no token provide"})
// // }
// };

// module.exports = verifyToken;

const tokenvar = async(req,res,next) =>{
 try {

  const token = req.headers.authorization
  const varifytoken = jwt.varify(token,config.TOKEN_KEY );
  const rootUser = await User.findOne({_id: varifytoken._id})
  if(!rootUser){
    throw new Error("user not found")}
    req.token = token
    req.rootUser = rootUser
    rew.user_id = rootUser._id
  next()
 } catch (error) {
  res.status(401).json({status:401,message:"Unauthorized no token provide"})
}
}


module.exports = tokenvar