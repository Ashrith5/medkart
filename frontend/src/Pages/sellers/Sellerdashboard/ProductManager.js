import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Upload, message, Select} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import SummaryApi from "../../../common";

function ProductManager({ seller, token }) {
  const [isModalOpen, setIsModalOpen] = useState(true); // ✅ open immediately
  const [products, setProducts] = useState([]);
  const {Option} = Select;

  // Fetch existing products
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

  // Handle product upload
  const handleFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("actual_price", values.actual_price);
    formData.append("selling_price", values.selling_price);
    formData.append("description", values.description);
    formData.append("stock", values.stock);
    formData.append("deliveryOption", values.deliveryOption);
    if (values.image && values.image.file) {
      formData.append("image", values.image.file.originFileObj);
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

          <Form.Item name="image" label="Upload Image" valuePropName="file">
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Upload
          </Button>
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
    Price: ₹{p.sellingPrice}{" "}
    <span style={{ textDecoration: "line-through", color: "red" }}>
      ₹{p.actualPrice}
    </span>
  </p>
  {p.images?.length > 0 && (
    <img src={`/uploads/${p.images[0]}`} alt={p.name} style={{ width: "100px" }} />
  )}
   </div>

        ))}
      </div>
    </div>
  );
}

export default ProductManager;
