import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Row, Col } from "antd";
import axios from "axios";
import SummaryApi from "../../common/index";
import "../../Styles/AdminLogin.css";
import { useNavigate, Link } from "react-router-dom";

const { Title } = Typography;

const AdminLogin = () => {
  const [form] = Form.useForm();
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("password");

  const navigate = useNavigate();

  // Send OTP
  const loginSendOtp = async () => {
    const mobile = form.getFieldValue("mobile");
    if (!mobile) return message.warning("Enter mobile number first!");

    try {
      setLoading(true);
      const res = await axios.post(SummaryApi.adminLoginRequestOtp.url, { mobile });

      if (res.data.success) {
        message.success("OTP sent successfully!");
        setOtpSent(true);
      } else {
        message.error(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Submit form
  const onFinish = async (values) => {
    try {
      if (activeTab === "password") {
        const res = await axios.post(SummaryApi.adminLoginPassword.url, {
          identifier: values.identifier,
          password: values.password,
        });

        if (res.data.success) {
          message.success("Login successful!");
          form.resetFields();
          localStorage.setItem("adminToken", res.data.token);
          navigate("/admindashboard");
        } else {
          message.error(res.data.message || "Invalid credentials");
        }
      } else {
        const res = await axios.post(SummaryApi.adminLoginVerifyOtp.url, {
          mobile: values.mobile,
          otp: values.otp,
        });

        if (res.data.success) {
          message.success("Login successful via OTP!");
          form.resetFields();
          setOtpSent(false);
          localStorage.setItem("adminToken", res.data.token);
          navigate("/admindashboard");
        } else {
          message.error(res.data.message || "OTP verification failed");
        }
      }
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.error || "Login failed, try again!");
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={18} md={14} lg={10}>
        <div className="login-container">
          <Title level={3} className="login-title">
            Admin Login
          </Title>

          {/* Custom Tabs */}
          <div className="login-tabs">
            <button
              className={activeTab === "password" ? "active" : ""}
              onClick={() => {
                setActiveTab("password");
                setOtpSent(false);
                form.resetFields();
              }}
            >
              Password Login
            </button>
            <button
              className={activeTab === "otp" ? "active" : ""}
              onClick={() => {
                setActiveTab("otp");
                setOtpSent(false);
                form.resetFields();
              }}
            >
              OTP Login
            </button>
          </div>

          {/* Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="login-form"
          >
            {activeTab === "password" ? (
              <>
                <Form.Item
                  label="Email or Mobile"
                  name="identifier"
                  rules={[{ required: true, message: "Please enter your email or mobile" }]}
                >
                  <Input placeholder="Email or Mobile" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please enter your password" }]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Login
                  </Button>
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  label="Mobile Number"
                  name="mobile"
                  rules={[{ required: true, message: "Please enter your mobile number" }]}
                >
                  <Input placeholder="Enter mobile number" maxLength={10} />
                </Form.Item>

                {otpSent ? (
                  <>
                    <Form.Item
                      label="OTP"
                      name="otp"
                      rules={[{ required: true, message: "Please enter the OTP" }]}
                    >
                      <Input placeholder="Enter OTP" />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" block>
                        Verify OTP
                      </Button>
                    </Form.Item>
                  </>
                ) : (
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={loginSendOtp}
                      loading={loading}
                      block
                    >
                      Send OTP
                    </Button>
                  </Form.Item>
                )}
              </>
            )}

            <p style={{ textAlign: "center", marginTop: "12px" }}>
              Don&apos;t have an account? <Link to="/admin-signup">Signup</Link>
            </p>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default AdminLogin;




