const sequelize = require("../../config/sequelize");
const { QueryTypes } = require("sequelize");
const Seller = require('../../models/sellerModel')
const updateProfile = async (req, res) => {
  try {
    const sellerId = req.seller.id;
    const { name, phone, storeName, storeAddress, address } = req.body;

    const [updated] = await Seller.update(
      { 
        name, 
        phone, 
        store_name: storeName, 
        store_address: storeAddress, 
        address 
      },
      { where: { id: sellerId } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.json({ message: "Profile updated successfully ✅" });
  } catch (err) {
    console.error("Error updating seller profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = updateProfile;