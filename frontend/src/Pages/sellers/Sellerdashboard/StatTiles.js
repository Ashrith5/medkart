import React from "react";
import { Row, Col, Card } from "antd";
import { ShoppingCartOutlined, DollarOutlined, MedicineBoxOutlined } from "@ant-design/icons";
import "../../../Styles/StatTiles.css";

function StatTiles() {
  return (
    <Row gutter={16} className="stat-tiles">
      <Col span={8}>
        <Card>
          <ShoppingCartOutlined /> Orders: 180
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <DollarOutlined /> Revenue: ₹4,20,000
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <MedicineBoxOutlined /> Products: 120
        </Card>
      </Col>
    </Row>
  );
}

export default StatTiles;
