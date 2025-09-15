const db = require("../../config/sequelize");

const updateOrderStatus = async (req, res) => {
  try {
    const sellerId = req.seller.id;
    const { orderId, status } = req.body;

    // check if order belongs to seller
    const [rows] = await db.query(
      `SELECT o.id FROM orders o
       JOIN products p ON o.product_id = p.id
       WHERE o.id = ? AND p.seller_id = ?`,
      [orderId, sellerId]
    );

    if (rows.length === 0) {
      return res.status(403).json({ message: "Not authorized to update this order" });
    }

    await db.query("UPDATE orders SET status = ? WHERE id = ?", [status, orderId]);

    res.json({ message: "Order status updated successfully" });
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = updateOrderStatus;
