// backend/controllers/auth/loginOtp.js
const { User } = require("../../models"); // Sequelize User model
const sendOTP = require("./usercontroller");

const loginSendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;

    
    const user = await User.findOne({ where: { mobile } });
    if (!user) {
      return res.status(404).json({ success: false, message: "Mobile number not registered" });
    }


    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send OTP via SMS
    await sendOTP(mobile, otp);

    // Save OTP & expiry in DB
    await user.update({
      otp,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000) // 5 min from now
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = loginSendOtp;
