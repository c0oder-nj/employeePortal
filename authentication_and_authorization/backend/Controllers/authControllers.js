const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../databaseConnection')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const axios = require('axios')
const session = require('express-session')

dotenv.config();




const home = async (req, res) => {
    // res.status(200).send("Data for showing at router part");
    // setting cookie

    
    console.log(req.cookies.token)
    res.status(200).send("Working");
    console.log("Your cookie is working")
    // console.log(req.session.user);
    // console.log('Cookies:', req.cookies);
    // res.send('Check console for cookies');
    return res.status(200).send({message : "Working",key:"Value"})
    return;

}


const test = async (req, res) => {
    // const token = req.headers['Access-Control-Allow-Headers'];
    // console.log(token);
    console.log(req.cookies.token)
    console.log("Your cookie is working")
    res.status(200).send({message : "Working",key:"Value"})
    return;
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
    
    // req.session.user = req.body.sapNumber;
    // req.session.save();
    // console.log("Your session name is :",req.session.user);
    var unSuccessfulAttempts;
    var allowedAttempts;
    var userLockFlag;
    try {
        await db.connect();
        const data = await db.request().query(`SELECT unSuccessfulAttempts, allowUnSuccessfulAttempts,userLockFlag from userTable where empCode = ${req.body.sapNumber}`);
        unSuccessfulAttempts = data.recordset.at(0).unSuccessfulAttempts;
        allowedAttempts = data.recordset.at(0).allowUnSuccessfulAttempts;
        userLockFlag = data.recordset.at(0).userLockFlag;
        if ((unSuccessfulAttempts == allowedAttempts) && !userLockFlag) {
            // lock the user
            const response = await db.request().query(`UPDATE userTable SET userLockFlag = 1 where empCode = ${req.body.sapNumber}`);
            if (response.rowsAffected[0]) {
                isUserLocked = true;
                return res.json({ "status": false, "message": "maximum possible no. of attempts reached, user is locked now" })
            }
        } else if (userLockFlag) {
            // show lock message as response
            console.log("In dbzvbk")
            return res.json({ "status": false, "message": "user is locked" })
        } else {
            var compFlag;
            // variables for payload data
            var empCode;
            var empPassword;
            var empName;
            var empDesignation;
            var compName;
            var mobileNo;
            var emailIdShakti;
            var empAddress;
            
            const result = await db.request().query(`SELECT top 1 empCode,empPassword,empName,empDesignation,compName,mobileNo,emailIdShakti, empAddress  FROM userTable WHERE empCode = ${req.body.sapNumber} `);
            const userData = result.recordset; //userData is an array of users which looks something like
            // assiging variables for payload data
            empCode = userData.at(0).empCode;
            empPassword = userData.at(0).empPassword;
            empName = userData.at(0).empName;
            empDesignation = userData.at(0).empDesignation;
            compName = userData.at(0).compName;
            mobileNo = userData.at(0).mobileNo;
            emailIdShakti = userData.at(0).emailIdShakti;
            empAddress = userData.at(0).empAddress;
            compFlag = await bcrypt.compare(req.body.password, empPassword);


            if (compFlag) {
                console.log("User is a valid user")
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
                unSuccessfulAttempts += 1;
                const response = await db.request().query(`UPDATE userTable SET unSuccessfulAttempts = ${unSuccessfulAttempts} WHERE empCode = ${req.body.sapNumber}`);
                console.log(response.rowsAffected[0]);
                return res.json({ "status": false, "message": "Wrong Credentials" });
            }
        }

    } catch (error) {
        // res.status(500).json({"status":false, "message":"Internal server error "})
        res.status(500).send("Some error occured ", error);
    }
    finally {
        db.close();
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


module.exports = { home, login, test, getData, encodePassword };