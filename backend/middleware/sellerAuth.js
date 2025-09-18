const jwt = require("jsonwebtoken");
const Seller = require("../models/sellerModel");

const sellerAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    // Verify JWT
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (!decoded || decoded.role !== "seller") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Fetch seller
    const seller = await Seller.findByPk(decoded.id);
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    req.seller = seller; // ✅ attach seller here
    next();
  } catch (err) {
    console.error("Seller Auth Error:", err);
    res.status(401).json({ message: "Invalid token", error: err.message });
  }
};

module.exports = sellerAuth;
