const Sequelize = require("../../config/sequelize");

const getOrders = async (req, res) => {
  try {
    const sellerId = req.seller.id;

    const orders = await Sequelize.query(
      `SELECT o.id, o.product_id, o.quantity, o.status, o.total_price, 
              p.name AS product_name, p.selling_price
       FROM orders o
       JOIN products p ON o.product_id = p.id
       WHERE p.seller_id = :sellerId`,
      {
        replacements: { sellerId }, // pass as named replacement
        type: Sequelize.QueryTypes.SELECT, // tell Sequelize we want SELECT results
      }
    );

    res.json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = getOrders;
