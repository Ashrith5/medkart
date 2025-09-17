import React, { useState } from "react";
import { Table, Button, Space, Tag, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import {
  FileTextOutlined,
  EyeOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const PendingSellerList = () => {
  const navigate = useNavigate();

  const [sellers, setSellers] = useState([
    {
      id: 1,
      businessName: "ABC Traders",
      area: "Hyderabad",
      contact: "9876543210",
      docs: ["license.pdf", "gst.pdf"],
      postedOn: "2025-09-12",
      status: "pending",
    },
    {
      id: 3,
      businessName: "LMN Traders",
      area: "Chennai",
      contact: "9012345678",
      docs: ["shopact.pdf"],
      postedOn: "2025-09-14",
      status: "pending",
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
          {/* View in Seller Dashboard */}
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() =>
              navigate(`/sellerdashboard/listings/view/${record.id}`)
            }
          >
            View
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
      <h2 className="text-xl font-bold mb-4">Pending Seller Activations</h2>
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

export default PendingSellerList;
