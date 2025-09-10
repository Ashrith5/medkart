const User = require("../../models/userModel");
const otpStore = require("../../config/otpStore");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUpController = async (req, res) => {
  try {
    const { name, email, mobile, password, otp } = req.body;
    console.log("👉 SIGNUP BODY:", req.body);
    console.log("👉 otpStore:", otpStore);

    // 1. OTP Validation
    if (!otpStore[mobile]) {
      console.log("❌ No OTP found for this mobile");
      return res.status(400).json({ success: false, message: "OTP not found" });
    }

    if (otpStore[mobile].otp !== otp) {
      console.log("❌ OTP mismatch", otpStore[mobile].otp, otp);
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > otpStore[mobile].expiresAt) {
      console.log("❌ OTP expired");
      delete otpStore[mobile];
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    console.log("✅ OTP validated");

    // 2. Check if user already exists
    const existingUser = await User.findOne({ where: { mobile } });
    if (existingUser) {
      console.log("❌ Mobile already registered");
      return res.status(400).json({ success: false, message: "Mobile number already registered" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    delete otpStore[mobile];

    // 5. Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, mobile: user.mobile },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "7d" }
    );

    console.log("✅ Signup successful:", user.id);

    res.json({
      success: true,
      message: "Signup successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
      token,
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
};

module.exports = signUpController;
