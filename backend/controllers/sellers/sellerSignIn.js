const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Seller = require("../../models/sellerModel");

// Seller Login
const sellerSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ where: { email } });

    if (!seller) return res.status(401).json({ message: "❌ Seller not found" });

    const isPasswordValid = await bcrypt.compare(password, seller.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "❌ Invalid password" });

    if (seller.status !== "active") {
      return res.status(403).json({
        message: "⚠️ Account not active. Wait for admin approval."
      });
    }

    const token = jwt.sign(
      { id: seller.id, role: "seller" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "✅ Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = sellerSignin;
