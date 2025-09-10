const express = require("express");
<<<<<<< HEAD
const { sendOtp, signup, login } = require("../controllers/user/userController");
=======
const signUpController=require('../controllers/users/userSignup')
const sendOtp  = require("../controllers/users/usercontroller");
>>>>>>> 0de3fab728edf4f52d13c27e4496dfa6cd6a9d61
const authMiddleware = require("../middleware/authmiddleware");
const signInController = require("../controllers/users/userSignin");
const verifyOtp = require("../controllers/users/verifyOtp");
const loginSendOtp = require("../controllers/users/loginOtp");
const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/signup", signUpController);
router.post("/login-otp",loginSendOtp)
router.post("/signin", signInController);
router.post("/verify-otp",verifyOtp)

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Profile fetched successfully",
    user: req.user,
  });
});

module.exports = router;
