const express = require("express");
const { sendOtp, signup, login } = require("../controllers/user/authController");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

// Public routes
router.post("/send-otp", sendOtp);
router.post("/signup", signup);
router.post("/login", login);

// Protected route example
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Profile fetched successfully",
    user: req.user, // comes from token
  });
});

module.exports = router;
