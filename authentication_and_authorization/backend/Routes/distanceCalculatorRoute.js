const express = require('express');
const distanceController = require('../Controllers/distanceRouteController');
const { route } = require('./authRoutes');
const router = express.Router();

router.get('/find_optimal_path',distanceController.findOptimalComplaints);

module.exports = router;