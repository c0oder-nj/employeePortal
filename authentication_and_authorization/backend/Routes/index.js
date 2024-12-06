const express = require('express');
const authRoutes = require('./authRoutes');
const empRoutes = require('./empRoutes');
const jobRoutes = require('./jobRoutes');
const adminRoutes = require('./adminRoutes');
const customerPortalRoutes = require('./customerPortalRoutes');
const distanceRoutes = require('./distanceCalculatorRoute');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/employee', empRoutes);
router.use('/job',jobRoutes);
router.use('/admin', adminRoutes);


// seperate projects 
router.use('/customer-portal',customerPortalRoutes )
router.use('/distance-calculator',distanceRoutes )
module.exports = router;