const express = require('express');
const empControllers = require('../Controllers/empControllers'); // router file for routes
const gatepassController = require('../Controllers/gatePassControllers');
const odotController = require("../Controllers/odotController");
const authUserThoughMiddleware = require('../middleware/authUserMiddle') // middleware for validations
const coffController = require('../Controllers/coffController')

const router = express.Router();


router.get('/employee_dashboard',authUserThoughMiddleware.checkUserNeeraj, empControllers.employeeDashboard )
router.get('/employee_profile',authUserThoughMiddleware.checkUserNeeraj, empControllers.employeeProfile )
router.get('/holidays',authUserThoughMiddleware.checkUserNeeraj, empControllers.holidays )
router.get('/roles',authUserThoughMiddleware.checkUserRoles, empControllers.getRoles )
router.get('/employeeSapNumber',authUserThoughMiddleware.checkUser,empControllers.employeesapNumber)
router.get('/employeeAttendance',authUserThoughMiddleware.checkUser,empControllers.employeeattendance)
router.get('/employeeAttendanceApply',authUserThoughMiddleware.checkUser,empControllers.employeeattendanceApply)
router.get('/empUpperHeirarchy',empControllers.empUpHeirarchy)
router.post('/gate-pass-creation',authUserThoughMiddleware.checkUserNeeraj,gatepassController.createGatePass)
router.get('/gatepass-listing', authUserThoughMiddleware.checkUserNeeraj,gatepassController.gatePassListingEmp )
router.post('/odot-create',authUserThoughMiddleware.checkUserNeeraj,odotController.createOdOt)
router.get('/odot-show-employee',authUserThoughMiddleware.checkUserNeeraj,odotController.odotListingEmp)
router.get('/coff-list',authUserThoughMiddleware.checkUserNeeraj,coffController.cOffListing)
router.post('/coff-application',authUserThoughMiddleware.checkUserNeeraj,coffController.cOffApplication)
module.exports = router;