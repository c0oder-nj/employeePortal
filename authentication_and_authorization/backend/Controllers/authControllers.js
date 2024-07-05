const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




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
        // encrypting your password using bcrypt encryption method

        // console.log(req.body)
        // console.log("data type of request is ",typeof req.body)

        // console.log()
        // console.log()
        // console.log()

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
        // creating jwt token        
        let data ={
            password : encrypted_password
        }
        // console.log(encrypted_password)
        
        //Performing JWT encryption
        let token = jwt.sign(data,"secret_key");
        // console.log(token);

        

    } catch (error) {
        res.status(500).send("Internal server error")
    }
}


module.exports = {home, login,test};