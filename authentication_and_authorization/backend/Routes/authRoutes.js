const express = require('express');
const authControllers = require('../Controllers/authControllers');
const router = express.Router();

router.post('/login', authControllers.login);
router.post('/setPassword', authControllers.setPassword);
router.post('/home', authControllers.home);
router.post('/forget-password', authControllers.forgetPassword);
router.post('/verify-otp', authControllers.verifyOtp);
router.get('/encode_me', authControllers.encodePassword);
router.get('/employee_profile', authControllers.employeeProfile);

module.exports = router;