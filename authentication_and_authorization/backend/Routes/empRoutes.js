const express = require('express');
const empControllers = require('../Controllers/empControllers'); // router file for routes
const authUserThoughMiddleware = require('../middleware/authUserMiddle') // middleware for validations
const router = express.Router();


router.get('/employee_dashboard',authUserThoughMiddleware.checkUserNeeraj, empControllers.employeeDashboard )
router.get('/employee_profile',authUserThoughMiddleware.checkUserNeeraj, empControllers.employeeProfile )
router.get('/holidays',authUserThoughMiddleware.checkUserNeeraj, empControllers.holidays )
router.get('/roles',authUserThoughMiddleware.checkUserNeeraj, empControllers.getRoles )
router.get('/employeeSapNumber',authUserThoughMiddleware.checkUser,empControllers.employeesapNumber)
router.get('/employeeAttendance',authUserThoughMiddleware.checkUser,empControllers.employeeattendance)
router.get('/employeeAttendanceApply',authUserThoughMiddleware.checkUser,empControllers.employeeattendanceApply)
router.get('/empUpperHeirarchy',empControllers.empUpHeirarchy)


module.exports = router;