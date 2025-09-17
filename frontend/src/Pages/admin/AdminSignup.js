import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Row, Col, Card } from "antd";
import axios from "axios";
import SummaryApi from "../../common/index";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/AdminSignup.css";

const { Title } = Typography;

const AdminSignup = () => {
  const [form] = Form.useForm();
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendOtp = async () => {
    const mobile = form.getFieldValue("mobile");
    if (!mobile) return message.warning("Please enter mobile number first");

    try {
      setLoading(true);
      const res = await axios.post(SummaryApi.adminSignupRequestOtp.url, {
        mobile,
        name: form.getFieldValue("name"),
        email: form.getFieldValue("email"),
      });

      if (res.data.success) {
        message.success("OTP sent successfully!");
        setOtpSent(true);
      } else {
        message.error(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post(SummaryApi.adminSignupVerifyOtp.url, values);

      if (response.data.success) {
        message.success("Admin signup successful! Please login.");
        form.resetFields();
        setOtpSent(false);

        if (response.data.token) {
          localStorage.setItem("adminToken", response.data.token);
        }

        navigate("/admin-signin");
      } else {
        message.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      message.error(error.response?.data?.error || "Something went wrong. Try again!");
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={18} md={14} lg={10}>
        <Card className="signup-card" bordered={false} style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <Title level={3} className="signup-title" style={{ textAlign: "center" }}>
            Admin Signup
          </Title>

          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Mobile"
              name="mobile"
              rules={[{ required: true, message: "Please enter your mobile number" }]}
            >
              <Row gutter={8}>
                <Col span={14}>
                  <Input placeholder="Enter mobile number" />
                </Col>
                <Col span={10}>
                  <Button
                    type="primary"
                    block
                    onClick={sendOtp}
                    loading={loading}
                    disabled={otpSent}
                  >
                    {otpSent ? "OTP Sent" : "Send OTP"}
                  </Button>
                </Col>
              </Row>
            </Form.Item>

            {otpSent && (
              <Form.Item
                label="OTP"
                name="otp"
                rules={[{ required: true, message: "Please enter the OTP" }]}
              >
                <Input placeholder="Enter OTP" />
              </Form.Item>
            )}

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" block disabled={!otpSent}>
                Register
              </Button>
            </Form.Item>
          </Form>

          <p style={{ textAlign: "center", marginTop: "12px" }}>
            Already have an account? <Link to={"/admin-signin"}>Login</Link>
          </p>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminSignup;
