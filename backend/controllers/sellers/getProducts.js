const Product = require("../../models/productModel");
const Seller = require("../../models/sellerModel");

const getProducts = async (req, res) => {
  try {
    const sellerId = req.seller?.id;
    console.log("Seller ID from token:", sellerId);

    const products = await Product.findAll({
      where: { seller_id: sellerId },
      include: [
        {
          model: Seller,
          attributes: ["store_name", "store_address"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      products: products || [],
    });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = getProducts;
