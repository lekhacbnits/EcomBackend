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
      res.status(200).send("please register first")
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
      await user.save();
      // user
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports.loggedUser = async (req,res)=>{
  res.send({"userdata":req.rootUser})
}

module.exports.resetPassEmail = async (req,res)=>{
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
}
module.exports.resetPass = async (req,res) =>{
  const {password, cpassword} = req.body
  const { _id, token } = req.params
  const user = await User.findById(_id)
  const newsecret = user._id + process.env.TOKEN_KEY
  try {
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
  } catch (error) {
    console.log(error)
  }
}

module.exports.updateUser = async(req, res) => {
  const { name, email, contact,  address, gender } = req.body;
  try{
   const updatedUser = await User.findByIdAndUpdate ((req.body.id), {$set:{name:name, contact:contact, email:email, address:address, gender:gender}})
    console.log("//////////",req.body, updatedUser)
    res.status(200).json(updatedUser)
  }catch(error){
console.log('error', error)
  }
}

module.exports.updatePicture = async(req, res) => {
  const { id, filePath } = req.body;
  try{
    const updatedPicture = await User.findByIdAndUpdate((id), {$set:{photo:URL.createObjectURL(filePath)}})
    // if(updatedPicture){
    //   updatedPicture.photo = filePath;
    // await updatedPicture.save()
    console.log("picture ...............",req.body, updatedPicture)
    res.json("updated user picture")
    // }else{
    //   console.log("user does not exist")
    // res.json("user does not exist")
    // }
  }catch(error){
console.log('error', error)
  }
}

module.exports.getUser = async (req, res) => {
  //console.log("req body id",req.body)
  const loggedUser = await User.findOne( {_id: req.body.id})
  console.log(loggedUser)
  res.status(200).json(loggedUser)
}