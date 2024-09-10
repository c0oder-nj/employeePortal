const express = require('express');
const gatepassController = require('../Controllers/gatePassControllers'); // router file for routes
const authUserThoughMiddleware = require('../middleware/authUserMiddle') // middleware for validations
const router = express.Router();


router.get('/gate-pass-listing',authUserThoughMiddleware.checkUserNeeraj, gatepassController.gatePassListing )
router.get('/approve-reject',authUserThoughMiddleware.checkUserNeeraj, gatepassController.approveReject )



module.exports = router;