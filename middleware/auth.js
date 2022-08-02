// const express = require('express')
// const router = express.Router()
// const register = require('../controllers/auth.js')

// router.post("/signup", register.signUp)
// router.post("/login", register.login)
// // (req, res)=>{
// //     res.json(register)
// //     console.log()
// // })
// module.exports = router

const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;