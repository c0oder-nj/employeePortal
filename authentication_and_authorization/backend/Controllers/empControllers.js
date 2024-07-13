const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sql = require('mssql');
const db = require('../databaseConnection')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const axios = require('axios')
dotenv.config();


//Fetching data for employee attendance

const employeeattendance = async (req,res)=>{

    // var value = 4629

    console.log(req.query.value)
    const newValue = req.query.value;
    headerValue = newValue.split("=")[1];
    // console.log("Your : ",headerValue)
    var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
    // console.log(decodedValue)
    var sapNumber = decodedValue.empCode;
    console.log(sapNumber)
    console.log("Here")
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        // url: 'https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/sync_android_to_sap.htm?pernr=4629',
        url:`https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/sync_android_to_sap.htm?pernr=${sapNumber}`,
        headers: { 
          'Cookie': 'sap-usercontext=sap-client=900'
        }
      };
      
      var sendEmployeeData = {};
      const employeeAttendanceData = 
      await axios.request(config)
      .then((response) => {
        // console.log((response.data));

        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });


    console.log(employeeAttendanceData.leavebalance)
    sendEmployeeData.leave = employeeAttendanceData.leavebalance
    sendEmployeeData.leaveInfo = employeeAttendanceData.leaveemp

    console.log("szldvhlkzsjhvb;lzshvblksdzfhvblkzsdfvlkzsdfvblkzsdf")
    console.log(sendEmployeeData)
    return res.json(sendEmployeeData); 
}



module.exports = {employeeattendance};