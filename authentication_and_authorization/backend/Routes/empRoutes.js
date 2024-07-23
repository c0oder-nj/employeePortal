const express = require('express');
const empControllers = require('../Controllers/empControllers'); // router file for routes
const authUserThoughMiddleware = require('../middleware/authUserMiddle') // middleware for validations
const router = express.Router();


router.get('/employee_dashboard',authUserThoughMiddleware.checkUserNeeraj, empControllers.employeeDashboard )
router.get('/employeeSapNumber',authUserThoughMiddleware.checkUser,empControllers.employeesapNumber)
router.get('/employeeAttendance',authUserThoughMiddleware.checkUser,empControllers.employeeattendance)
router.get('/employeeAttendanceApply',authUserThoughMiddleware.checkUser,empControllers.employeeattendanceApply)


module.exports = router;