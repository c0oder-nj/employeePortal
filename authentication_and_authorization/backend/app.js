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
env.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:5000",
    "http://localhost:3000",
    "http://localhost:3001",
  ], // Whitelist the domains you want to allow
  methods: "GET, POST, PUT, DELETE, HEAD",
};
app.use(cors(corsOptions));
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
// //Just for test
app.post("/api/auth/test", authControllers.test);

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
  authUserThoughMiddleware.checkUser,
  empControllers.employeeattendance
);

//For Leave creation
app.post(
  "/api/employee/employeeAttendanceApply",
  authUserThoughMiddleware.checkUser,
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
  authUserThoughMiddleware.checkUser,
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
