import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  ShopOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AdminDashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Clear token/session
    navigate("/admin-signin"); // Redirect to login
  };

  const menuItems = [
    {
      key: "/admindashboard/categories",
      icon: <AppstoreOutlined />,
      label: "Manage Categories",
    },
    {
      key: "/admindashboard/customers",
      icon: <UserOutlined />,
      label: "Manage Customers",
    },
    {
      key: "/admindashboard/sellers",
      icon: <ShopOutlined />,
      label: "Manage Listings",
    },
    {
      key: "/admindashboard/pending-sellers",
      icon: <ClockCircleOutlined />,
      label: "Pending Sellers",
    },
    {
      key: "/admindashboard/rejected-sellers",
      icon: <CloseCircleOutlined />,
      label: "Rejected Sellers",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        style={{
          background: "#1129CE",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="logo"
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            padding: "16px",
            textAlign: "center",
            background: "#0d1f9a",
          }}
        >
          MedKart Admin
        </div>

        {/* Menu */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={({ key }) => navigate(key)}
            items={menuItems}
            style={{
              background: "#1129CE",
              color: "white",
              fontWeight: "500",
            }}
            theme="dark"
          />
        </div>

        {/* Logout button at bottom */}
        <div style={{ padding: "16px", textAlign: "center" }}>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ width: collapsed ? "40px" : "100%" }}
          >
            {!collapsed && "Logout"}
          </Button>
        </div>
      </Sider>

      {/* Main Content */}
      <Layout>
        <Header
          style={{
            background: "#FFFFFF",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #D3D6D9",
          }}
        >
          <h2 style={{ margin: 0, color: "#1129CE" }}>Admin Dashboard</h2>
          <span style={{ fontWeight: "bold", color: "#EE152D" }}>
            Welcome, Admin
          </span>
        </Header>

        <Content
          style={{
            margin: "16px",
            padding: "16px",
            background: "#FFFFFF",
            minHeight: 280,
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboardLayout;






