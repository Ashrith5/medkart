const express = require("express");
const router = express.Router();
const signup = require("../controllers/admin/adminSignUp");
const signin = require("../controllers/admin/adminSignin");

// Signup
router.post("/signup/request-otp", signup.requestSignupOtp);
router.post("/signup/verify-otp", signup.verifySignupOtp);

// Signin
router.post("/login/password", signin.loginWithPassword);
router.post("/login/request-otp", signin.requestLoginOtp);
router.post("/login/verify-otp", signin.verifyLoginOtp);

module.exports = router;


