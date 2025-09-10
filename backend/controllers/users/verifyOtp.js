const User = require("../../models/userModel");
const otpStore = require("../../config/otpStore");
const sendOtp = require('../../controllers/users/verifyOtp')

const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const user = await User.findOne({ where: { mobile } });
    if (!user) {
      return res.status(404).json({ success: false, message: "Mobile number not found" });
    }

    if (!otpStore[mobile] || otpStore[mobile].otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    if (Date.now() > otpStore[mobile].expires) {
      delete otpStore[mobile];
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    delete otpStore[mobile];
    return res.json({ success: true, message: "OTP verified successfully", user });
  } catch (err) {
    console.error("verifyOtp error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = verifyOtp;
