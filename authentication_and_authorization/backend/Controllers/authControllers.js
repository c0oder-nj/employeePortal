const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../databaseConnection')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const axios = require('axios')

dotenv.config();

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
async function hashPassword (password) {
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
                let payloadData = {
                    sapNumber: req.body.username,
                    password : userData.at(0).password
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




const getData = async(req,res) => {
    // establish the connection with the database
    
    const result = await axios.get('https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/emp_credentials.htm');
    const userArray = result.data.Response;


    async function hashPassword (plainText) {
        const saltRounds = 10;
        const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.hash(plainText, saltRounds, function(err, hash) {
            if (err) reject(err)
            resolve(hash)
          });
        })
        return hashedPassword
      }

      await db.connect();

    try {
        for(i=1; i<=userArray.length; i++){
            const sapNumber = userArray[i].persno
            const encrypted_password = await hashPassword(userArray[i].pass)
            const result = await db.request().query(`INSERT INTO userTable (sapNumber, password) values (${sapNumber}, '${encrypted_password}') `);
            
            console.log("Rows affected ",result.rowsAffected[0]);
        }
        // userArray.forEach(async data => {
        //     const sapNumber = data.persno
        //     const encrypted_password = await hashPassword(data.pass)
        //     const result = await db.request().query(`INSERT INTO userTable (sapNumber, password) values (${sapNumber}, ${encrypted_password}) `);
          
        //     console.log("Rows affected ",result.rowsAffected[0]);
        // });
    } catch (error) {
        console.log("Some error occurred --> ",error );
    }finally{
        db.close();
    }
    
    


    
}

const encodePassword = async(req,res) => {
    const pass = req.query.pass;
    const hashedPassword = await hashPassword(pass);
    console.log("Encrypted password is: ",hashedPassword);

    res.status(200).send("API hit ho gai");
}


module.exports = {home, login,test, getData,encodePassword};