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

    // console.log(req.query.value)
    // const newValue = req.query.value;
    // headerValue = newValue.split("=")[1];
    // // console.log("Your : ",headerValue)
    // var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
    // // console.log(decodedValue)
    var sapNumber = req.sapid;
    console.log(sapNumber)
    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        // url: 'https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/sync_android_to_sap.htm?pernr=5051',
        url:`${process.env.BASE_URL}/apply_leave.htm?pernr=${sapNumber}`, 
        headers: { 
          'Cookie': 'sap-usercontext=sap-client=900'
        }
      };
      
      var sendEmployeeData = {};
      const employeeAttendanceData = 
      await axios.request(config)
      .then((response) => {
        console.log(typeof response.data);
        console.log("Here")
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  
      // console.log(employeeAttendanceData);

    // console.log(employeeAttendanceData.leavebalance)
    sendEmployeeData.leave = employeeAttendanceData.leavebalance
    sendEmployeeData.leaveInfo = employeeAttendanceData.leaveemp
    sendEmployeeData.companyEmployee = employeeAttendanceData.activeemployee 
    console.log("szldvhlkzsjhvb;lzshvblksdzfhvblkzsdfvlkzsdfvblkzsdf")
    console.log(sendEmployeeData)
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

// const employeeattendanceApply = async (req, res) => {

//   // var value = 4629

//   console.log(req.query.value)
//   const newValue = req.query.value;
//   headerValue = newValue.split("=")[1];
//   // console.log("Your : ",headerValue)
//   var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
//   // console.log(decodedValue)
//   var sapNumber = decodedValue.empCode;
//   console.log(sapNumber)

//   let config = {
//     method: 'get',
//     maxBodyLength: Infinity,
//     // url: 'https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/sync_android_to_sap.htm?pernr=4629',
//     url: `https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/sync_android_to_sap.htm?pernr=${sapNumber}`,
//     headers: {
//       'Cookie': 'sap-usercontext=sap-client=900'
//     }
//   };

//   var sendEmployeeData = {};
//   const employeeAttendanceData =
//     await axios.request(config)
//       .then((response) => {
//         // console.log((response.data));
//         console.log("Here")
//         return response.data;
//       })
//       .catch((error) => {
//         console.log(error);
//       });


//   // console.log(employeeAttendanceData.leavebalance)
//   sendEmployeeData.leave = employeeAttendanceData.leavebalance
//   sendEmployeeData.leaveInfo = employeeAttendanceData.leaveemp

//   // console.log(sendEmployeeData.companyEmployee)

//   console.log("szldvhlkzsjhvb;lzshvblksdzfhvblkzsdfvlkzsdfvblkzsdf")
//   console.log(sendEmployeeData)
//   return res.json(sendEmployeeData);
// }



// Create a leave application 
const employeeLeaveCreation = async (req,res) =>{
  const sapNumber = req.sapid;
  console.log("Your value",req.body)
  console.log("Printing sap number :: ", sapNumber)

  // return res.send("api hit");

  const result = await axios.get(`https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/leave_create.htm?app_pernr=${sapNumber}&app_leave_type=${req.body.LeaveType}&app_leave_duration=${req.body.LeaveDuration}&app_leave_from=${req.body.LeaveFrom}&app_leave_to=${req.body.LeaveTo}&tim_fr=${req.body.TimeFrom}&tim_to=${req.body.TimeTo}&app_leave_reason=${req.body.LeaveReason}&app_per_chrg1=${req.body.LeaveCharge1}&app_per_chrg2=${req.body.LeaveCharge2}&app_per_chrg3=&app_per_chrg4=`);
  console.log(result.data);
  console.log("Your cookie is working")

  //Working
  //res.status(200).send({status :"True",message : result.data[0].name})
  var data = null;
  if(result.data[0].name=="31.12.2024"){
    data = {status :"True",message : "Some data is missing "}
  }else{
    data = {status :"True",message : result.data[0].name}
  }
  res.status(200).send(data)
  // console.log("Leave created")
  // return res.json({message : "Working",key:"Value"});
}

const employeesapNumber = async (req,res)=>{
  return res.json(req.sapid);
}

var responseArr = [];
const fetchEmpData = async (sapid) => {
  console.log(sapid);
  try {
    // const response = await apiService.apiUsingFtech('/oc_emp_details.htm', queryObject, 'get');
    const endpont = `https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/oc_emp_details.htm?sapid=${sapid}`
    console.log("Organization chart endpoint before hitting :: ", endpont)
    const response = await axios.get(endpont)
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

  
//Function to show the leave approval request to HOD
const employeeLeaveStatus = async (req,res)=>{
  
  // console.log(req.query.value)
  // const newValue = req.query.value;
  // headerValue = newValue.split("=")[1];

  // var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
  
  // var sapNumber = decodedValue.empCode;
  var sapNumber = req.sapid;
  console.log(sapNumber)
  
  let config = {
      method: 'get',
      maxBodyLength: Infinity,
      // url: `https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/sync_android_to_sap.htm?pernr=5089`,
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
      console.log("Here")
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });


  // console.log(employeeAttendanceData.leavebalance)
  sendEmployeeData.employeePendingLeave = employeeAttendanceData.pendingleave
  sendEmployeeData.sapNumber = sapNumber
  // sendEmployeeData.leaveInfo = employeeAttendanceData.leaveemp
  
  // console.log(sendEmployeeData.companyEmployee)

  console.log("Below is a list of pending leaves of differnt employees in a particular department")
  console.log(sendEmployeeData)
  return res.json(sendEmployeeData);
}

const employeeDashboard = async(req,res) =>{
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

const holidays = async (req,res) => {
  const response = await apiService.onlyUri('/holidays.htm' , 'get');
  if(response.status){
    return res.send(response);
  }else{
    return res.json({ "status": false, "message": "Some error at controller fuction api" })
  }
}
const empUpHeirarchy = async(req,res) => {
  responseArr = [];
  const sapid = req.query.sapid;
  fetchEmpData(sapid).then(()=>{
    return res.json({"data": responseArr});
  });
}


const employeeProfile = async (req,res) => {
  const sapid = req.sapid;
  const queryObject = {
    sapid: sapid
  }
  const response = await apiService.apiUsingFtech('/employee_profile.htm', queryObject, 'get');
  if(response.status){
    return res.send(response.data.at(0));
  }else{
    return res.send({'status' : false, 'message' : 'Cannot get data for your profile. Pleae contact admin'})
  }
}



const getRoles = async (req,res) => {
  const pernr = req.sapid;
  let status; // employee ppt status (whether the ppt available for filling or not)
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.BASE_URL}/check_for_emp_ppt.htm?pernr=${pernr}`,
    headers: { 
      'Cookie': 'sap-usercontext=sap-client=900'
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    if(response.status == 200){
      status = response.data.status;
    }else{
      status = false;
    }
    return res.json({'user': true,'name' : req.name, 'roles' : req.roles, 'sapid' : req.sapid, 'designation' : req.designation, 'mobile' : req.mobile, 'email' : req.mail , 'address' : req.address, 'status' : status });
  })
  .catch((error) => {
    console.log(error);
  });


  
}



// module.exports = {employeeattendance,employeeattendanceApply,employeesapNumber,employeeProfile};
module.exports = {employeeattendance,employeeattendanceApply,employeesapNumber,employeeLeaveCreation,employeeLeaveStatus,employeeDashboard,empUpHeirarchy, holidays,employeeProfile,getRoles};
// module.exports = {employeeattendance,employeeattendanceApply,employeesapNumber,employeeDashboard};
