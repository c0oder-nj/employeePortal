const express = require('express');
const adminController = require('../Controllers/adminControllers'); // router file for routes
const authUserThoughMiddleware = require('../middleware/authUserMiddle') // middleware for validations
const router = express.Router();


router.get('/gate-pass-listing',authUserThoughMiddleware.checkUserNeeraj, adminController.gatePassListing )
router.get('/approve-reject',authUserThoughMiddleware.checkUserNeeraj, adminController.approveReject )
router.get('/gate-pass-creation',authUserThoughMiddleware.checkUserNeeraj,adminController.createGatePass)


module.exports = router;