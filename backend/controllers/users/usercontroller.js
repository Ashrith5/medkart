const User = require("../../models/userModel");
const otpStore = require("../../config/otpStore");

// Generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();



const sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    console.log("req.body:", req.body);

    if (!mobile) {
      return res.status(400).json({ success: false, message: "Mobile number is required" });
    }

    // ✅ Optional: Check if mobile already exists in DB
    const existingUser = await User.findOne({ where: { mobile } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Mobile number already registered" });
    }

    // ✅ Generate OTP always for signup
    const otp = generateOtp();
    otpStore[mobile] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // expires in 5 minutes

    console.log(`📩 Sending OTP ${otp} to ${mobile}`);

    return res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = sendOtp; // default export
