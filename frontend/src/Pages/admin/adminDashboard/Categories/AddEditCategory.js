import React from "react";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AddEditCategory = () => {
  const onFinish = (values) => {
    console.log("Form Submitted:", values);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add / Edit Category</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Category Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item label="Icon" name="icon">
          <Upload>
            <Button icon={<UploadOutlined />}>Choose File</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Related Categories" name="related">
          <Input placeholder="Enter related categories" />
        </Form.Item>

        <Form.Item label="Sort Order" name="sortOrder">
          <Input type="number" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          style={{ background: "#EE152D" }}
          block
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddEditCategory;
