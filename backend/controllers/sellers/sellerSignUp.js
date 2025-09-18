const bcrypt = require("bcryptjs");
const Seller = require("../../models/sellerModel");

const sellerSignup = async (req, res) => {
  try {
    // Destructure frontend camelCase fields
    const {
      name,
      phone,
      email,
      password,
      address,
      storeName,
      storeAddress,
      gstNo,
      registrationNo,
    } = req.body;

    // Check if email already exists
    const existingEmail = await Seller.findOne({ where: { email } });
    if (existingEmail) return res.status(400).json({ message: "Email already registered" });

    // Check if phone already exists
    const existingPhone = await Seller.findOne({ where: { phone } });
    if (existingPhone) return res.status(400).json({ message: "Phone already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle uploaded identity proof file
    const identity_proof = req.file ? req.file.filename : null;

    // Create new seller
    const newSeller = await Seller.create({
      name,
      phone,
      email,
      password: hashedPassword,
      address,
      store_name: storeName,        // map camelCase → snake_case
      store_address: storeAddress,
      gst_no: gstNo,
      registration_no: registrationNo,
      identity_proof,
      status: "pending",            // waiting for admin approval
    });

    res.status(201).json({
      message: "Seller registered successfully. Awaiting admin approval.",
      seller: newSeller,
    });
  } catch (err) {
    console.error("Seller Signup Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = sellerSignup;