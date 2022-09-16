
const User = require('../models/users')
const jwt = require("jsonwebtoken");
const tokenvar = require('../middleware/auth')
const config = process.env;

const authorisedRole =  (req,res,next) =>{

//   return (req,res,next) =>{


//     const rootUser =  User.findOne({id: req.user_id})
//     console.log('rootUser', rootUser)

//     if(!roles.includes(req.rootUser.role)){
//      return next( new ErrorHandler(
//         `role: ${req.rootUser.role} is not allowed to access this resources`, 403
//       )
//      );
      
//     }
//     next()
//   }
console.log("hey")

tokenvar(req,res, () => {
console.log("hello")
        if(req.rootUser.role = "Admin" ){
          next()
        }else{
          res.status(403).send("Access denied")
        }
    
     })
 }

module.exports = authorisedRole