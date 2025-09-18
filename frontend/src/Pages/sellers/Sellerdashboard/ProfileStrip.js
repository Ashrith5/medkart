import React from "react";
import '../../../Styles/ProfileStrip.css'
import { Avatar, Button } from "antd";
import { UserOutlined, LogoutOutlined, PlusOutlined, EditOutlined, ShoppingOutlined } from "@ant-design/icons";

function ProfileStrip({ seller, setActiveTab }) {
  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    window.location.href = "/seller-signin";
  };

  return (
    <div className="profile-strip">
      <Avatar size={64}
        src={seller?.profilePicture || null}
        icon={<UserOutlined />}
        style={{ marginRight: "12px" }}
      />
      <div className="profile-info">
        <h3>{seller?.name || "Seller"}</h3>
        <p>{seller?.email}</p>
      </div>


      <div className="profile-actions">
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => setActiveTab("profile")}
        >
          Edit My Profile
        </Button>

        <Button
          type="link"
          icon={<PlusOutlined />}
          onClick={() => setActiveTab("uploadProduct")}
        >
          Upload Product
        </Button>

        <Button
          type="link"
          icon={<ShoppingOutlined />}
          onClick={() => setActiveTab("orders")}
        >
          Order Management
        </Button>

        <Button
          danger
          type="link"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default ProfileStrip;
