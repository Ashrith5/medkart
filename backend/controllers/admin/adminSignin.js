const Admin = require("../../models/adminModel");
const jwt = require("jsonwebtoken");
const otpStore = require("../../config/otpStore");

// ------------------ OTP Helpers ------------------
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function verifyOtp(mobile, otp, purpose) {
  const record = otpStore[mobile];
  if (!record) return false;
  if (Date.now() > record.expiresAt) return false;
  if (record.purpose !== purpose) return false;
  if (record.otp !== otp) return false;
  return true;
}

function clearOtp(mobile) {
  delete otpStore[mobile];
}

// ------------------ JWT Token ------------------
function generateToken(admin) {
  const payload = { id: admin.id, email: admin.email, role: "admin" };
  return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: "1d" });
}

// ------------------ Login with Password ------------------
async function loginWithPassword(req, res) {
  try {
    const identifier = req.body.identifier || req.body.email || req.body.mobile;
    const password = req.body.password;

    if (!identifier || !password) {
      return res.status(400).json({ error: "identifier and password required" });
    }

    const admin =
      (await Admin.findOne({ where: { email: identifier } })) ||
      (await Admin.findOne({ where: { mobile: identifier } }));

    if (!admin) return res.status(400).json({ error: "Invalid credentials" });

    const valid = await admin.validatePassword(password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(admin);
    return res.json({
      success: true,
      token,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    });
  } catch (err) {
    console.error("Error in loginWithPassword:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

// ------------------ Request OTP for Login ------------------
async function requestLoginOtp(req, res) {
  try {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ error: "mobile required" });

    const admin = await Admin.findOne({ where: { mobile } });
    if (!admin) return res.status(400).json({ error: "No admin with this mobile" });

    const otp = generateOtp();
    otpStore[mobile] = { otp, expiresAt: Date.now() + 5 * 60 * 1000, purpose: "login" };

    console.log(`Generated OTP for ${mobile}: ${otp}`);
    return res.json({ success: true, message: "OTP sent to mobile" });
  } catch (err) {
    console.error("Error in requestLoginOtp:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

// ------------------ Verify OTP for Login ------------------
async function verifyLoginOtp(req, res) {
  try {
    const { mobile, otp } = req.body;
    if (!mobile || !otp) return res.status(400).json({ error: "mobile and otp required" });

    const valid = verifyOtp(mobile, otp, "login");
    if (!valid) return res.status(400).json({ error: "Invalid or expired OTP" });

    const admin = await Admin.findOne({ where: { mobile } });
    clearOtp(mobile);

    const token = generateToken(admin);
    return res.json({
      success: true,
      token,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    });
  } catch (err) {
    console.error("Error in verifyLoginOtp:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { loginWithPassword, requestLoginOtp, verifyLoginOtp };

