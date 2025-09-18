const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");   
const Seller = require('../../models/sellerModel')
const sellerSignIn = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ message: "Please provide email/phone and password" });
    }

    // Search by email OR phone
    const seller = await Seller.findOne({
      where: {
        [Op.or]: [{ email: login }, { phone: login }],
      },
    });
    console.log("👉 Login input:", login);
    console.log("👉 Seller from DB:", seller ? seller.toJSON() : null);


    // If no seller exists
    if (!seller) {
      return res.status(401).json({ message: "❌ Invalid email/phone or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, seller.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "❌ Invalid email/phone or password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: seller.id, role: "seller" },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({
      message: "✅ Login successful",
      token,
      seller: {
        id: seller.id,
        name: seller.name,
        email: seller.email,
        phone: seller.phone,
        storeName: seller.store_name,
      },
    });
  } catch (err) {
    console.error("Seller SignIn Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
module.exports=sellerSignIn
