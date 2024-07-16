const express = require('express');
const authRoutes = require('./authRoutes');
const empRoutes = require('./empRoutes');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/employee', empRoutes);

module.exports = router;