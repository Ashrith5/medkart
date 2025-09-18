const db = require("../../config/db");

const getStats = async (req, res) => {
  try {
    const sellerId = req.seller.id;

    // Count products
    const [[{ totalProducts }]] = await db.query(
      "SELECT COUNT(*) AS totalProducts FROM products WHERE seller_id = ?",
      [sellerId]
    );

    // Count orders
    const [[{ totalOrders }]] = await db.query(
      `SELECT COUNT(*) AS totalOrders 
       FROM orders o
       JOIN products p ON o.product_id = p.id
       WHERE p.seller_id = ?`,
      [sellerId]
    );

    // Revenue
    const [[{ totalRevenue }]] = await db.query(
      `SELECT IFNULL(SUM(o.total_price),0) AS totalRevenue 
       FROM orders o
       JOIN products p ON o.product_id = p.id
       WHERE p.seller_id = ? AND o.status = 'completed'`,
      [sellerId]
    );

    res.json({
      totalProducts,
      totalOrders,
      totalRevenue,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getStats;
