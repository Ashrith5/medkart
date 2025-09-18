import React, { useState, useEffect } from "react";
import { Table, Button, Space, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  SwapOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      message.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/admin/categories/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        message.success("Category deleted successfully");
        fetchCategories(); // refresh list
      } else {
        message.error("Failed to delete category");
      }
    } catch (err) {
      message.error("Error deleting category");
    }
  };

  // Table columns
  const columns = [
    { title: "Sort Order", dataIndex: "sortOrder", key: "sortOrder" },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (icon) => (
        // Check if the icon value is a file path
        icon && icon.startsWith('/uploads') ? (
          <img
            src={`http://localhost:8080${icon}`} // Construct the full URL
            alt="category icon"
            style={{ width: "40px", height: "40px", objectFit: "contain" }}
          />
        ) : (
          // Otherwise, render as text for emojis or other data
          <span style={{ fontSize: "20px" }}>{icon}</span>
        )
      ),
    },
    { title: "Category Name", dataIndex: "name", key: "name" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{ background: "#1129CE" }}
            onClick={() =>
              navigate(`/admindashboard/categories/edit/${record.id}`)
            }
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete this category?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Top buttons */}
      <div style={{ marginBottom: 16, display: "flex", gap: "10px" }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ background: "#1129CE" }}
          onClick={() => navigate("/admindashboard/categories/add")}
        >
          Add New
        </Button>
        <Button
          type="default"
          icon={<SwapOutlined />}
          onClick={() => navigate("/admindashboard/categories/reorder")}
        >
          Reorder
        </Button>
      </div>

      {/* Categories table */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={categories}
        bordered
        pagination={false}
      />
    </div>
  );
};

export default CategoryList;
