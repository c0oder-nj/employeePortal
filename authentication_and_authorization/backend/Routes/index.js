const express = require('express');
const authRoutes = require('./authRoutes');
const empRoutes = require('./empRoutes');
const jobRoutes = require('./jobRoutes');
const adminRoutes = require('./adminRoutes');
const customerPortalRoutes = require('./customerPortalRoutes');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/employee', empRoutes);
router.use('/job',jobRoutes);
router.use('/admin', adminRoutes);
router.use('/customer-portal',customerPortalRoutes )
module.exports = router;