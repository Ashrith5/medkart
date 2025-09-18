import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin, Card } from "antd";
import axios from "axios";
import SummaryApi from "../../../common";

function SellerProfile({ token }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  // Fetch seller profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get(SummaryApi.sellerProfile.url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const seller = res.data.seller;
      form.setFieldsValue({
        name: seller.name,
        phone: seller.phone,
        address: seller.address,
        storeName: seller.store_name,
        storeAddress: seller.store_address,
      });
    } catch (err) {
      console.error("Error fetching seller profile:", err);
      message.error("Failed to load profile ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle profile update
  const handleFinish = async (values) => {
    try {
      await axios.put(SummaryApi.updateProfile.url, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Profile updated successfully ✅");
      fetchProfile(); // reload profile after update
    } catch (err) {
      console.error("Error updating profile:", err);
      message.error("Failed to update profile ❌");
    }
  };

  if (loading) return <Spin tip="Loading Profile..." style={{ marginTop: 50 }} />;

  return (
    <Card title="Seller Profile" style={{ maxWidth: 600, margin: "0 auto" }}>
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="address" label="Seller Address" rules={[{ required: true }]}>
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.Item name="storeName" label="Store Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="storeAddress" label="Store Address" rules={[{ required: true }]}>
          <Input.TextArea rows={2} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Update Profile
        </Button>
      </Form>
    </Card>
  );
}

export default SellerProfile;
