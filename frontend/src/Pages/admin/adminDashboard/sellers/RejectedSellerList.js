import React, { useState } from "react";
import { Table, Button, Space, Tag, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { FileTextOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";

const RejectedSellerList = () => {
  const navigate = useNavigate();

  const [sellers, setSellers] = useState([
    {
      id: 2,
      businessName: "XYZ Enterprises",
      area: "Bangalore",
      contact: "9123456780",
      docs: ["shopact.pdf"],
      postedOn: "2025-09-10",
      status: "rejected",
    },
    {
      id: 4,
      businessName: "PQR Traders",
      area: "Mumbai",
      contact: "9988776655",
      docs: ["license.pdf"],
      postedOn: "2025-09-11",
      status: "rejected",
    },
  ]);

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const showDoc = (doc) => {
    setSelectedDoc(doc);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedDoc(null);
  };

  // Approve seller
  const approveSeller = (id) => {
    setSellers((prev) =>
      prev.map((seller) =>
        seller.id === id ? { ...seller, status: "approved" } : seller
      )
    );
  };

  const columns = [
    { title: "Business Name", dataIndex: "businessName", key: "businessName" },
    { title: "Area", dataIndex: "area", key: "area" },
    { title: "Contact", dataIndex: "contact", key: "contact" },
    {
      title: "Docs Uploaded",
      dataIndex: "docs",
      key: "docs",
      render: (docs) =>
        docs.map((doc, idx) => (
          <Tag
            key={idx}
            color="blue"
            style={{ cursor: "pointer" }}
            onClick={() => showDoc(doc)}
          >
            <FileTextOutlined /> {doc}
          </Tag>
        )),
    },
    { title: "Posted On", dataIndex: "postedOn", key: "postedOn" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {/* Edit Seller Contact Info */}
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() =>
              navigate(`/admindashboard/sellers/edit-contact/${record.id}`)
            }
          >
            Edit Business Details
          </Button>

          {/* Approve Seller */}
          <Button
            size="small"
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => approveSeller(record.id)}
          >
            Approve
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Rejected Sellers</h2>
      <Table dataSource={sellers} columns={columns} rowKey="id" />

      {/* Modal for docs */}
      <Modal
        title="Document Preview"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <p>Currently previewing: <b>{selectedDoc}</b></p>
      </Modal>
    </div>
  );
};

export default RejectedSellerList;
