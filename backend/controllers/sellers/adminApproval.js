const Seller = require("../../models/sellerModel");

const adminApproval = async (req, res) => {
  try {
    const { sellerId, status } = req.body; // "active" or "rejected"

    const seller = await Seller.findByPk(sellerId);
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    seller.status = status;
    await seller.save();

    res.json({ message: `✅ Seller status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = adminApproval;
