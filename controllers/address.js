const mongoose = require('mongoose')
const Address = require ('../models/address')

module.exports.address = async (req, res) => {
    // res.json("address")

    const 
  {  
    name,
  flatno,

  addressline1,
  addressline2,
  city,
  state,
  zipcode,
  country,
   } = req.body
 try {
   const newaddress = new Address({
      name,
      flatno,
    
      addressline1,
      addressline2,
      city,
      state,
      zipcode,
      country

   })

await newaddress.save();
res.status(200).json(newaddress)


 } catch (err) {
   console.log(err);
   
 }

     
}