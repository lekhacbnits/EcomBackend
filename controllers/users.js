const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const User = require('../models/users')
const catchAsyncErrors = require('../middleware/catchAsyncError')
const ErrorHandler = require('../utils/errorhandler')
const sendToken = require('../utils/jwtToken')

module.exports.signUp = catchAsyncErrors(async (req, res) => {
  const { name, email, contact, password, cpassword } = req.body;
  // try {
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
      cpassword:encryptedPassword,
      avatar: {
        public_id: "this is a sample id",
        url:"profile url"
      }
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

  // } 
  // catch (err) {
  //   console.log(err);
  // }
   // Our register logic ends here
}
 )

// Our login logic starts here
module.exports.login = catchAsyncErrors(async (req, res, next) => {
  // try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      return next(new ErrorHandler("All input is required", 400))
      // res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    if (!user)
    return next(new ErrorHandler("please register first", 200))

      // res.status(200).send("please register first")
    //Validate if the email is verified
    
    if (!(user.confirmed)) {
      return next(new ErrorHandler("Please verify your email first", 400))

      // res.status(400).send("Please verify your email first")
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
    //  await sendToken(user, 201, res)
      res.status(200).json(user);

      const isPasswordMatched = await User.comparePassword(password);

      if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email  or password", 400))
      }
    }
  // } catch (error) {
  //   console.log(error)
  // }
})

module.exports.loggedUser = catchAsyncErrors(async (req,res)=>{
  res.send({"userdata":rootUser.user_id})
  console.log('req.rootUser', rootUser)
}
)

//get user detaols
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user_id);

  res.status(200).json({
    success: true,
    user,
  });
});

module.exports.resetPassEmail = catchAsyncErrors(async (req,res)=>{
  const {email}  = req.body

  if(email){
    const user = await User.findOne({email:email})
    {
      const secret = user._id + process.env.TOKEN_KEY
      token = jwt.sign({user_id: user._id}, secret, {expiresIn:'5d'})
      const link= `http://localhost:3000/ForgetPass/${user._id}/${token}`
      console.log(link)

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

      const options =  ({
        from: process.env.MAILID, // sender address
        to: email,
        //  "lekhasaraf09@gmail.com", // list of receivers
        subject: "Verify your email id ✔", // Subject line
        text: "Please click the link below to verify your email id for ecomapp", // plain text body
        html:`<a href=${link}> Click here </a> to reset your password`
      })
      transporter.sendMail(options, async (error, info) => {
        if (error) {
          console.log(error.message)
          res.send(error.message)
        }
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      });
      res.send({"infor":options, "message": "please check your inbox" })

    }
  }else {
    res.send("email does't exist")
  }
})
module.exports.resetPass = catchAsyncErrors(async (req,res) =>{
  const {password, cpassword} = req.body
  const { _id, token } = req.params
  const user = await User.findById(_id)
  const newsecret = user._id + process.env.TOKEN_KEY
  // try {
    jwt.verify(token, newsecret)

    if(password && cpassword){

    if(password !== cpassword){
      res.send("password and conferm password should be matched")
    }else{
      const salt = await bcrypt.genSalt(10)
      const newhashPassword = await bcrypt.hash(password, salt )
      await User.findByIdAndUpdate ((user._id), {$set:{password:newhashPassword}})
      console.log(password)
      res.send("password updated successfully")
    }
    }
  // } catch (error) {
  //   console.log(error)
  // }
})

module.exports.updateUser = catchAsyncErrors(async(req, res) => {
  const { name,  contact,  address, zipcode } = req.body;
  await User.findByIdAndUpdate ((req.body.id), {$set:{name:name, contact:contact, address:address, zipcode:zipcode}})
  res.json("updated user document")
})

module.exports.getUser = catchAsyncErrors(async (req, res) => {
  const allUsers = await User.find()
  console.log(allUsers)
  res.json(allUsers)
})