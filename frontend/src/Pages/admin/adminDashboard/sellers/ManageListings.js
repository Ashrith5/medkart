import React, { useState, useEffect } from "react";
import { Table, Button, Space, Tag, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import {
  FileTextOutlined,
  EditOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ManageListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Dummy fetch function
  useEffect(() => {
    const fetchListings = async () => {
      const data = [
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
          id: 2,
          businessName: "XYZ Enterprises",
          area: "Bangalore",
          contact: "9123456780",
          docs: ["shopact.pdf"],
          postedOn: "2025-09-10",
          status: "approved",
        },
      ];
      setListings(data);
    };

    fetchListings();
  }, []);

  const toggleStatus = (id) => {
    setListings((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "approved" ? "rejected" : "approved" }
          : item
      )
    );
  };

  const showDoc = (doc) => {
    setSelectedDoc(doc);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedDoc(null);
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
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() =>
              navigate(`/admindashboard/sellers/edit-contact/${record.id}`)
            }
          >
            Edit Contact
          </Button>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() =>
              navigate(`/sellerdashboard/listings/edit/${record.id}`)
            }
          >
            Edit Listing
          </Button>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() =>
              navigate(`/sellerdashboard/listings/view/${record.id}`)
            }
          >
            View
          </Button>
          {record.status === "approved" ? (
            <Button
              size="small"
              danger
              icon={<CloseOutlined />}
              onClick={() => toggleStatus(record.id)}
            >
              Reject
            </Button>
          ) : (
            <Button
              size="small"
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => toggleStatus(record.id)}
            >
              Approve
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Listings</h2>
      <Table dataSource={listings} columns={columns} rowKey="id" />

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

export default ManageListings;


