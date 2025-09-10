const User = require("../../models/userModel");
const otpStore = require("../../config/otpStore");

// Generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const loginSendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ success: false, message: "Mobile number is required" });
    }

    // Check if user exists
    const user = await User.findOne({ where: { mobile } });
    if (!user) {
      return res.status(404).json({ success: false, message: "Mobile number not found" });
    }


    const otp = generateOtp();
    otpStore[mobile] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // expires in 5 min

    console.log(`Sending OTP ${otp} to ${mobile}`);

    return res.status(200).json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = loginSendOtp;
