const jwt = require("jsonwebtoken");
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
    // var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
    // console.log(decodedValue);

    try{
        const decodedValue = jwt.verify(headerValue, process.env.JWT_SECRET_KEY);
        console.log("JWT is valid:", decodedValue);
    }catch(err){
        if (err.name === 'TokenExpiredError') {
            console.log("JWT has expired.");
            return res.json({"status" : false,"type":"Token Expired","message":"User Session Has been Expired, Please Login Again."})
          } else {
            console.log("JWT is invalid:", err.message);
            return res.json({ "status": false,"type":"Token Invalid", "message": "Unauthorized Access" });
          }
    }


    console.log("In middle ware")
    // Adding custom header for resolving cors issue
    // req.setHeader('Access-Control-Allow-Origin','*');

    next()
}

const checkUserNeeraj = (req,res,next)=> {

    // console.log(req.query.value)
    console.log(req.headers.accesstoken);

    if(!req.headers.accesstoken){
        return res.json({ "status": false, "message": "Unauthorized Access" });
    }

    const newValue = req.headers.accesstoken;
  
    //If you have changed the formate of access token then adjust this line of comment this line 
    //Current access token formate accesToken=elelfnoeuhfmdvnlszdnvzljsdmszvksjzdvjzsdhlj
    console.log("+++++++++++++++++++++++++++")
    console.log( "Printing new value :: ", newValue)
    console.log("+++++++++++++++++++++++++++")


    try{
        var decodedValue = jwt.verify(newValue, process.env.JWT_SECRET_KEY);
        console.log(decodedValue);
        req.sapid = decodedValue.empCode;
        console.log("JWT is valid:", decodedValue);
    }catch(err){
        if (err.name === 'TokenExpiredError') {
            console.log("JWT has expired at neeraj side.");
            // return res.redirect('/')
            return res.json({"status" : false,"type":"Token Expired","message":"User Session Has been Expired, Please Login Again."})
        } else {
            console.log("JWT is invalid:", err.message);
            return res.json({ "status": false,"type":"Token Invalid", "message": "Unauthorized Access" });
          }
    }

    next();
}



const checkUserRoles = (req,res,next) => {
    if(!req.headers.accesstoken){
        return res.json({ "status": false, "message": "Unauthorized Access" });
    }

    const newValue = req.headers.accesstoken;
    console.log("------------------");
    console.log("Token for roles :: ", newValue);
    console.log("------------------");

    try {
        var decodedValue = jwt.verify(newValue, process.env.JWT_SECRET_KEY);
        console.log(decodedValue);
        req.sapid = decodedValue.empCode; // here I am setting sap id as request object 
        req.roles = decodedValue.roles; // settings roles as request object
        req.name = decodedValue.empName; // setting name
        req.designation = decodedValue.empDesignation;
        req.mobile = decodedValue.mobileNo;
        req.mail = decodedValue.emailIdShakti;
        req.address = decodedValue.empAddress;
    } catch (error) {
        return res.json({ "status": false, "message": "Invalid JWT Token or problem at decoding jwt value" });
    }

    next();
}


module.exports = { checkUser,checkUserNeeraj, checkUserRoles};