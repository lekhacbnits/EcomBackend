// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const bcrypt = require('bcryptjs');
//const User = require('../models/users')
const path = require('path');
const multer = require('multer')
const fileStorageEngine = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, path.join(__dirname, '../../front/public/Image/'));
    },
    filename:(req, file, cb)=>{
        cb(null, '--'+file.originalname)
    }
})
const upload = multer({storage: fileStorageEngine})
//app.post('/post', upload.single('image'), (req, res)=>{
    module.exports.profilePhoto = upload.single('image'),(req, res)=>{
        // const { id, filePath } = req.body;
        // User.findByIdAndUpdate((id), {$set:{photo:URL.createObjectURL(filePath)}})
            res.send('one file uploaded')
}
// module.exports.updateProfile = async (req,res)=>{
//     const id = req.params.id
// //    console.log(id)
//    User.findOneAndUpdate({_id:req.params.id}, {
//     $set:{
//        name: req.body.name,
//        email: req.body.email,
//       contact:req.body.contact
//     }
//    }).then(result =>{
//     res.status(200).json({
//         updated_products: result
//     })
//    }).catch(err=>{
//     console.log(err)
//     res.status(500).json({
//         error:err
//     })
//    })
// }


// // module.exports.updateUser = async(req, res) => {
// //   const { name,  contact,  address, zipcode } = req.body;
// //   await User.findByIdAndUpdate ((req.body.id), {$set:{name:name, contact:contact, address:address, zipcode:zipcode}})
// //   res.json("updated user document")
// // }