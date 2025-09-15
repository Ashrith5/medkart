import React, { useState, useEffect } from "react";
import SellerLogin from "./SellerLogin";
import SellerSignup from "./SellerSignUp";
import PendingApproval from "./PendingApproval";
import SellerDashboard from "../Sellerdashboard/SellerDashBoard";

function SellerAdmin() {
  const [seller, setSeller] = useState(null); // { token, status }

  // On mount, check localStorage for token & status
  useEffect(() => {
    const token = localStorage.getItem("sellerToken");
    const status = localStorage.getItem("sellerStatus");
    if (token && status) {
      setSeller({ token, status });
    }
  }, []);

  if (!seller) {
    return (
      <div>
        <h1>Seller Admin Portal</h1>
        <SellerLogin setSeller={setSeller} />
        <hr />
        <SellerSignup />
      </div>
    );
  }

  if (seller.status === "pending") return <PendingApproval />;
  if (seller.status === "active") return <SellerDashboard />;
  if (seller.status === "rejected") return <p>Your account is rejected</p>;

  return null;
}

export default SellerAdmin;
