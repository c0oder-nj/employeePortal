const jwt = require("jsonwebtoken");
const session = require('express-session')
const db = require('../databaseConnection')

const checkUser = async (req,res,next)=> {
    
    var headerValue = req.cookies.token;

    var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
    console.log(decodedValue)
    var sapNumber = decodedValue['empCode'] 
    await db.connect();
    const data = await db.request().query(`SELECT unSuccessfulAttempts, allowUnSuccessfulAttempts,userLockFlag from userTable where empCode = ${sapNumber}`);
    
    console.log(data);
    
    next()
}

module.exports = { checkUser};