const sequelize = require("../../config/sequelize");

const getProfile = async (req, res) => {
  try {
    const sellerId = req.seller.id; // sellerAuth middleware sets req.seller

    const [rows] = await sequelize.query(
      "SELECT id, name, email, phone, store_name, address, store_address, gst_no, registration_no FROM sellers WHERE id = ?",
      {
        replacements: [sellerId],
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.json({ seller: rows });
  } catch (err) {
    console.error("Error fetching seller profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getProfile;
