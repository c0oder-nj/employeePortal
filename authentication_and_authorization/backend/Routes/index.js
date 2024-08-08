const express = require('express');
const authRoutes = require('./authRoutes');
const empRoutes = require('./empRoutes');
const jobRoutes = require('./jobRoutes');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/employee', empRoutes);
router.use('/job',jobRoutes);
module.exports = router;