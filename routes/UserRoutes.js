const express = require('express');
const { UserSignup } = require('../Controllers/UserController/SignupController');
const { route } = require('./ProductRoutes');
const { Userlogin, otpLimiter} = require('../Controllers/UserController/LoginController');
const Otpvalidation = require('../Controllers/UserController/Otpvalidation');

const router = express.Router();

router.post("/signup", UserSignup);
router.post("/login", otpLimiter, Userlogin);
router.post('/otpvalidation', Otpvalidation);

module.exports = router;