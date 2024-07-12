const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sql = require('mssql');
const db = require('../databaseConnection')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const axios = require('axios')
const session = require('express-session')

dotenv.config();




const home = async (req, res) => {

    console.log("You are entering in cookie validation part")
    console.log(req.query.value)
    const newValue = req.query.value;
    headerValue = newValue.split("=")[1];
    console.log("Your : ",headerValue)
    
    console.log("Your cookie is working")
    return res.json({ "status": false, "message": "You are getting values from home function end point","number":10 });

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

    var empData;
    var unSuccessfulAttempts;
    var allowedAttempts;
    var userLockFlag;
        try {
            await db.connect();

            const newProcedureConnection = db.request();
            newProcedureConnection.input('sapID',sql.NVarChar(50), req.body.sapid);
            newProcedureConnection.input('Password',sql.NVarChar(50), req.body.password);
            newProcedureConnection.output('Message',sql.NVarChar(500));
            newProcedureConnection.output('unSuccessfulAttempts',sql.Int);
            newProcedureConnection.output('allowUnSuccessfulAttempts',sql.Int);

            const result = await newProcedureConnection.execute('Proc_loginValidation');

            const msg = result.output.Message;
            var unSuccessfulAttempts = result.output.unSuccessfulAttempts;
            const allowUnSuccessfulAttempts = result.output.allowUnSuccessfulAttempts;
            console.log("printing Message ::::::::: ----> ", msg);
            console.log("printing typeof Message ::::::::: ----> ", typeof msg);

            if(msg == '1'){
                db.close();
                return res.json({"status":false, "message": "Wrong credentials"})
            }
            else if(msg == '2'){
                db.close();
                return res.json({"status": false, "message": "User is locked now"})
            }else{
                if(await bcrypt.compare(req.body.password, msg)){ // user is a valid user
                    try {
                        const userData = db.request().query(`SELECT empCode,empPassword, empName,empDesignation,compName,mobileNo,emailIdShakti,empAddress FROM userTable where empCode = ${req.body.sapid}`);
                        // console.log((await userData).recordset.at(0).empCode);
                        // return;
                        var empCode = (await userData).recordset.at(0).empCode;
                        var empPassword = (await userData).recordset.at(0).empPassword;
                        var empName = (await userData).recordset.at(0).empName;
                        var empDesignation = (await userData).recordset.at(0).empDesignation;
                        var compName = (await userData).recordset.at(0).compName;
                        var mobileNo = (await userData).recordset.at(0).mobileNo;
                        var emailIdShakti = (await userData).recordset.at(0).emailIdShakti;
                        var empAddress = (await userData).recordset.at(0).empAddress;

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
                        db.close();
                        return res.json({ "status": true, message: "user logged in successfully", accessToken: token });
                    } catch (error) {
                        console.log("Error occured at user validation :: ", error);
                    }
                }else{
                    // user is not valid user increase its unsuccessfull attempts and lock the user
                    const check_and_lock = await db.request().query(`UPDATE userTable SET unSuccessfulAttempts = unSuccessfulAttempts+1 WHERE empCode = ${req.body.sapid};UPDATE userTable SET userLockFlag = 1 where allowUnSuccessfulAttempts in ( select unSuccessfulAttempts from userTable  where empCode =${req.body.sapid}) and empCode=${req.body.sapid} `);
                    // console.log(check_and_lock.output, " -- ", check_and_lock.recordset, " -- ", check_and_lock.rowsAffected);

                    if(check_and_lock.rowsAffected[0]){
                        unSuccessfulAttempts+=1;
                        const remainingAttempts = allowUnSuccessfulAttempts - unSuccessfulAttempts;
                        return res.json({"status": false, "message":`Wrong password | remaining attempts are ${remainingAttempts}`})
                    }

                    if(check_and_lock.rowsAffected[1]){
                        return res.json({"status":false, "message":"Maximum possible attempts reached user is locked now"})
                    }
                }
            }

        } catch (error) {
            console.log("some error occured", error)
        }
        finally{
            db.close();
        }

    }
        

    //     try {
    //         empData = await db.request().query(`SELECT top 1 * from userTable where empCode = ${req.body.sapid}`);
    //     } catch (error) {
    //         console.log("Error in query execution of employee record::",error);
    //     }   
            
    //     if(empData.recordset.length == 0 ){
    //         console.log("wrong sap number")
    //         return res.json({ "status": false, "message": "wrong sap number" })
    //     }

    //     unSuccessfulAttempts = empData.recordset.at(0).unSuccessfulAttempts;
    //     allowedAttempts = empData.recordset.at(0).allowUnSuccessfulAttempts;
    //     userLockFlag = empData.recordset.at(0).userLockFlag;

    //     if ((unSuccessfulAttempts == allowedAttempts) && !userLockFlag) {
    //         // lock the user
    //         var lockUser;
    //         try {
    //             lockUser = await db.request().query(`UPDATE userTable SET userLockFlag = 1 where empCode = ${req.body.sapid}`);
    //         } catch (error) {
    //             console.log("Error occured while locking user :: ",error);
    //         }
    //         if (lockUser.rowsAffected[0]) {
    //             return res.json({ "status": false, "message": "maximum possible no. of attempts reached, user is locked now" })
    //         }
    //     } else if (userLockFlag) {
    //         return res.json({ "status": false, "message": "user is locked" })
    //     } else {
    //         // check if user is verified or not
    //         var compFlag;
    //         // variables for payload data
            

    //         // comparing the passwords
    //         compFlag = await bcrypt.compare(req.body.password, empPassword);


    //         if (compFlag) {
    //             console.log("User is a valid user")
    //             try {
    //                 resettingLockStatus = await db.request().query(`UPDATE userTable SET unSuccessfulAttempts = 0 where empCode = ${req.body.sapid}`);
    //             } catch (error) {
    //                 console.log("Error occured in query :: ",error);
    //             }
                
    //         } else {
    //             // console.log("Wrong credentials");
               
    //             var response;
    //             try {
    //                 response = await db.request().query(`UPDATE userTable SET unSuccessfulAttempts = unSuccessfulAttempts+1 WHERE empCode = ${req.body.sapid};UPDATE userTable SET userLockFlag = 1 where allowUnSuccessfulAttempts in ( select unSuccessfulAttempts from userTable  where empCode =${req.body.sapid}) and empCode=${req.body.sapid} `);
    //             } catch (error) {
    //                 console.log("Error occured at fifth query :: ",error);
    //             }
    //             console.log(response.rowsAffected[0]);
    //             return res.json({ "status": false, "message": "Wrong Credentials" });
    //         }
    //     }

    // } catch (error) {
    //     console.log("Error in try block ");
    //     res.status(200).send("Some error occured ", error);
    // }
    // finally {
    //     db.close();
    // }



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