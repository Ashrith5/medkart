import React, { useState } from "react";
import { Table, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const navigate = useNavigate();

  const [customers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "9876543210", joiningDate: "2025-01-10" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9123456780", joiningDate: "2025-02-15" },
  ]);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Mobile", dataIndex: "phone", key: "phone" },
    { title: "Joining Date", dataIndex: "joiningDate", key: "joiningDate" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" onClick={() => navigate(`/admindashboard/customers/edit/${record.id}`)}>
          Edit Info
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Customers</h2>
      <Table dataSource={customers} columns={columns} rowKey="id" />
    </div>
  );
};

export default CustomerList;

