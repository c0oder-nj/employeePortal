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

const employeeattendance = async (req, res) => {

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
    // url: 'https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/sync_android_to_sap.htm?pernr=4629',
    url: `https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/sync_android_to_sap.htm?pernr=${sapNumber}`,
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
  console.log(sendEmployeeData)
  return res.json(sendEmployeeData);
}

//Function for leave application

const employeeattendanceApply = async (req, res) => {

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
    // url: 'https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/sync_android_to_sap.htm?pernr=4629',
    url: `https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/sync_android_to_sap.htm?pernr=${sapNumber}`,
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


const employeesapNumber = async (req, res) => {

  // var value = 4629

  console.log(req.query.value)
  const newValue = req.query.value;
  headerValue = newValue.split("=")[1];
  var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
  var sapNumber = decodedValue.empCode;
  console.log(sapNumber)

  return res.json(sapNumber);
}




var responseArr = [];
const fetchEmpData = async (sapid) => {
  console.log(sapid);
  try {
    // const response = await apiService.apiUsingFtech('/oc_emp_details.htm', queryObject, 'get');
    const response = await axios.get(`https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/oc_emp_details.htm?sapid=${sapid}`)
  const data = response.data;
  if (data.status && data.data && data.data.length > 0) {
    // Add the current data to the response array
    responseArr.push(data.data[0]);

    // Get the f_pernr from the current response
    const nextSapid = data.data[0].f_pernr;

    // If f_pernr is not 00000000, continue to fetch the next employee data
    if (nextSapid !== "00000000") {
      await fetchEmpData(nextSapid);
    }
  } else {
    console.log("Invalid response or no data found");
  }
  } catch (error) {
    console.log("Sorry some error occured :: ", error);
  }
  
}

const employeeDashboard = async (req, res) => {
  // make responeArr empty
  responseArr = []
  console.log("Came under controller")
  const queryObject = {
    pernr: req.sapid
  }
  const response = await apiService.apiUsingFtech('/employee_dashboard1.htm', queryObject, 'get');
  // console.log("Before printing response || after getting response")
  fetchEmpData(req.sapid).then(()=>{
    response.hierarchyData = responseArr
    if (response.status) {
      return res.send(response);
    } else {
      return res.json({ "status": false, "message": response.message })
    }
  })
}

const empUpHeirarchy = async(req,res) => {
  responseArr = [];
  const sapid = req.query.sapid;
  fetchEmpData(sapid).then(()=>{
    return res.json({"data": responseArr});
  });
}
module.exports = { employeeattendance, employeeattendanceApply, employeesapNumber, employeeDashboard,empUpHeirarchy };