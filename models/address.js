const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    // user_id:{
    //     type: String,
    //     required:true
    // },
    // address:{
    //     type:Array,
    //     required: true
    // }
    name:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20,
    },
    flatno:{
        type: Number,
        min:0,
        max:5,
         required:true
    },

    addressline1:{
        type: String,
         required:false,
         trim:true,
         min:10,
         max:100,
    },
    addressline2:{
        type: String,
        required:false,
        trim:true,
        min:10,
        max:100,
    },
    city:{
        type: String,
       required:true,
       trim:true,
       min:10,
       max:50,
    },
    state:{
        type: String,
         required:true,
         trim:true,
         min:10,
         max:50,
    },
    zipcode:{
        type: Number,
         required:true,
         min:0,
         max:6,
    },

    country:{
        type: String,
         required:true,
         min:10,
         max:50,

    },
})

module.exports = mongoose.model('Address' , addressSchema )