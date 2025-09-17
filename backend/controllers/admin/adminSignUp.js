const Admin = require("../../models/adminModel");
const jwt = require("jsonwebtoken");
const otpStore = require("../../config/otpStore");

// ---------------- OTP Helpers ----------------
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function storeOtp(mobile, purpose, payload = {}) {
  const otp = generateOtp();
  otpStore[mobile] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    purpose,
    payload,
  };
  console.log(`Generated OTP for ${mobile}: ${otp}`);
}

function verifyOtp(mobile, otp, purpose) {
  const record = otpStore[mobile];
  if (!record) return false;
  if (record.purpose !== purpose) return false;
  if (Date.now() > record.expiresAt) return false;
  if (record.otp !== otp) return false;
  return true;
}

function clearOtp(mobile) {
  delete otpStore[mobile];
}

// ---------------- JWT ----------------
function generateToken(admin) {
  const payload = { id: admin.id, email: admin.email, role: "admin" };
  return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: "1d" });
}

// ---------------- Signup APIs ----------------
async function requestSignupOtp(req, res) {
  try {
    const { name, email, mobile } = req.body;
    if (!name || !email || !mobile) {
      return res.status(400).json({ error: "name, email, mobile required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existing = await Admin.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: "Admin already exists" });

    storeOtp(mobile, "signup", { name, email });
    return res.json({ success: true, message: "OTP sent to mobile" });
  } catch (err) {
    console.error("Error in requestSignupOtp:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function verifySignupOtp(req, res) {
  try {
    const { mobile, otp, password } = req.body;
    if (!mobile || !otp || !password) {
      return res.status(400).json({ error: "mobile, otp, password required" });
    }

    const valid = verifyOtp(mobile, otp, "signup");
    if (!valid) return res.status(400).json({ error: "Invalid or expired OTP" });

    const { name, email } = otpStore[mobile].payload;
    const admin = await Admin.create({ name, email, mobile, password });

    clearOtp(mobile);

    const token = generateToken(admin);
    return res.json({ success: true, token, admin: { id: admin.id, email, name } });
  } catch (err) {
    console.error("Error in verifySignupOtp:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { requestSignupOtp, verifySignupOtp };


