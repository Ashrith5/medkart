import React, { useState } from "react";
import axios from "axios";
import SummaryApi from "../../../common/index";
import "../../../Styles/SellerSignup.css";
import { useNavigate } from "react-router-dom";

function SellerSignup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    storeName: "",
    storeAddress: "",
    gstNo: "",
    registrationNo: "",
    identityProof: null,
    password: "",
  });

  const [message, setMessage] = useState("");


   const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 500 * 1024) {
      setMessage("❌ File size must be less than 500KB");
      e.target.value = null;
      return;
    }
    setForm({ ...form, identityProof: file });
  };
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(SummaryApi.sellerSignup.url, form);
      setMessage("✅ Account created! ");
      navigate("/seller-signin")

    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Signup failed");
    }
   
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Seller Signup</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          {/* Left Column */}
          <div className="form-column">
            <input name="name" placeholder="Name" onChange={handleChange} required />
            <input name="phone" placeholder="Phone" onChange={handleChange} required />
            <input name="email" placeholder="Email" onChange={handleChange} required />
            <input name="address" placeholder="Address" onChange={handleChange} required />
            <input name="storeName" placeholder="Store Name" onChange={handleChange} required />
          </div>

          {/* Right Column */}
          <div className="form-column">
            <input name="storeAddress" placeholder="Store Address" onChange={handleChange} required />
            <input name="gstNo" placeholder="GST Number" onChange={handleChange} required />
            <input name="registrationNo" placeholder="Registration No" onChange={handleChange} required />
             <div className="file-upload">
  <label htmlFor="identityProof" className="file-label">
    Upload ID Proof
  </label>
  <input
    type="file"
    id="identityProof"
    name="identityProof"
    accept=".jpg,.jpeg,.png,.pdf"
    onChange={handleFileChange}
    required
  />
</div>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>
        </form>

        <button type="submit" className="signup-btn" onClick={handleSubmit}>
          Create Account
        </button>

        {message && <p className="signup-message">{message}</p>}
      </div>
    </div>
  );
}

export default SellerSignup;
