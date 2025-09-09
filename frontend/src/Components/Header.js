import React from "react";
import { Layout, Input, Button, Badge } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, ShoppingCartOutlined, SearchOutlined } from "@ant-design/icons";
import "../Styles/Header.css";
import SignUp from "../Pages/SignUp";

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader className="app-header">
    
      <div className="logo">MedKart</div>

      <div className="search-bar">
        <Input
          placeholder="Search products..."
          prefix={<SearchOutlined />}
          allowClear
        />
      </div>

      
      <div className="header-right">
        <UserOutlined className="icon" />
        <Badge count={2} size="small">
          <ShoppingCartOutlined className="icon" />
        </Badge>
        <Link to={'/SignUp'}>
        <Button type="primary" shape="round">Register/Login</Button>
        </Link>
       
      </div>
    </AntHeader>
  );
};

export default Header;
