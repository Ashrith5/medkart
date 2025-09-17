import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";

const CustomerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [form] = Form.useForm(); // create form instance

  useEffect(() => {
    // Fetch customer data by ID from API or state
    const fetchedCustomer = {
      id,
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
    };
    setCustomer(fetchedCustomer);

    // Update form values after fetching
    form.setFieldsValue(fetchedCustomer);
  }, [id, form]);

  const onFinish = (values) => {
    console.log("Updated values:", values);
    // Call API to update customer info
    navigate("/admindashboard/customers");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Customer Info</h2>
      <Form
        form={form} // bind form instance
        layout="vertical"
        onFinish={onFinish}
      >
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
          <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CustomerEdit;
