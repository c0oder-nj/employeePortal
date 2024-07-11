const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../databaseConnection')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const axios = require('axios')

dotenv.config();




const home = async (req, res) => {
    // res.status(200).send("Data for showing at router part");
    // setting cookie

    // console.log('Cookies:', req.cookies);
    // res.send('Check console for cookies');

}


const test = async (req, res) => {

}

/*
// Authentication and authorization
i) Setting cookies
ii) bcrypt for password authentication and authorization.
iii) implementation of jwt



*/
async function hashPassword(password) {
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
    return hashedPassword
}



const login = async (req, res) => {

    var empData;
    var unSuccessfulAttempts;
    var allowedAttempts;
    var userLockFlag;
    try {
        try {
            await db.connect();
        } catch (error) {
            console.log("Error in db connection::", error)
        }
        

        try {
            empData = await db.request().query(`SELECT top 1 * from userTable where empCode = ${req.body.sapid}`);
        } catch (error) {
            console.log("Error in query execution of employee record::",error);
        }   
            
        if(empData.recordset.length == 0 ){
            console.log("wrong sap number")
            return res.json({ "status": false, "message": "wrong sap number" })
        }

        unSuccessfulAttempts = empData.recordset.at(0).unSuccessfulAttempts;
        allowedAttempts = empData.recordset.at(0).allowUnSuccessfulAttempts;
        userLockFlag = empData.recordset.at(0).userLockFlag;

        if ((unSuccessfulAttempts == allowedAttempts) && !userLockFlag) {
            // lock the user
            var lockUser;
            try {
                lockUser = await db.request().query(`UPDATE userTable SET userLockFlag = 1 where empCode = ${req.body.sapid}`);
            } catch (error) {
                console.log("Error occured while locking user :: ",error);
            }
            if (lockUser.rowsAffected[0]) {
                return res.json({ "status": false, "message": "maximum possible no. of attempts reached, user is locked now" })
            }
        } else if (userLockFlag) {
            return res.json({ "status": false, "message": "user is locked" })
        } else {
            // check if user is verified or not
            var compFlag;
            // variables for payload data
            var empCode = empData.recordset.at(0).empCode;
            var empPassword = empData.recordset.at(0).empPassword;
            var empName = empData.recordset.at(0).empName;
            var empDesignation = empData.recordset.at(0).empDesignation;
            var compName = empData.recordset.at(0).compName;
            var mobileNo = empData.recordset.at(0).mobileNo;
            var emailIdShakti = empData.recordset.at(0).emailIdShakti;
            var empAddress = empData.recordset.at(0).empAddress;

            // comparing the passwords
            compFlag = await bcrypt.compare(req.body.password, empPassword);


            if (compFlag) {
                console.log("User is a valid user")
                try {
                    resettingLockStatus = await db.request().query(`UPDATE userTable SET unSuccessfulAttempts = 0 where empCode = ${req.body.sapid}`);
                } catch (error) {
                    console.log("Error occured in query :: ",error);
                }
                let payloadData = {
                    empCode: empCode,
                    empPassword: empPassword,
                    empName: empName,
                    empDesignation: empDesignation,
                    compName: compName,
                    mobileNo: mobileNo,
                    emailIdShakti: emailIdShakti,
                    empAddress: empAddress,
                }
                // generate jwt token
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                const token = jwt.sign(payloadData, jwtSecretKey);
                console.log(token)
                res.cookie("token", token);
                let repo = res.json({ "status": true, message: "user logged in successfully", accessToken: token });
                return repo;
            } else {
                // console.log("Wrong credentials");
               
                var response;
                try {
                    response = await db.request().query(`UPDATE userTable SET unSuccessfulAttempts = unSuccessfulAttempts+1 WHERE empCode = ${req.body.sapid};UPDATE userTable SET userLockFlag = 1 where allowUnSuccessfulAttempts in ( select unSuccessfulAttempts from userTable  where empCode =${req.body.sapid}) and empCode=${req.body.sapid} `);
                } catch (error) {
                    console.log("Error occured at fifth query :: ",error);
                }
                console.log(response.rowsAffected[0]);
                return res.json({ "status": false, "message": "Wrong Credentials" });
            }
        }

    } catch (error) {
        console.log("Error in try block ");
        res.status(200).send("Some error occured ", error);
    }
    finally {
        db.close();
    }
}



const setPassword = async (req,res) => {
    
    try {
        await db.connect();
        hashPassword(req.body.password).then((encrypted_password)=>{
            try {
                db.request().query(`update userTable set empPassword = '${encrypted_password}', setPassword = 1 where empCode=${req.body.sapid}`)
                .then((result)=>{
                    if(result.rowsAffected[0]){
                        db.close();
                        return res.status(200).json({"status":true, "message":"Api hitted"});
                    }
                })
            } catch (error) {
                res.status(500).json({"status":false,"message":"Cant set the password"})
            }
            
        })
    } catch (error) {
        res.status(500).json({"status":false,"message":"Cant set the password"})
    }
    finally{
        // db.close();
    }
}




const getData = async (req, res) => {
    // establish the connection with the database

    const result = await axios.get('https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/emp_credentials.htm');
    const userArray = result.data.Response;


    async function hashPassword(plainText) {
        const saltRounds = 10;
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(plainText, saltRounds, function (err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        })
        return hashedPassword
    }

    await db.connect();

    try {
        for (i = 1; i <= userArray.length; i++) {
            const sapNumber = userArray[i].persno
            const encrypted_password = await hashPassword(userArray[i].pass)
            const result = await db.request().query(`INSERT INTO userTable (sapNumber, password) values (${sapNumber}, '${encrypted_password}') `);

            console.log("Rows affected ", result.rowsAffected[0]);
        }
        // userArray.forEach(async data => {
        //     const sapNumber = data.persno
        //     const encrypted_password = await hashPassword(data.pass)
        //     const result = await db.request().query(`INSERT INTO userTable (sapNumber, password) values (${sapNumber}, ${encrypted_password}) `);

        //     console.log("Rows affected ",result.rowsAffected[0]);
        // });
    } catch (error) {
        console.log("Some error occurred --> ", error);
    } finally {
        db.close();
    }





}

const encodePassword = async (req, res) => {
    const pass = req.query.pass;
    const hashedPassword = await hashPassword(pass);
    console.log("Encrypted password is: ", hashedPassword);

    res.status(200).send("API hit ho gai");
}


module.exports = { home, login, test, getData, encodePassword,setPassword };