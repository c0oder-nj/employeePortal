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
  const result = await axios.get(`https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/trip_listing.htm?sapid=285`);
  console.log(result);
  console.log("Show travel")
  res.status(200).send({travel_data : result.data})
  // res.status(200).send({country_code : result.data.country_code, 
  //                           cost_center : result.data.cost_center });
}

//Function to fetch employee travel expense on the basis of sapCode and travel code

const travelExpenseUsingSapAndTravelCode = async(req,res)=>{
  const result = await axios.get(`https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/trip_details_api.htm?sapid=285&tripno=2743`);
  console.log(result);
  console.log("Show travel")
  res.status(200).send({travel_data : result.data})
  // res.status(200).send({country_code : result.data.country_code, 
  //                           cost_center : result.data.cost_center });
}


module.exports = { travelExpenseUsingSap,domesticTravelAllowance ,countryCodeAndCostCenter,travelExpenseUsingSapAndTravelCode };
