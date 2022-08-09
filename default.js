const Product  = require ('./models/products')
const products = require('./constants/data')
const mongoose = require('mongoose')


const DefaultData = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(products);

        console.log('Data imported Successfully');
        
    } catch (error) {
        console.log('Error: ', error.message);
    }
}

module.exports = DefaultData