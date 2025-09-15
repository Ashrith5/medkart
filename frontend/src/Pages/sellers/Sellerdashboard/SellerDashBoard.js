import React, { useEffect, useState } from "react";
import { Layout, Spin, message } from "antd";
import axios from "axios";
import SummaryApi from "../../../common/index";
import ProfileStrip from "./ProfileStrip";
import StatTiles from "./StatTiles";
import Workspace from "./Workspace";
import "../../../Styles/Sellerdashboard.css";

const { Content } = Layout;

function SellerDashboard() {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile"); // profile, uploadProduct, orders

  const token = localStorage.getItem("sellerToken");

  useEffect(() => {
    if (!token) {
      window.location.href = "/seller-signin";
      return;
    }

    const fetchSeller = async () => {
      try {
        const res = await axios.get(SummaryApi.sellerDashboard.url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSeller(res.data.seller);
      } catch (err) {
        message.error(err.response?.data?.message || "Failed to fetch seller data");
        localStorage.removeItem("sellerToken");
        window.location.href = "/seller-signin";
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [token]);

  if (loading) return <Spin tip="Loading Dashboard..." style={{ marginTop: 50 }} />;

  if (!seller) return <p>Failed to load seller data.</p>;

  return (
    <Layout className="seller-dashboard">
      {/* Top profile strip */}
      <ProfileStrip seller={seller} setActiveTab={setActiveTab} />

      <Content className="dashboard-content">
        
        <StatTiles seller={seller} setActiveTab={setActiveTab} />

      
        <Workspace activeTab={activeTab} seller={seller} token={token} />
      </Content>
    </Layout>
  );
}

export default SellerDashboard;
