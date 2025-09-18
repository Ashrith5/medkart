const User = require("../../models/userModel");

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {const bcrypt = require("bcryptjs");
  const { DataTypes } = require("sequelize");
  const sequelize = require("../../config/sequelize");
  
  const User = sequelize.define(
    "User",
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
      },
      role: {
        type: DataTypes.ENUM("Customer", "admin", "seller"),
        defaultValue: "Customer",
      },
    },
    {
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
        {
          unique: true,
          fields: ["mobile"],
        },
      ],
    }
  );
  
  // Hash password before create/update
  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });
  
  User.beforeUpdate(async (user) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });
  
  // Password validation
  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  module.exports = User;
  
    const customers = await User.findAll({
      order: [["id", "ASC"]],
      attributes: ["id", "name", "email", "mobile", "createdAt"],
    });

    console.log("Number of customers fetched:", customers.length);

    const formatted = customers.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.mobile,
      joiningDate: c.createdAt?.toISOString().split("T")[0] || "",
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({
      message: "Error fetching customers",
      error: error.message || error,
    });
  }
};


// Get single customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await User.findByPk(req.params.id, {
      attributes: ["id", "name", "email", "mobile"],
    });

    if (!customer) return res.status(404).json({ message: "Customer not found" });

    res.status(200).json({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.mobile,
    });
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Error fetching customer", error });
  }
};

// Update customer details (email, phone)
exports.updateCustomer = async (req, res) => {
  try {
    const { email, phone } = req.body;
    const customer = await User.findByPk(req.params.id);

    if (!customer) return res.status(404).json({ message: "Customer not found" });

    customer.email = email;
    customer.mobile = phone;
    await customer.save();

    res.status(200).json({ message: "Customer updated successfully", customer });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ message: "Error updating customer", error });
  }
};
