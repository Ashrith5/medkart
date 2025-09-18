const Product  = require("../../models/productModel"); // Sequelize Product model
const Seller = require('../../models/sellerModel')

const uploadProduct = async (req, res) => {
      try {
    console.log("Form Data Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { name, category, actual_price, selling_price, description, stock, deliveryOption } = req.body;

    // Build image path if file exists
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/products/${req.file.filename}`;
    }

    const product = await Product.create({
      seller_id: req.user.id,  
      name,
      category,
      actual_price,
      selling_price,
      description,
      stock,
      deliveryOption,
      images: imagePath,  
    });

    res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      product,
    });
  } catch (err) {
    console.error("Upload product error:", err);
    res.status(500).json({ success: false, message: "Failed to upload product" });
  }
  }

module.exports = uploadProduct;
