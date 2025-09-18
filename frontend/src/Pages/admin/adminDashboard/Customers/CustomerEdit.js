import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import SummaryApi from "../../../../common";

const CustomerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const url = SummaryApi.getCustomerById.url.replace(":id", id);

        const res = await fetch(url, { method: SummaryApi.getCustomerById.method });

        if (!res.ok) throw new Error("Failed to fetch customer");

        const data = await res.json();
        form.setFieldsValue(data);
      } catch (error) {
        console.error("Failed to fetch customer:", error);
        message.error("Unable to load customer details");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const url = SummaryApi.updateCustomer.url.replace(":id", id);

      const res = await fetch(url, {
        method: SummaryApi.updateCustomer.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        message.success("Customer updated successfully");
        navigate("/admindashboard/customers");
      } else {
        message.error("Failed to update customer");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Customer Info</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Name" name="name">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Mobile" name="phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CustomerEdit;


