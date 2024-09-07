const express = require('express');
const authRoutes = require('./authRoutes');
const empRoutes = require('./empRoutes');
const jobRoutes = require('./jobRoutes');
const adminRoutes = require('./adminRoutes');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/employee', empRoutes);
router.use('/job',jobRoutes);
router.use('/admin', adminRoutes);
module.exports = router;