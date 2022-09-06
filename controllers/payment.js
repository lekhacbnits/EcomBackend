const { response } = require('express');
// const {paytmParams, paytmMerchantKey} = require('../index')
const PaytmChecksum = require('../paytm/PaytmChecksum')
const { v4:uuid } = require('uuid')


// module.exports.paytmpayment = async (req,res) =>{

//     const {amount, email} = req.body
// const totalamount = JSON.stringify(amount)

//     let paytmMerchantKey = process.env.PAYTM_MURCHENT_KEY;
//     let paytmParams = {};
//     paytmParams['MID'] = process.env.PAYTM_MID 
//     paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE
//     paytmParams['CHANNEL_ID'] = process.env.CHANNEL_ID
//     paytmParams['INDUSTRY_TYPE_ID'] = process.env.INDUSTRY_TYPE_ID
//     paytmParams['ORDER_ID'] = uuid;
//     paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID;
//     paytmParams['TXN_AMOUNT'] = totalamount;
//     paytmParams['CALLBACK_URL'] = 'http://localhost:5000/callback';
//     paytmParams['EMAIL'] = email;
//     paytmParams['MOBILE_NO'] = '8758386374'
    



//     try {
//        let paytmChecksum = await PaytmChecksum.generateSignature(paytmParams, paytmMerchantKey);
//         let params = {
//             ...paytmParams, 'CHECKSUMHASH': paytmChecksum

//         }
//         response.status(200).json(params)

//     } catch (error) {
//        response.status(500).json({error:error.message})

//     }
   
//  };

 module.exports.paypalpayment = async (req, res) => {
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/success",
          "cancel_url": "http://localhost:3000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Redhock Bar Soap",
                  "sku": "001",
                  "price": "25.00",
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": "25.00"
          },
          "description": "Washing Bar soap"
      }]
  };
  
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
    }
  });
  
  };

module.exports.successpaypalpayment= async  (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "25.00"
          }
      }]
    };
  
  // Obtains the transaction details from paypal
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          res.send('Success');
      }
  });
  };
  module.exports.cancelpaypalpayment= async (req, res) => res.send('Cancelled');  



 