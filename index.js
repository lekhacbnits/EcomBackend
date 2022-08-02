const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const auth = require('./middleware/auth')
const productRouter = require('./routes/products')
dotenv.config()
app.use(express.json())
const connect = async()=>{
    try{
        mongoose.connect(process.env.MONGODB)
        console.log("connected")
    }catch(error){
        console.log(error)
    }
}
mongoose.connection.on("disconnected",()=>{
    console.log("+++++++++++++++++++++disconnected")
})
// app.use((req, res, next)=>{
//     console.log("Hey, I am a middleware")
//     next()
// })
app.use("/users", auth ,  userRouter)
app.use("/products", auth, productRouter)
//app.use("/auth", authRouter)

// app.get('/', (req, res)=>{
//     res.json({"message":"Lekha is a Winner"});
//     console.log("done");
// })
app.listen(3000, ()=>{connect();console.log("connected on port 3000")});