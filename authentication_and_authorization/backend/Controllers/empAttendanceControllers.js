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
      url: `https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/employee_dashboard1.htm?pernr=${sapNumber}`,
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
  console.log("Your value for attendance correction",req.body)
  const result = await axios.get(`https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/attendance_correction.htm?date=${req.body.date}&perno=${req.body.SapNumber}&status=${req.body.status}&remark=${req.body.remark}`);
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

  const result = await axios.get(`https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/hod_emp_attendance.htm?sapid=${sapNumber}`);
  console.log("From data",result.data);
  console.log("All employee attendance")
  res.status(200).send(result.data)
}

//Function for approve and decline of a request

const allEmployeeDailyAttendnceApproveReject = async (req,res)=>{
  // console.log("Your value",req.body)
  console.log(req.query.value)
  const newValue = req.query.value;
  headerValue = newValue.split("=")[1];
  var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
  var sapNumber = decodedValue.empCode;

  if(req.query.option==1){

    const result = await axios.get(`https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/leave_apporvereject.htm?leave_no=${req.query.type}&approver=${sapNumber}&sign=1`);
    console.log(result.data);
    console.log("All employee attendance approve ")
    res.status(200).send(result.data)
  }else{
    const result = await axios.get(`https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/leave_apporvereject.htm?leave_no=${req.query.type}&approver=${sapNumber}&sign=2`);
    console.log(result.data);
    console.log("All employee attendance reject ")
    res.status(200).send(result.data)
  }
}



module.exports = {allEmployeeDailyAttendnceApproveReject,allEmployeeDailyAttendnceCorrection,employeesapNumber,employeeDailyAttendnceStatus,employeeDailyAttendnceCorrection};
