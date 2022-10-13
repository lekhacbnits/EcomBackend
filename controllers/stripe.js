const dotenv = require('dotenv')
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.stripePay = async (req, res) => {
  let status, error;
  const { amount, token } = req.body;
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