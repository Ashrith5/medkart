const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Seller = require('./sellerModel')

const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  seller_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  category: { type: DataTypes.STRING },
  brand: { type: DataTypes.STRING },
  actual_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  selling_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  sku: { type: DataTypes.STRING, unique: true },
  images: { type: DataTypes.JSON },
  status: { 
    type: DataTypes.ENUM("active", "inactive", "out_of_stock"), 
    defaultValue: "active" 
  },
  deliveryOption: { 
    type: DataTypes.ENUM("store_pickup", "home_delivery", "both"), 
    defaultValue: "store_pickup" 
  }
}, {
  timestamps: true
});
Product.belongsTo(Seller, { foreignKey: "seller_id" });
Seller.hasMany(Product, { foreignKey: "seller_id" });


module.exports = Product;
