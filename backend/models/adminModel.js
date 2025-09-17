const bcrypt = require("bcryptjs");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
  timestamps: true,
  paranoid: true // adds deletedAt
   }

);

// Hash password before create/update
Admin.beforeCreate(async (admin) => {
  if (admin.password) {
    admin.password = await bcrypt.hash(admin.password, 10);
  }
});

Admin.beforeUpdate(async (admin) => {
  if (admin.changed("password")) {
    admin.password = await bcrypt.hash(admin.password, 10);
  }
});

Admin.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Admin;
