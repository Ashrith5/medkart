import React, { useEffect, useState } from "react";
import { Table, Spin, message } from "antd";
import SummaryApi from "../../../common/index";
import axios from "axios";
import "../../../Styles/OrdersTable.css";

function OrdersTable({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(SummaryApi.getOrders.url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders || []); // Make sure your backend sends { orders: [...] }
      } catch (err) {
        console.error(err);
        message.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Customer", dataIndex: "customerName", key: "customerName" },
    { title: "Total", dataIndex: "totalAmount", key: "totalAmount" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  if (loading) return <Spin tip="Loading Orders..." />;

  return (
    <div className="orders-table">
      <h3>Recent Orders</h3>
      <Table columns={columns} dataSource={orders} rowKey="id" />
    </div>
  );
}

export default OrdersTable;
