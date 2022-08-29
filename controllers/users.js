const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const User = require('../models/users')

module.exports.signUp = async (req, res) => {
  const { name, email, contact, password, cpassword } = req.body;
  try {
    if (!(name && email && contact && password && cpassword)) {
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
      password: encryptedPassword,
      cpassword:encryptedPassword
    })
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      // tls: {
      //   rejectUnauthorized: true,
      //   minVersion: "TLSv1.2"
      // },
      auth: {
        user: process.env.MAILID, // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
      },
    });

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
    const url = `http://localhost:5000/confirmation/${token}`
    const options = {
      from: process.env.MAILID, // sender address
      to:email,
      //  "lekhasaraf09@gmail.com", // list of receivers
      subject: "Verify your email id ✔", // Subject line
      text: "Please click the link below to verify your email id for ecomapp", // plain text body
      html: `<a href=${url}>${url}</a>`, // html body
    }
    transporter.sendMail(options, async (error, info) => {
      if (error) {
        console.log(error.message)
        res.send(error.message)
      }
      console.log("Message sent: %s", info.messageId);
      // return new user
      await newUser.save();
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res.status(201).json(newUser);
    });

  } catch (err) {
    console.log(err);
  }
//   // Our register logic ends here
 }

// Our login logic starts here
module.exports.login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    if (!user)
      res.status(400).send("please register first")
    //Validate if the email is verified
    if (!(user.confirmed)) {
      res.status(400).send("Please verify your email first")
    }
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
  } catch (error) {
    console.log(error)
  }
}


// module.exports.createUser = (req, res)=>{
//     res.json("inside create user controllers")
//     }

// module.exports.updateUser = (req, res)=>{
//    res.json("inside update user controllers")
//     }
module.exports.getvalidUser = async(req, res) =>{
      try {
        const validuserOne = await User.findOne({_id: req.user._id});
        res.status(201).json({status:201,validuserOne });       
      } catch (error) {
        res.status(401).json({status:401, error})
      }
}
module.exports.forgetpass = (req, res) => {
  const {email} = req.body;
  if(err || !user)
{
  res.status(400).json("user with email dpnt not exist")

}  
const token = jwt.sign(
  { user_id: newUser._id, email },
  process.env.RESET_LINK,
  {
    expiresIn: "2h",
  }
);
const options = {
  from: process.env.MAILID, // sender address
  to:email,
  //  "lekhasaraf09@gmail.com", // list of receivers
  subject: "Verify your email id ✔", // Subject line
  text: "Please click the link below to reset the password for ecomapp", // plain text body
  html: `<a href=${url}>${url}</a>`, // html body
}

return user.updateOne({resetLink: token}, (err, success))
  if(err){
    return res.status(400).json({err: "reset password link error"})
  }else {
    transporter.sendMail(options, async (error, info) => {
      if (error) {
        console.log(error.message)
        res.send(error.message)
      }
      console.log("Message sent: %s", info.messageId);
      // return new user
      // await newUser.save();
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // res.status(201).json(newUser);
    });
  }

}




module.exports.deleteUser = (req, res) => {
  res.json("inside delete user controllers")
}



module.exports.getUser = async (req, res) => {
  const allUsers = await User.find()
  console.log(allUsers)
  res.json(allUsers)
}