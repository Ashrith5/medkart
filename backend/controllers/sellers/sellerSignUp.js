const bcrypt = require("bcryptjs");
const Seller = require("../../models/sellerModel");

const sellerSignup = async (req, res) => {
  try {
    const { name, phone, email, password, address, store_name, store_address, gst_no, registration_no, identity_proof } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = await Seller.create({
      name,
      phone,
      email,
      password: hashedPassword,
      address,
      store_name,
      store_address,
      gst_no,
      registration_no,
      identity_proof,
      status: "pending"
    });

    res.status(201).json({ message: "Seller registered successfully. Awaiting admin approval.", seller: newSeller });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = sellerSignup