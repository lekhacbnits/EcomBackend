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
//DefaultData()

app.post("/signup", userController.signUp)
app.post("/login", userController.login)

app.use("/users",  userRouter)
 app.use("/carts", require("./routes/cart"))
 //app.use("/cart", productController.getProduct)
 app.use("/getProducts", require( "./routes/products"))
 app.use("/product",  require('./routes/products'))
 app.use("/paytmpayment", require('./routes/payment'))
 app.use("/paypal", require('./routes/payment'))
 app.use("/paypal", require('./routes/payment'))
 app.use("/paypal", require('./routes/payment'))

 app.use("/address", auth, require('./routes/address') )
 app.use("/loggedUser",auth, require('./routes/users') )
 app.use("/resetPassEmail", require('./routes/users') )
 app.use("/resetPass", require('./routes/users') )
//  app.use("/updateuserdata", require('./routes/users') )
 app.use("/updateProfile", require('./routes/users') )
 app.use("/cart", require('./routes/cart') )
 app.use("/deletecart", require('./routes/cart') )


// app.use("/", authRouter)
//  paypal.configure({
//     "mode":'sandbox',
//     "client_id":"AY4QlT_0rkLM7PG1VGiKiC2WsMsvfW6WV8wnQFNBkOWKb6bnN628ZDCSp7zUnGRIqzOqXlLO4XSij3c-",
//     "client_secret":"EMs6S61fINBvdeiNjOJUtwRhEs8edbgyUL36dEm8qRquWjE6XmAHPjO34BR0JQS_2gZaSf_KQ6GoXbhv"
//  })
 
app.get('/', (req, res)=>{
    res.json({"message":"listening to port 5000"});
    console.log("done");
})
app.listen(Port, () => { connect(); console.log(`connected on port ${Port}`) });