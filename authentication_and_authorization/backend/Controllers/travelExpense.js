const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sql = require("mssql");
const db = require("../databaseConnection");
const cookieParser = require("cookie-parser");
const apiService = require("../Services/apiService");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();


//function for getting an information about country code and cost center code

const countryCodeAndCostCenter = async(req,res)=>{
  const result = await axios.get(`https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/country_costcenter.htm`);
  console.log(result);
  console.log("Your cookie is working")

  res.status(200).send({country_code : result.data.country_code, 
                            cost_center : result.data.cost_center });
}

//Function to show the travel allowance
const domesticTravelAllowance = async (req, res) => {
  console.log("Hello You are in domestic travel allowance");

  // console.log(req.query.value)
  const newValue = req.query.value;
  headerValue = newValue.split("=")[1];
  var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
  var sapNumber = decodedValue.empCode;
  console.log(sapNumber);
  console.log(req.body);
  const tripDetails = req.body.expenseDataToBeSend[0];
  console.log(tripDetails);
  const tripDetailsString = JSON.stringify(tripDetails);
  console.log(tripDetailsString);
  const result = await axios.get(
    `https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_emp_app_1/travel_expense_entry.htm?date1=${req.body.TimeStart}&date2=${req.body.TimeEnd}&country=${req.body.Country}&location=${req.body.Location}&cost_center=${req.body.CostCenter}&perno=${sapNumber}&trip_details=${tripDetailsString}`
  );
  console.log(result.data);
  console.log("Your cookie is working");
  res.status(200).send(result.data);
};

//Function to fetch all the travel report of a given sap

const travelExpenseUsingSap = async(req,res)=>{
  const newValue = req.query.value;
  headerValue = newValue.split("=")[1];
  var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
  var sapNumber = decodedValue.empCode;
  const result = await axios.get(`https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/trip_listing.htm?sapid=${sapNumber}`);
  console.log(result);
  console.log("Show travel")
  res.status(200).send({travel_data : result.data})
  // res.status(200).send({country_code : result.data.country_code, 
  //                           cost_center : result.data.cost_center });
}

//Function to fetch employee travel expense on the basis of sapCode and travel code

const travelExpenseUsingSapAndTravelCode = async(req,res)=>{

  console.log("You are in sap and trip code")
  console.log(req.query.sapNumber,req.query.tripNumber)
  const result = await axios.get(`https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/trip_details_api.htm?sapid=${req.query.sapNumber}&tripno=${req.query.tripNumber}`);
  // console.log(result);
  console.log("Show travel")
  res.status(200).send({travel_data : result.data})
  
  // res.status(200).send({"Hello":"Message"});
  // res.status(200).send({country_code : result.data.country_code, 
  //                           cost_center : result.data.cost_center });
}

const travelExpenseDelete = async(req,res)=>{

  console.log("You are in delete section sap and trip code")
  console.log(req.query.sapNumber,req.query.tripNumber)
  const result = await axios.get(`https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/trip_delete.htm?sapid=${req.query.sapNumber}&tripno=${req.query.tripNumber}`);
  console.log(result);
  console.log("Show travel")
  res.status(200).send({messageType : result.data.msgtype,message:result.data.msg})
  
  // res.status(200).send({"Hello":"Message"});
  // res.status(200).send({country_code : result.data.country_code, 
  //                           cost_center : result.data.cost_center });
}

//Function to create trip trip by employe  whci has been submitted before. 
const travelExpenseCreate = async(req,res)=>{

  console.log("You are in create showing undefined section sap and trip code")
  console.log(req.query.sapNumber,req.query.tripNumber,req.query.objectText,req.query.outcomeText)
  const result = await axios.get(`http://spquasrvr1.shaktipumps.com:8000/sap/bc/bsp/sap/zhr_portal_new/emp_trip_complete.htm?sapid=${req.query.sapNumber}&tripno=${req.query.tripNumber}&obj_txt=${req.query.objectText}&out_txt=${req.query.outcomeText}`);
  console.log(result);
  // console.log("Show travel")
  res.status(200).send({messageType : result.data.msg_type,message:result.data.msg})
  
  // res.status(200).send({"Hello":"Message"});
  // res.status(200).send({country_code : result.data.country_code, 
  //                           cost_center : result.data.cost_center });
}


//Function to show travel expense hod approval  
const showTravelExpenseHodApproval = async(req,res)=>{

  console.log("You are in create section sap and trip code line 110")
  // console.log(req.query.sapNumber)
  const newValue = req.query.value;
  headerValue = newValue.split("=")[1];
  var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
  var sapNumber = decodedValue.empCode;
  const result = await axios.get(`https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/trip_listing_hod_approval.htm?sapid=${sapNumber}`);
  console.log(result);
  // res.status(200).send({messageType : result.data.msg_type,message:result.data.msg})
  res.status(200).send({status : "True",data : result.data})
}

//Function to approve travel allowance by the Hod for particular sapNumber and Trip number
const travelExpenseHodApproval = async(req,res)=>{

  console.log("You are in approve by hod section sap and trip code")
  // console.log(req.query.sapNumber)
  const newValue = req.query.value;
  const sapNumber = req.query.sapNumber;
  const tripNumber = req.query.tripNumber;
  headerValue = newValue.split("=")[1];
  var decodedValue = jwt.verify(headerValue, "gfg_jwt_secret_key");
  var sapNumberOfApprover = decodedValue.empCode;
  console.log("Line number 133 sap number of approver :: " , sapNumberOfApprover);
  const result = await axios.get(`https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/emp_trip_hod_approval.htm?sapid=${sapNumber}&tripno=${tripNumber}&hodid=${sapNumberOfApprover}`);
  console.log(result.data);
  res.status(200).send({'messageType' : result.data.msg_type,'message':result.data.message})
  // res.status(200).send({status : "True",data : result.data})
}

module.exports = {travelExpenseHodApproval,showTravelExpenseHodApproval,travelExpenseCreate, travelExpenseUsingSap,domesticTravelAllowance ,countryCodeAndCostCenter,travelExpenseUsingSapAndTravelCode,travelExpenseDelete };
