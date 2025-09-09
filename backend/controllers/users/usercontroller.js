const User = require("../../models/userModel");
const otpStore = require("../utils/otpStore");

// Utility to generate OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// 📌 Send OTP
exports.sendOtp = async (req, res) => {
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

// 📌 Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, mobile, password, otp } = req.body;

    // OTP validation
    if (!otpStore[mobile] || otpStore[mobile].otp !== otp) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }
    if (Date.now() > otpStore[mobile].expires) {
      delete otpStore[mobile];
      return res.json({ success: false, message: "OTP expired" });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password, // will be hashed automatically
    });

    // clear otp
    delete otpStore[mobile];

    res.json({ success: true, message: "Signup successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Validate password
    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secretkey", // store secret in .env
      { expiresIn: "1h" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};