import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../../../../common";

const CustomerList = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const res = await fetch(SummaryApi.getCustomers.url, {
          method: SummaryApi.getCustomers.method,
        });

        if (!res.ok) throw new Error("Failed to fetch customers");

        const data = await res.json();
        setCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
        message.error("Unable to load customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Mobile", dataIndex: "phone", key: "phone" },
    { title: "Joining Date", dataIndex: "joiningDate", key: "joiningDate" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => navigate(`/admindashboard/customers/edit/${record.id}`)}
        >
          Edit Info
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Customers</h2>
      <Table
        dataSource={customers}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default CustomerList;



