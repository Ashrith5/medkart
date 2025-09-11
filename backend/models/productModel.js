// models/Product.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Seller = require("./Seller");

const Product = sequelize.define("Product", {
  name: { type: DataTypes.STRING, allowNull: false },
  actual_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  discount_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false }
});

// Relationship
Seller.hasMany(Product, { foreignKey: "sellerId" });
Product.belongsTo(Seller, { foreignKey: "sellerId" });

module.exports = Product;
