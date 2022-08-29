const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const userController = require('./controllers/users')
const productController = require('./controllers/products')
const auth = require('./middleware/auth')
const productRouter = require('./routes/products')
const User = require('./models/users');
const  {MONGODB} = require ('./config/db')


dotenv.config();
const DefaultData = require('./default')
app.use(cors())
app.use(express.json())
const Port = process.env.PORT
console.log(process.env.PORT)

const connect = async () => {
    try {
        mongoose.connect(MONGODB)
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
DefaultData()










app.post("/signup", userController.signUp)
app.post("/login", userController.login)

app.use("/users", auth, userRouter)
// app.get("/getProducts", productController.getProducts)
// app.get("/getProduct", productController.getProduct)
 app.use("/getProducts", require( "./routes/products"))
 app.use("/product",  require('./routes/products'))
 app.use("/paytmpayment", require('./routes/payment'))
 app.use("/address", auth, require('./routes/address') )
 app.use("/validuser",auth, require('./routes/users') )
 app.use("/forgetpassword",auth, require('./routes/users') )


//app.use("/auth", authRouter)
 



app.get('/', (req, res)=>{
    res.json({"message":"listening to port 5000"});
    console.log("done");
})
app.listen(Port, () => { connect(); console.log(`connected on port ${Port}`) });