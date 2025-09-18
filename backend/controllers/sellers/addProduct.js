const Product = require("../../models/productModel");
const Seller = require("../../models/sellerModel");

const addProduct = async (req, res) => {
  try {
    const sellerId = req.seller.id;
    const { name, description, category, brand, actual_price, selling_price, stock, sku, deliveryOption } = req.body;

    if (!name || !actual_price || !selling_price || !stock) {
      return res.status(400).json({ success: false, message: "Name, price, and stock are required" });
    }

    const seller = await Seller.findByPk(sellerId);
    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    // Save image path as an array (JSON column in DB)
    const imagePath = req.file ? `/uploads/products/${req.file.filename}` : null;
    const images = imagePath ? [imagePath] : [];

    const product = await Product.create({
      seller_id: sellerId,
      name,
      description,
      category,
      brand,
      actual_price: parseFloat(actual_price),
      selling_price: parseFloat(selling_price),
      stock: parseInt(stock, 10),
      sku,
      images:imagePath ? [imagePath] : [],
      deliveryOption
    });

    res.status(201).json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = addProduct;
