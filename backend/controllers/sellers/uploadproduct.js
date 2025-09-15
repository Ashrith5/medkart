const Product  = require("../../models/productModel"); // Sequelize Product model
const Seller = require('../../models/sellerModel')

const uploadProduct = async (req, res) => {
  try {
    const sellerId = req.seller.id; // From sellerAuth middleware

    const { name, category, actual_price, selling_price, description, stock,deliveryOption } = req.body;
    const image = req.file ? req.file.filename : null;

    // Create product
    const product = await Product.create({
      seller_id: sellerId,
      name,
      category,
      actual_price,
      selling_price,
      description,
      stock: stock || 0,   
      images: image ? [image] : [],
      deliveryOption:deliveryOption || "store_pickup"
    });

    return res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      product,
    });
  } catch (err) {
    console.error("Upload product error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = uploadProduct;
