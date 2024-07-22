const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sql = require('mssql');
const db = require('../databaseConnection')
const cookieParser = require('cookie-parser')
const apiService = require('../Services/apiService')
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
    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        // url: 'https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/sync_android_to_sap.htm?pernr=5051',
        url:`https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/sync_android_to_sap.htm?pernr=${sapNumber}`,
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


    // console.log(employeeAttendanceData.leavebalance)
    sendEmployeeData.leave = employeeAttendanceData.leavebalance
    sendEmployeeData.leaveInfo = employeeAttendanceData.leaveemp
    sendEmployeeData.companyEmployee = employeeAttendanceData.activeemployee 
    console.log("szldvhlkzsjhvb;lzshvblksdzfhvblkzsdfvlkzsdfvblkzsdf")
    // console.log(sendEmployeeData)
    return res.json(sendEmployeeData); 
}

//Function for leave application

const employeeattendanceApply = async (req,res)=>{

  // var value = 4629

  console.log(req.query.value)
  const newValue = req.query.value;
  headerValue = newValue.split("=")[1];
  // console.log("Your : ",headerValue)
  var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
  // console.log(decodedValue)
  var sapNumber = decodedValue.empCode;
  console.log(sapNumber)
  
  let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/sync_android_to_sap.htm?pernr=4629',
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


  // console.log(employeeAttendanceData.leavebalance)
  sendEmployeeData.leave = employeeAttendanceData.leavebalance
  sendEmployeeData.leaveInfo = employeeAttendanceData.leaveemp
  
  // console.log(sendEmployeeData.companyEmployee)

  console.log("szldvhlkzsjhvb;lzshvblksdzfhvblkzsdfvlkzsdfvblkzsdf")
  console.log(sendEmployeeData)
  return res.json(sendEmployeeData); 
}


// Create a leave application 
const employeeLeaveCreation = async (req,res) =>{
  console.log("Your value",req.body)

  const result = await axios.get(`https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/leave_create.htm?app_pernr=${req.body.SapNumber}&app_leave_type=${req.body.LeaveType}&app_leave_duration=${req.body.LeaveDuration}&app_leave_from=${req.body.LeaveFrom}&app_leave_to=${req.body.LeaveTo}&tim_fr=${req.body.TimeFrom}&tim_to=${req.body.TimeTo}&app_leave_reason=${req.body.LeaveReason}&app_per_chrg1=${req.body.LeaveCharge1}&app_per_chrg2=${req.body.LeaveCharge2}&app_per_chrg3=&app_per_chrg4=`);
  console.log(result.data);
  console.log("Your cookie is working")
  // res.status(200).send({message : "Working",key:"Value"})
  return res.json({message : "Working",key:"Value"});
}

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


//Function to show the leave approval request to HOD
const employeeLeaveStatus = async (req,res)=>{
  
  console.log(req.query.value)
  const newValue = req.query.value;
  headerValue = newValue.split("=")[1];
  
  var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
  
  var sapNumber = decodedValue.empCode;
  console.log(sapNumber)
  
  let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/sync_android_to_sap.htm?pernr=5089',
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


  // console.log(employeeAttendanceData.leavebalance)
  sendEmployeeData.employeePendingLeave = employeeAttendanceData.pendingleave
  // sendEmployeeData.leaveInfo = employeeAttendanceData.leaveemp
  
  // console.log(sendEmployeeData.companyEmployee)

  console.log("Below is a list of pending leaves of differnt employees in a particular department")
  console.log(sendEmployeeData)
  return res.json(sendEmployeeData);
}


module.exports = {employeeattendance,employeeattendanceApply,employeesapNumber,employeeLeaveCreation,employeeLeaveStatus};
const employeeProfile = async(req,res) =>{
  console.log("Came under controller")
  const queryObject = {
    sapid : req.sapid
  }
  const response = await apiService.apiUsingFtech('/employee_profile.htm', queryObject, 'get' );
  console.log("Before printing response || after getting response")
  console.log(response);
  if(response.status){
    return res.send(response);
  }else{
    return res.json({"status":false, "message" : response.message})
  }
}




module.exports = {employeeattendance,employeeattendanceApply,employeesapNumber,employeeProfile};
