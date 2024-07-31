const dotenv = require('dotenv');
const axios = require('axios');
const fs = require('fs/promises');
const { json } = require('express');
const attendanceData = require('../Json/dailyAttendance.json')
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

    console.log(uri);
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

module.exports = {fetchDailyAttendace, getEmpPunchData}