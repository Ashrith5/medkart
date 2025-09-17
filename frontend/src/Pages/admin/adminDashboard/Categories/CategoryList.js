import React, { useState } from "react";
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

  // Dummy data for now
  const [categories, setCategories] = useState([
    {
      id: 1,
      sortOrder: 1,
      icon: "💊",
      name: "Medicines",
    },
    {
      id: 2,
      sortOrder: 2,
      icon: "🍼",
      name: "Baby Care",
    },
    {
      id: 3,
      sortOrder: 3,
      icon: "🍊",
      name: "Vitamins",
    },
  ]);

  // Delete handler
  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    message.success("Category deleted successfully");
  };

  // Table columns
  const columns = [
    {
      title: "Sort Order",
      dataIndex: "sortOrder",
      key: "sortOrder",
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (icon) => <span style={{ fontSize: "20px" }}>{icon}</span>,
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{ background: "#1129CE" }}
            onClick={() => navigate(`/admindashboard/categories/edit/${record.id}`)}
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
