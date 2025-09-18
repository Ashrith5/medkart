import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Upload, message, Select} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import SummaryApi from "../../../common";

function ProductManager({ seller, token }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const {Option} = Select;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(SummaryApi.getProducts.url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const handleFinish = async (values) => {
const formData = new FormData();
Object.keys(values).forEach((key) => {
  if (key !== "image") {
    formData.append(key, values[key]);
  }
});
if (values.image && values.image[0]) {
  formData.append("image", values.image[0].originFileObj);
}

    try {
      await axios.post(SummaryApi.uploadProduct.url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Product uploaded successfully ✅");
      setIsModalOpen(false);
      fetchProducts(); 
    } catch (err) {
      console.error("Error uploading product:", err);
      message.error("Failed to upload product ❌");
    }
  };

  return (
    <div>
      <h2>Products</h2>

      
      <Modal
        title="Upload Product"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)} // ✅ enables X button to close
      >
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="actual_price" label="Actual Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="selling_price" label="Selling Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
          <Input type="number" />
          </Form.Item>
          <Form.Item name="deliveryOption" label="Delivery Option" rules={[{ required: true }]}>
      <Select placeholder="Choose delivery type">
      <Option value="store_pickup">Store Pickup</Option>
      <Option value="home_delivery">Home Delivery</Option>
</Select>
</Form.Item>

          <Form.Item
  name="image"
  label="Upload Image"
  valuePropName="fileList"
  getValueFromEvent={(e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }}
>
  <Upload beforeUpload={() => false} maxCount={1}>
    <Button icon={<UploadOutlined />}>Select Image</Button>
  </Upload>
</Form.Item>
<Form.Item>
    <Button type="primary" htmlType="submit" block>
      Upload Product
    </Button>
  </Form.Item>
        </Form>

      </Modal>

      

      {/* Product List */}
      <div style={{ marginTop: "20px" }}>
  {products.map((p) => (
    <div key={p.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
      <p><strong>{p.name}</strong></p>
      <p>Category: {p.category}</p>
      <p>Stock: {p.stock}</p>
      <p>Delivery: {p.deliveryOption}</p>
      <p>
        Price: ₹{p.selling_price}{" "}
        <span style={{ textDecoration: "line-through", color: "red" }}>
          ₹{p.actual_price}
        </span>
      </p>
     {p.images && (
  <img
    src={`${process.env.REACT_APP_BACKEND_URL || "http://localhost:8080"}${p.images}`}
    alt={p.name}
    style={{ width: "100px" }}
  />
)}

    </div>
  ))}
</div>

    </div>
  );
}

export default ProductManager;
