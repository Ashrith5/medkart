const User = require("../../models/userModel");
const otpStore = require("../../config/otpStore");

// Utility to generate OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) {
      return res.json({ success: false, message: "Mobile number is required" });
    }

    const otp = generateOtp();
    otpStore[mobile] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000, // 5 min expiry
    };

    console.log(`📩 OTP for ${mobile}: ${otp}`); // TODO: integrate SMS service like Twilio or MSG91

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = sendOtp;
