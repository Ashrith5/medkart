import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

const AddEditCategory = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/admin/categories/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // If the category has an icon path, prepare the file list object
          if (data.icon && data.icon.startsWith('/uploads')) {
            data.icon = [
              {
                uid: data.id,
                name: data.icon.split('/').pop(),
                status: 'done',
                url: `http://localhost:8080${data.icon}`,
              },
            ];
          }
          // Set the state with the prepared data. This will trigger a re-render
          // with the correct initialValues.
          setInitialValues(data);
        })
        .catch(() => message.error("Failed to load category"));
    }
  }, [id]); // Re-fetch when the ID changes

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const method = id ? "PUT" : "POST";
      const url = id
        ? `http://localhost:8080/api/admin/categories/${id}`
        : "http://localhost:8080/api/admin/categories";

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("related", values.related || "");
      formData.append("sortOrder", values.sortOrder || 0);

      if (values.icon && values.icon.length > 0) {
        const file = values.icon[0];
        
        if (file.originFileObj) {
          formData.append("icon", file.originFileObj);
        }
      }
      
      const res = await fetch(url, {
        method,
        body: formData, 
      });

      if (res.ok) {
        message.success(`Category ${id ? "updated" : "added"} successfully`);
        navigate("/admindashboard/categories");
      } else {
        message.error("Failed to save category");
      }
    } catch (err) {
      message.error("Error saving category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Category" : "Add Category"}
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues} // Set initial values from state
      >
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item label="Icon" name="icon" valuePropName="fileList" getValueFromEvent={e => e.fileList}>
          <Upload
            name="icon"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
          >
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
          loading={loading}
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
