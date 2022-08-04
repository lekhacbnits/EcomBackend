const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const userController = require('./controllers/users')
const auth = require('./middleware/auth')
const productRouter = require('./routes/products')
const User = require('./models/users');

dotenv.config()
app.use(express.json())
const connect = async () => {
    try {
        mongoose.connect(process.env.MONGODB)
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("+++++++++++++++++++++disconnected")
})
app.get('/confirmation/:token', async (req, res) => {
    try {
        await User.updateOne({ Token: req.params.token },{$set:{confirmed: true }}, function(err, result){
            if(err)
            console.log("err",err)
            console.log("result:",result)
        })
    } catch (e) {
        res.send(e)
    }
    //next()
})
app.post("/signup", userController.signUp)
app.post("/login", userController.login)
app.use("/users", auth, userRouter)
app.use("/products", auth, productRouter)
//app.use("/auth", authRouter)

// app.get('/', (req, res)=>{
//     res.json({"message":"Lekha is a Winner"});
//     console.log("done");
// })
app.listen(3000, () => { connect(); console.log("connected on port 3000") });