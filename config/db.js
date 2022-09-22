const dotenv = require('dotenv')
dotenv.config();

module.exports = {
         MONGODB:process.env.MONGO_URL
        //'mongodb+srv://cbnits:cbnits@atlascluster.3ylgt.mongodb.net/ecommerce?retryWrites=true&w=majority'  
        // MONGODB: 'mongodb+srv://ecommerceapp:rw1CJfMTm3ayctRU@cluster0.zf7txk8.mongodb.net/?retryWrites=true&w=majority'
}





// const mongoose = require('mongoose');

//  const Connection = async (USERNAME, PASSWORD) => {
//         const  MONGOURL =   `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.zf7txk8.mongodb.net/?retryWrites=true&w=majority`;

//         try {

//                 await mongoose.connect(MONGOURL)
//                 console.log("conneted to mongo yeahh")
//         } catch (error) {

//                 console.log("error" , error.message)
                
//         }
// }
// module.exports = Connection