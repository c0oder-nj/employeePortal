const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../databaseConnection')

// constant variables
const saltRounds = 10



const home = async(req,res) => {
    // res.status(200).send("Data for showing at router part");
    // setting cookie
    
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
    try {

        //Performin bcrypt
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
        const result = await db.request().query(`SELECT top 1 id,password FROM userTable WHERE sapNumber = ${req.body.username} `);
        const userData = result.recordset; //userData is an array of users which looks something like
        /*
        [
                {
                    id: 1,
                    password: '$2b$10$mYOFtryX1QjnUZIkcLsd2OV8bCnF9DyVAcoKQzehjEz3/ZMF1x4dC',
                },
                ];
        */

        console.log(req.body.password, userData.at(0).password);
        const compFlag = await bcrypt.compare(req.body.password,userData.at(0).password)
        // console.log(compFlag);

        if(compFlag){
            console.log("User is a valid user")
        }else{
            console.log("Validation failed");
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