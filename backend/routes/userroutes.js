const express = require("express");
const sendOtp = require("../controllers/users/userController");
const signup = require("../controllers/users/userController");
const signin = require("../controllers/users/userController");
const authMiddleware = require("../middleware/authmiddleware");
const signInController = require("../controllers/users/userSignin");
const verifyOtp = require("../controllers/users/verifyOtp");
const loginSendOtp = require("../controllers/users/loginOtp");

console.log("✅ sendOtp:", typeof sendOtp);
console.log("✅ signup:", typeof signup);
console.log("✅ signin:", typeof signin);
console.log("✅ signInController:", typeof signInController);
console.log("✅ verifyOtp:", typeof verifyOtp);
console.log("✅ loginSendOtp:", typeof loginSendOtp);

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/signup", signup);
router.post("/login-otp", loginSendOtp);
router.post("/signin", signInController);
router.post("/verify-otp", verifyOtp);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Profile fetched successfully",
    user: req.user,
  });
});

module.exports = router;
