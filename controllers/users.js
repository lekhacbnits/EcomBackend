const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require('../models/users')

module.exports.signUp = async (req, res)=>{
    const {name, email, contact, password} = req.body;
    try{   
     if(!(name && email && contact && password)){
       res.status(400).json("All fields are required")
     }
     const oldUser = await User.findOne({ email });
     if (oldUser) {
       return res.status(409).send("User Already Exist. Please Login");
     }
     encryptedPassword = await bcrypt.hash(password, 10);
     const newUser = new User({
       name: name,
       email: email.toLowerCase(),
       contact: contact,
       password: encryptedPassword
   })
     // Create token
     const token = jwt.sign(
       { user_id: newUser._id, email },
       process.env.TOKEN_KEY,
       {
         expiresIn: "2h",
       }
     );
      // save user token
      newUser.Token = token;
          // return new user
           await newUser.save();
     res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
 }

 module.exports.login = async (req, res)=>{
    try{
   // Our login logic starts here
    // Get user input
    const { email, password } = req.body;
 
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
     // Validate if user exist in our database
     const user = await User.findOne({ email });
     if (user && (await bcrypt.compare(password, user.password))) {
       // Create token
       const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
            // save user token
        user.Token = token;
 
        // user
        res.status(200).json(user);
      }
    }catch(error){
       console.log(error)
    }
 }
// module.exports.createUser = (req, res)=>{
//     res.json("inside create user controllers")
//     }

// module.exports.updateUser = (req, res)=>{
//    res.json("inside update user controllers")
//     }

module.exports.deleteUser = (req, res)=>{
    res.json("inside delete user controllers")
   }      
module.exports.getUser = async (req, res)=>{
    const allUsers = await User.find()
    console.log(allUsers)
    res.json(allUsers)
   }