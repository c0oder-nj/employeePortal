const jwt = require("jsonwebtoken");
const session = require('express-session')
const db = require('../databaseConnection')

const checkUser = async (req,res,next)=> {

    // console.log(req.query.value)
    //Agar value pass nahi ki toh yeh undefiend wala code chalega
    if(req.query.value===undefined){
        return res.json({ "status": false, "message": "Unauthorized Access" });
    }

    const newValue = req.query.value;
  
    //If you have changed the formate of access token then adjust this line of comment this line 
    //Current access token formate accesToken=elelfnoeuhfmdvnlszdnvzljsdmszvksjzdvjzsdhlj
    console.log("+++++++++++++++++++++++++++")
    console.log(newValue)
    console.log("+++++++++++++++++++++++++++")
    headerValue = newValue.split("=")[1];
    // console.log(headerValue)
    var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
    // console.log(decodedValue);
    console.log("In middle ware")
    next()
}

module.exports = { checkUser};