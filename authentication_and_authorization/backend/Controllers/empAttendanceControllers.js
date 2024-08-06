const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sql = require('mssql');
const db = require('../databaseConnection')
const cookieParser = require('cookie-parser')
const apiService = require('../Services/apiService')
const dotenv = require('dotenv')
const axios = require('axios')
dotenv.config();


const employeesapNumber = async (req,res)=>{
    // var value = 4629
    console.log(req.query.value)
    const newValue = req.query.value;
    headerValue = newValue.split("=")[1];
    var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
    var sapNumber = decodedValue.empCode;
    console.log(sapNumber)
    
    return res.json(sapNumber); 
}


//Function to show the daily attendance status
const employeeDailyAttendnceStatus = async (req,res)=>{
    console.log("Hello You are in attendance status");

  console.log(req.query.value)
  const newValue = req.query.value;
  headerValue = newValue.split("=")[1];
  var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
  var sapNumber = decodedValue.empCode;
  console.log(sapNumber)
  let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/employee_dashboard1.htm?pernr=${sapNumber}`,
      // url: `https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/employee_dashboard1.htm?pernr=${sapNumber}`,
      // url:`https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/sync_android_to_sap.htm?pernr=${sapNumber}`,
      headers: { 
        'Cookie': 'sap-usercontext=sap-client=900'
      }
    };
    
    var sendEmployeeData = {};
    const employeeAttendanceData = 
    await axios.request(config)
    .then((response) => {
      // console.log((response.data));
      console.log("Here")
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  sendEmployeeData.employeeAttendance = employeeAttendanceData.attendanceemp
  sendEmployeeData.sapNumber = sapNumber
  console.log("Below is a list of pending leaves of differnt employees in a particular department")
  console.log(sendEmployeeData)
  return res.json(sendEmployeeData);
}

//Funtion for attendance correction of logged in employee
const employeeDailyAttendnceCorrection = async (req,res)=>{
  // console.log("Your value",req.body)
  const result = await axios.get(`https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/attendance_correction.htm?date=${req.body.date}&perno=${req.body.SapNumber}&status=${req.body.status}&remark=${req.body.remark}`);
  console.log(result.data);
  console.log("Your cookie is working")
  res.status(200).send(result.data)
}

//Funtion for attendance correction of logged in employee
const allEmployeeDailyAttendnceCorrection = async (req,res)=>{
  // console.log("Your value",req.body)
  console.log(req.query.value)
  const newValue = req.query.value;
  headerValue = newValue.split("=")[1];
  var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
  var sapNumber = decodedValue.empCode;

  const result = await axios.get(`https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/hod_emp_attendance.htm?sapid=5089`);
  console.log(result.data);
  console.log("All employee attendance ")
  res.status(200).send(result.data)
}


module.exports = {allEmployeeDailyAttendnceCorrection,employeesapNumber,employeeDailyAttendnceStatus,employeeDailyAttendnceCorrection};
