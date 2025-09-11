const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); 

const Seller = sequelize.define("Seller", {
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: false },
  store_name: { type: DataTypes.STRING, allowNull: false },
  store_address: { type: DataTypes.TEXT, allowNull: false },
  gst_no: { type: DataTypes.STRING, allowNull: false },
  registration_no: { type: DataTypes.STRING, allowNull: false },
  identity_proof: { type: DataTypes.STRING }, // file path or cloudinary url
  status: {
    type: DataTypes.ENUM("pending", "active", "rejected"),
    defaultValue: "pending"
  }
});

module.exports = Seller;
