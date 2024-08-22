const express = require('express');
const jobController = require('../Controllers/jobController');
const router = express.Router();

router.get('/fetch-attendance', jobController.fetchDailyAttendace);
router.get('/emp-punch-data', jobController.getEmpPunchData);

module.exports = router