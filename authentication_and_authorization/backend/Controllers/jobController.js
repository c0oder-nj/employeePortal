const dotenv = require('dotenv');
const axios = require('axios');
const fs = require('fs/promises');
const { json } = require('express');
const attendanceData = require('../Json/dailyAttendance.json')
const db = require('../databaseConnection')
dotenv.config();




const fetchDailyAttendace = (req,res) =>{
    var uri = process.env.COSECURI;
    const fulldate = new Date();
    const date = fulldate.getDate()<10 ? '0' + fulldate.getDate() : fulldate.getDate();
    const month = (fulldate.getMonth()+1) < 10 ? '0' + (fulldate.getMonth()+1) : (fulldate.getMonth()+1) ;
    const fullYear = fulldate.getFullYear();
    const finalDate = `${date}${month}${fullYear}`;
    // console.log(finalDate);

    uri += `?ACTION=GET;DATE-RANGE=${finalDate}-${finalDate};RANGE=ALL;FORMAT=JSON`;

    console.log("Printing url : ", uri);
    axios.get(uri, { 
        auth: {
          username: process.env.COSEC_USERNAME,
          password: process.env.COSEC_PASSWORD
        } 
      })
      .then(async response =>{
        // Handle success
        // console.log(response.data);
        // console.log(response.status === 200);
        if(response.status === 200){
            const data = JSON.stringify(response.data);
            try {
                await fs.writeFile('./Json/dailyAttendance.json',data);
                res.send("api hit data updated");
            } catch (error) {
                console.log("Error occured");
                res.json({"status": false, "msg" : "data not saved"});
            }
        }else{
            res.json({"status": false, "msg" : "data not saved"});
        }
        

      })
      .catch(error => {
        // Handle error
        res.json({"status": false, "msg" : "Error occured"});
      });
}

const getEmpPunchData = (req,res) => {
    const sapId = req.query.sapId;
    const dailyAttendance = attendanceData['attendance-daily'];
    const empTupple = dailyAttendance.find((val,index)=>{
        return val.userid == sapId;
    })
    if(empTupple){
        res.send(empTupple);
    }else{
        res.json({"msg": "user not found"});
    }
}


const pushEmpData = (req,res) => {
    const sapid = req.query.sapid;

    const axios = require('axios');

    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/employee_profile.htm?sapid=${sapid}`,
    headers: { 
        'Cookie': 'sap-usercontext=sap-client=900'
    }
    };

    axios.request(config)
    .then(async(response) => {
    if(response.data.status){
        const userData = response.data.data[0];
        // res.send(response.data.data)'
        console.log(`INSERT INTO userTable
           ([empCode]
           ,[empPassword]
           ,[empName]
           ,[compCode]
           ,[compName]
           ,[plantNo]
           ,[plantName]
           ,[empDesignation]
           ,[payrollArea]
           ,[mobileNo]
           ,[emailIdShakti]
           ,[emailIdPersonal]
           ,[empAddress]
           ,[empStatus]
           ,[createdDate]
           ,[dateModified]
           ,[userLockFlag]
           ,[unSuccessfulAttempts]
           ,[allowUnSuccessfulAttempts]
           ,[setPassword])
     VALUES
           (${userData.pernr}
           ,'Shakti@123'
           ,'${userData.ename}'
           ,${userData.bukrs}
           ,'${userData.butxt}'
           ,${userData.werks}
           ,'${userData.name1}'
           ,${userData.ptext}
           ,'${userData.atext}'
           ,'${userData.telnr}'
           ,'${userData.usrid_long}'
           ,'${userData.usrid}'
           ,'${userData.stras}'
           ,0
           ,'2024-08-23'
           ,'2024-08-23'
           ,0
           ,0
           ,3
           ,0)`);
        //    res.send("api hit check console");
    await db.connect();
        const queryResult = await db.request().query(`INSERT INTO userTable
           ([empCode]
           ,[empPassword]
           ,[empName]
           ,[compCode]
           ,[compName]
           ,[plantNo]
           ,[plantName]
           ,[empDesignation]
           ,[payrollArea]
           ,[mobileNo]
           ,[emailIdShakti]
           ,[emailIdPersonal]
           ,[empAddress]
           ,[empStatus]
           ,[createdDate]
           ,[dateModified]
           ,[userLockFlag]
           ,[unSuccessfulAttempts]
           ,[allowUnSuccessfulAttempts]
           ,[setPassword])
     VALUES
           (${userData.pernr}
           ,'Shakti@123'
           ,'${userData.ename}'
           ,${userData.bukrs}
           ,'${userData.butxt}'
           ,${userData.werks}
           ,'${userData.name1}'
           ,'${userData.ptext}'
           ,'${userData.atext}'
           ,'${userData.telnr}'
           ,'${userData.usrid_long}'
           ,'${userData.usrid}'
           ,'${userData.stras}'
           ,0
           ,'2024-08-23'
           ,'2024-08-23'
           ,0
           ,0
           ,3
           ,0)`);

           if(queryResult.rowsAffected[0]){
            res.send(`User ${userData.ename} has successfully created in our db`);
           }

           db.on('error', (err)=>{
            console.log("Some error :: ", err);
           })
        }
    })
    .catch((error) => {
    console.log(error);
    });
}

module.exports = {fetchDailyAttendace, getEmpPunchData,pushEmpData}