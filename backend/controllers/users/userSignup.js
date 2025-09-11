const User = require("../../models/userModel");
const otpStore = require("../../config/otpStore");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUpController = async (req, res) => {
  try {
    const { name, email, mobile, password, otp } = req.body;

    // 1. OTP Validation
    if (!otpStore[mobile] || otpStore[mobile].otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }
    if (Date.now() > otpStore[mobile].expires) {
      delete otpStore[mobile];
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // 2. Check if user already exists (email or mobile must be unique)
    const existingUser = await User.findOne({
      where: { mobile }, // you could also check email if required
    });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "Mobile number already registered" });
    }

    // 3. Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create new user
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    // 5. Remove OTP from store after use
    delete otpStore[mobile];

    // 6. Generate JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email, mobile: user.mobile }, // Sequelize uses `id`, not `_id`
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // 7. Send Response
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
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
};

module.exports = signUpController;
