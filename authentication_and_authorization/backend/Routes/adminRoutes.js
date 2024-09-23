const express = require('express');
const gatepassController = require('../Controllers/gatePassControllers'); // gatepass controller
const odotController = require('../Controllers/odotController'); // od ot controller
const authUserThoughMiddleware = require('../middleware/authUserMiddle') // middleware for validations
const confirmationController = require('../Controllers/confirmationController')
const router = express.Router();

//Gate Pass lisitng to HOD
router.get('/gate-pass-listing',authUserThoughMiddleware.checkUserNeeraj, gatepassController.gatePassListing )
router.get('/approve-reject',authUserThoughMiddleware.checkUserNeeraj, gatepassController.approveReject )

//OdOT listing to HOd for approval and reject
router.get('/odot-listing',authUserThoughMiddleware.checkUserNeeraj, odotController.ododListing )
//Approval and rejection of ODOT by HOD
router.get('/odot-approval',authUserThoughMiddleware.checkUserNeeraj, odotController.odotApproval )
// Router for showing the list of employees for the confirmation
router.get('/employee-confirmation-listing-hod',authUserThoughMiddleware.checkUserNeeraj,confirmationController.confirmationListingToHOD)
//Router for confirm ,extend and termination by the HOd
router.post('/hod-confim-extend-terminate',authUserThoughMiddleware.checkUserNeeraj,confirmationController.confimExtendTerminateByHod)


module.exports = router;