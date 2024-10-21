const express = require('express');
const gatepassController = require('../Controllers/gatePassControllers'); // gatepass controller
const odotController = require('../Controllers/odotController'); // od ot controller
const cOffController = require('../Controllers/coffController'); //coff controller

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
router.get('/coff-listing',authUserThoughMiddleware.checkUserNeeraj, cOffController.cOffListingHod )
router.post('/coff-approval',authUserThoughMiddleware.checkUserNeeraj, cOffController.cOffApproval )



// Router for showing the list of employees for the confirmation
router.get('/employee-confirmation-listing-hod',authUserThoughMiddleware.checkUserNeeraj,confirmationController.confirmationListingToHOD)
//Router for confirm ,extend and termination by the HOd
router.post('/hod-confim-extend-terminate',authUserThoughMiddleware.checkUserNeeraj,confirmationController.confimExtendTerminateByHod)
//Router to show the details of form and ppt of employee to hod
router.get('/hod-show-form-ppt-details',authUserThoughMiddleware.checkUserNeeraj,confirmationController.confirmationShowPptAndFormData)
router.get('/assesment-form',authUserThoughMiddleware.checkUserNeeraj,confirmationController.assesmentDataShow);

//Router for final confirmation remark and approval from HOD side after viewing ppt and assesment form
router.post('/final-hod-remark',authUserThoughMiddleware.checkUserNeeraj,confirmationController.sendApprovalToHrFromHOD); 
router.post('/hr-approval',authUserThoughMiddleware.checkUserNeeraj,confirmationController.hrlvl1Controller);

router.get('/hrlv1-lisitng',authUserThoughMiddleware.checkUserNeeraj,confirmationController.confirmationShowPptAndFormDataHrlvl1)


module.exports = router;