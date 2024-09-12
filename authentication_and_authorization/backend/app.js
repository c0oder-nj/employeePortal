const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const env = require("dotenv");
const authControllers = require("./Controllers/authControllers");
const empControllers = require("./Controllers/empControllers");
const empAttnedanceControllers = require("./Controllers/empAttendanceControllers");
const empTravelExpense = require("./Controllers/travelExpense");
const authUserThoughMiddleware = require("./middleware/authUserMiddle");
const routes = require("./Routes/index");
const { default: axios } = require("axios");
env.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  credentials: true,
  origin: ["http://empportal.shaktipumps.com/", "http://localhost:3000", "http://localhost:3001", "http://www.empportal.shaktipumps.com" ], // Whitelist the domains you want to allow 
   origin : '*',
  methods: "GET, POST, PUT, DELETE, HEAD, OPTIONS",
};
app.use(cors(corsOptions));

// setting res headers for cors error
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,HEAD');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});




// Working on session : start
//app.use(session({secret : "Creating a seesion for user authentication"}))
// app.use(session({
//     secret: 'your-secret-key', // Replace with a strong and unique string
//     resave: false,
//     saveUninitialized: false
// }));
//Working on session : end
app.get("/", (req, res) => {
  // res.cookie("name","test")
  // req.session.username = "Programming"
  res.status(200).send("Server is running ");
});

app.post("/TestAPI", express.raw({ type: "*/*" }), (req, res) => {
  // res.cookie("name","test")
  console.log("ReQ:: ", req.body);
  res.status(200).send("Server is running ");
});

// //For user login and jwt token creation
// app.post('/api/auth/login',authControllers.login)
// // //Just for test
// app.post("/api/auth/test", authControllers.test);

// //For setting a password
// app.post('/api/auth/setPassword',authControllers.setPassword)
// // app.post('/api/auth/home',authControllers.home)

// //For dashboard content
// app.get('/api/auth/home',authUserThoughMiddleware.checkUser,authControllers.home)

//For Employee attendance need to add middleware
app.get(
  "/api/employee/employeeSapNumber",
  authUserThoughMiddleware.checkUser,
  empControllers.employeesapNumber
);
app.get(
  "/api/employee/employeeAttendance",
  authUserThoughMiddleware.checkUserNeeraj,
  empControllers.employeeattendance
);

//For Leave creation
app.post(
  "/api/employee/employeeAttendanceApply",
  authUserThoughMiddleware.checkUserNeeraj,
  empControllers.employeeLeaveCreation
);

//Leave showing to HOD
app.get(
  "/api/employee/employeeLeaveApproval",
  authUserThoughMiddleware.checkUser,
  empControllers.employeeLeaveStatus
);

app.get(
  "/api/DailyAttendance/employeeDailyAttendnceStatus",
  authUserThoughMiddleware.checkUserNeeraj,
  empAttnedanceControllers.employeeDailyAttendnceStatus
);
app.post(
  "/api/DailyAttendance/employeeDailyAttendnceCorrectionStatus",
  empAttnedanceControllers.employeeDailyAttendnceCorrection
);

//Api to show all the previous day daily attendance of all the employees who are under HOD
app.get(
  "/api/DailyAttendance/allEmployeeDailyAttendnceCorrection",
  authUserThoughMiddleware.checkUser,
  empAttnedanceControllers.allEmployeeDailyAttendnceCorrection
);

//Api for approve and reject of leave
app.get(
  "/api/employee/employeeAttendanceApproveReject",
  authUserThoughMiddleware.checkUser,
  empAttnedanceControllers.allEmployeeDailyAttendnceApproveReject
)

//Information about country code and cost center
app.get(
  "/api/TravelExpense/countryAndCostCenterCode",
  empTravelExpense.countryCodeAndCostCenter
);

//Employee's domestic leave approval
app.post(
  "/api/TravelExpense/domesticTravelExpens",
  authUserThoughMiddleware.checkUser,
  empTravelExpense.domesticTravelAllowance
);

//Show all travel expense using sap only
app.get(
  "/api/TravelExpense/showExpenseUsingSap",
  authUserThoughMiddleware.checkUser,
  empTravelExpense.travelExpenseUsingSap
);

//Show travel expense using sap and travel code
app.get(
  "/api/TravelExpense/showExpenseUsingSapAndCode",
  authUserThoughMiddleware.checkUser,
  empTravelExpense.travelExpenseUsingSapAndTravelCode
);

//Delete Travel expense using sap and trip number
app.get(
  "/api/TravelExpense/deleteExpenseUsingSapAndCode",
  authUserThoughMiddleware.checkUser,
  empTravelExpense.travelExpenseDelete
);

//Create travel expense using sap and trip number
app.get(
  "/api/TravelExpense/createRequestExpenseUsingSapAndCode",
  authUserThoughMiddleware.checkUser,
  empTravelExpense.travelExpenseCreate
);

//Show travel expense approval to HOD
app.get(
  "/api/TravelExpense/showTravelExpenseToHOD",
  authUserThoughMiddleware.checkUser,
  empTravelExpense.showTravelExpenseHodApproval
);

//Approve travel expense by HOD
app.get(
  "/api/TravelExpense/approveTravelExpenseByHOD",
  authUserThoughMiddleware.checkUser,
  empTravelExpense.travelExpenseHodApproval
);


app.use("/api", routes);

app.get("/get_cookie", (req, res) => {
  console.log(req.session.username);
  res.status(200).send("Cookie printed to console");
});

app.get("/destroy_cookie", (req, res) => {
  req.session.destroy();
  // console.log(req.session.username);
  res.status(200).send("Cookie printed to console");
});

// api endpoint for getting the sap data into our mssql database
// app.get('/api/get_data',authControllers.getData);

//for encoding a password
app.get("/encode_me", authControllers.encodePassword);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});








// Job server in the same server
setInterval(() => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/job/fetch-attendance',
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}, 1000*60*15);
