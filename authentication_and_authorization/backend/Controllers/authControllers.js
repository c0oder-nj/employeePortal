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

        console.log(req.body)
        console.log("data type of request is ",typeof req.body)

        console.log()
        console.log()
        console.log()

        let encrypted_password;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                // console.log("Bcrypted password is ==> ", hash)
                encrypted_password =  hash;
                console.log(encrypted_password)
                // console.log(typeof encrypted_password);
            });
        }).then()
        
        ;

        // creating jwt token

        
        let data ={
            password : encrypted_password
        }

        console.log(data)

        // let token = jwt.sign({
        //     password : encrypted_password
        // },"secret_key");
        // console.log(token);

    } catch (error) {
        res.status(500).send("Internal server error")
    }
}


module.exports = {home, login,test};