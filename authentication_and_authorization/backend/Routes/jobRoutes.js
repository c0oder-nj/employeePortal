const express = require('express');
const jobController = require('../Controllers/jobController');
const router = express.Router();

router.get('attendance', jobController.fetchDailyAttendace);

module.exports = router