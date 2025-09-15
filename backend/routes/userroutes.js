const express = require("express");
const signUpController=require('../controllers/users/userSignup')
const sendOtp  = require("../controllers/users/usercontroller");
const authMiddleware = require("../middleware/authmiddleware");
const signInController = require("../controllers/users/userSignin");
const verifyOtp = require("../controllers/users/verifyOtp");
const loginSendOtp = require("../controllers/users/loginOtp");
const authRole = require('../middleware/authRole')
const upload=require('../middleware/upload')
const router = express.Router();


router.post("/send-otp", sendOtp);
router.post("/signup", signUpController);
router.post("/login-otp",loginSendOtp)
router.post("/signin", signInController);
router.post("/verify-otp",verifyOtp);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Profile fetched successfully",
    user: req.user,
  });
});

module.exports = router;
