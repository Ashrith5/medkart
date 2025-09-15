import React, { useState } from "react";
import axios from "axios";
import '../../../Styles/SellerLogin.css'
import SummaryApi from "../../../common/index";

function SellerLogin({ setSellerToken }) {
  const [form, setForm] = useState({ login: "", password: "" }); // login = email or mobile
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(SummaryApi.sellerLogin.url, form);

      // Store token in localStorage
      localStorage.setItem("sellerToken", res.data.token);
      localStorage.setItem("sellerInfo", JSON.stringify(res.data.seller));

      // Optionally update parent state
      if (setSellerToken) setSellerToken(res.data.token);

      setMessage("✅ Login successful");

      // Redirect to dashboard
      window.location.href = "/seller/dashboard";
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="seller-login">
      <h2>Seller Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="login"
          placeholder="Email or Mobile"
          value={form.login}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p style={{ color: "red" }}>{message}</p>
    </div>
  );
}

export default SellerLogin;
