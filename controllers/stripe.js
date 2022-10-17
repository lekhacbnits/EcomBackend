const dotenv = require('dotenv')
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/users')

module.exports.stripePay = async (req, res) => {
  let status, error;
  const { amount, token, userId } = req.body;
  const shippingInfo = await User.findById(userId);
  if(shippingInfo.address1===undefined){
    res.send("Please add the address for shipping")
  }else{
  try {
    await stripe.PaymentIntent.create({
      source: token.id,
      amount,
      currency: 'USD'
    })
    status = 'success'
  } catch(error) {
    console.log(error)
    status='failure'
  }
  res.json({ error, status })
}
  
}