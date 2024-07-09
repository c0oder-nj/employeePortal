const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../databaseConnection')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

dotenv.config();

// constant variables
const saltRounds = 10



const home = async(req,res) => {
    // res.status(200).send("Data for showing at router part");
    // setting cookie

    // console.log('Cookies:', req.cookies);
    // res.send('Check console for cookies');
    
}


const test = async(req,res) => {

}

/*
// Authentication and authorization
i) Setting cookies
ii) bcrypt for password authentication and authorization.
iii) implementation of jwt



*/


const login = async(req,res) => {
    // return res.status(204).send("testing msg")
    
        try {
            
            let encrypted_password;
            async function hashPassword (req) {
                const password = req.body.password
                const saltRounds = 10;
              
                const hashedPassword = await new Promise((resolve, reject) => {
                  bcrypt.hash(password, saltRounds, function(err, hash) {
                    if (err) reject(err)
                    resolve(hash)
                  });
                })
                
                return hashedPassword
              }
            encrypted_password =await hashPassword(req);
            
            
            await db.connect();
            console.log(req.body);
            const result = await db.request().query(`SELECT top 1 empCode,empPassword FROM userTable WHERE empCode = ${req.body.sapNumber} `);
            
            const userData = result.recordset; //userData is an array of users which looks something like
            /*
            [
                    {
                        id: 1,
                        password: '$2b$10$mYOFtryX1QjnUZIkcLsd2OV8bCnF9DyVAcoKQzehjEz3/ZMF1x4dC',
                    },
                    ];
            */
           console.log(req.body.password, userData.at(0).empPassword);
           const compFlag = await bcrypt.compare(req.body.password,userData.at(0).empPassword)
           console.log("Working")
            // console.log(compFlag);
    
            if(compFlag){
                console.log("User is a valid user")
                let payloadData = {
                    empCode: req.body.sapNumber,
                    empPassword : userData.at(0).password
                }
                // generate jwt token
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                // let jwtSecretKey = "secret_key";
                const token = jwt.sign(payloadData,jwtSecretKey);
                console.log(token)
                //return res.status(204).send("Testing testing");
                res.cookie("token", token);
                let repo = res.json({message: "user logged in successfully", accessToken : token});
                // console.log('repo: ',repo);
                
                return repo;
            }else{
                console.log("Validation failed gesv");
            }
    
        } catch (error) {
            console.log(error)
            res.status(500).send("Internal server error",error)
        }
        finally{
            db.close();
        }
    }


module.exports = {home, login,test};