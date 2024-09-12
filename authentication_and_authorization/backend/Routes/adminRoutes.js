const express = require('express');
const gatepassController = require('../Controllers/gatePassControllers'); // gatepass controller
const odotController = require('../Controllers/odotController'); // od ot controller
const authUserThoughMiddleware = require('../middleware/authUserMiddle') // middleware for validations
const router = express.Router();


router.get('/gate-pass-listing',authUserThoughMiddleware.checkUserNeeraj, gatepassController.gatePassListing )
router.get('/approve-reject',authUserThoughMiddleware.checkUserNeeraj, gatepassController.approveReject )
router.get('/odot-listing',authUserThoughMiddleware.checkUserNeeraj, odotController.ododListing )
router.get('/odot-approval',authUserThoughMiddleware.checkUserNeeraj, odotController.odotApproval )



module.exports = router;