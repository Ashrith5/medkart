import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";

const SellerContactEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState({ businessName: "", email: "", phone: "" });
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch seller data by ID from API
    const fetchedSeller = {
      id,
      businessName: "ABC Traders",
      email: "abc@traders.com",
      phone: "9876543210",
    };
    setSeller(fetchedSeller);
    form.setFieldsValue(fetchedSeller);
  }, [id, form]);

  const onFinish = (values) => {
    console.log("Updated seller contact:", values);
    // Call API to update seller info
    navigate("/admindashboard/sellers");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Seller Contact</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Business Name" name="businessName">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SellerContactEdit;
