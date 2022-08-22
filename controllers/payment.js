const { response } = require('express');
// const {paytmParams, paytmMerchantKey} = require('../index')
const PaytmChecksum = require('../paytm/PaytmChecksum')
const { v4:uuid } = require('uuid')


module.exports.paytmpayment = async (req,res) =>{

    const {amount, email} = req.body
const totalamount = JSON.stringify(amount)

    let paytmMerchantKey = process.env.PAYTM_MURCHENT_KEY;
    let paytmParams = {};
    paytmParams['MID'] = process.env.PAYTM_MID 
    paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE
    paytmParams['CHANNEL_ID'] = process.env.CHANNEL_ID
    paytmParams['INDUSTRY_TYPE_ID'] = process.env.INDUSTRY_TYPE_ID
    paytmParams['ORDER_ID'] = uuid;
    paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID;
    paytmParams['TXN_AMOUNT'] = totalamount;
    paytmParams['CALLBACK_URL'] = 'http://localhost:5000/callback';
    paytmParams['EMAIL'] = email;
    paytmParams['MOBILE_NO'] = '8758386374'
    



    try {
       let paytmChecksum = await PaytmChecksum.generateSignature(paytmParams, paytmMerchantKey);
        let params = {
            ...paytmParams, 'CHECKSUMHASH': paytmChecksum

        }
        response.status(200).json(params)

    } catch (error) {
       response.status(500).json({error:error.message})

    }
   
 };
 