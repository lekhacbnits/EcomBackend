const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const stripeRouter = require('./routes/stripe')
const userController = require('./controllers/users')
const User = require('./models/users');
const  {MONGODB} = require ('./config/db')
const { isAuthenticatedUser, authorizeRoles } = require("./middleware/role");
dotenv.config();

app.use(cors())
app.use(express.json())
const Port = process.env.PORT

process.on("unhandled exception", (err) =>{
    console.log('Error', `${err.message}`)
    console.log('shutting down server due to unhandled exception')
   
        process.exit(1);
    
})


const connect = async () => {
        mongoose.connect(MONGODB)
        console.log("connected")
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
    } 
    catch (e) {
        res.send(e)
    }
})

app.post("/signup", userController.signUp)
app.post("/login", userController.login)
app.use('/stripe', stripeRouter)
app.use("/users",  userRouter)


//products
 app.use("/createproducts", isAuthenticatedUser, authorizeRoles("Admin"), require( "./routes/products") )
 app.use("/getallproducts",  require( "./routes/products"))
 app.use("/productdetails",  require('./routes/products'))
app.use("/updateProduct", isAuthenticatedUser, authorizeRoles("Admin"),  require('./routes/products'))
 //payment
 app.use("/paytmpayment", require('./routes/payment'))
 app.use("/paypal", require('./routes/payment'))
//user
 app.use("/address", isAuthenticatedUser,  require('./routes/address') )
 app.use("/loggedUser",  isAuthenticatedUser,  require('./routes/users') )
 app.use("/getuser", isAuthenticatedUser, authorizeRoles("Admin"), require('./routes/users'))
 app.use('/getallusers', isAuthenticatedUser, authorizeRoles("Admin"), require('./routes/users') )
 app.use("/resetPassEmail",isAuthenticatedUser, require('./routes/users') )
 app.use("/resetPass",isAuthenticatedUser, require('./routes/users') )
 app.use("/favourites", require('./routes/favourite') )
 app.use("/updateProfile",isAuthenticatedUser, require('./routes/users') )
 app.use("/userOrders", isAuthenticatedUser, require('./routes/users') )
 app.use("/updateUser",isAuthenticatedUser, authorizeRoles("Admin"), require('./routes/users') )
 app.use("/deleteUser",isAuthenticatedUser, authorizeRoles("Admin"), require('./routes/users') )
 app.use("/userreview", isAuthenticatedUser,  require('./routes/users') )
app.use("/allreviews", require('./routes/users') )
app.use("/deletereview",isAuthenticatedUser, require('./routes/users') )
app.use("/admingetallorders", isAuthenticatedUser, authorizeRoles("Admin"), require('./routes/users'))
app.use("/deleteProduct", isAuthenticatedUser, authorizeRoles("Admin"), require('./routes/products'))
app.use("/OrderUpdate", isAuthenticatedUser, authorizeRoles("Admin"), require('./routes/users') )

 app.use("/user", require('./routes/users') )
 app.use("/cart", require('./routes/cart') )
 app.use("/deletecart", require('./routes/cart') )

 //order
 app.use("/order",  isAuthenticatedUser , require('./routes/order') )
 app.use("/singleOrders", isAuthenticatedUser, authorizeRoles("Admin"), require('./routes/order') )
 app.use("/deleteOrder", isAuthenticatedUser, authorizeRoles("Admin"), require('./routes/order') )

app.get('/', (req, res)=>{
    res.json({"message":"listening to port 8000"});
    console.log("done");
})
app.listen(Port, () => { connect(); console.log(`connected on port ${Port}`) });