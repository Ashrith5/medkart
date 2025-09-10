import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import SummaryApi from "../common/index"; // your api config
import axios from "axios";
import "../Styles/Login.css";

const { Title } = Typography;

const Login = () => {
  const [activeTab, setActiveTab] = useState("password"); // default password login
  const [form] = Form.useForm();
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Send OTP
  const sendOtp = async () => {
    const mobile = form.getFieldValue("mobile");
    if (!mobile) return message.warning("Enter mobile number first!");

    try {
      setLoading(true);
      const res = await axios.post(SummaryApi.loginSendOtp.url, { mobile });
      if (res.data.success) {
        message.success("OTP sent successfully!");
        setOtpSent(true);
      } else {
        message.error(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit
  const onFinish = async (values) => {
    try {
      if (activeTab === "password") {
        // password login
        const res = await axios.post(SummaryApi.signin.url, {
          email: values.email,
          password: values.password,
        });
        if (res.data.success) {
          message.success("Login successful!");
          form.resetFields();
        } else {
          message.error(res.data.message || "Invalid credentials");
        }
      } else {
        // otp login
        const res = await axios.post(SummaryApi.verifyotp.url, {
          mobile: values.mobile,
          otp: values.otp,
        });
        if (res.data.success) {
          message.success("Login successful via OTP!");
          form.resetFields();
          setOtpSent(false);
        } else {
          message.error(res.data.message || "OTP verification failed");
        }
      }
    } catch (err) {
      console.error(err);
      message.error("Login failed, try again!");
    }
  };

  return (
    <div className="login-container">
      <Title level={3} className="login-title">Login</Title>

      {/* Tabs */}
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

      <Form form={form} layout="vertical" onFinish={onFinish} className="login-form">
        {activeTab === "password" ? (
          <>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password placeholder="Enter your password" />
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

            {otpSent && (
              <Form.Item
                label="OTP"
                name="otp"
                rules={[{ required: true, message: "Please enter the OTP" }]}
              >
                <Input placeholder="Enter OTP" />
              </Form.Item>
            )}

            {!otpSent && (
              <Button
                type="dashed"
                onClick={sendOtp}
                loading={loading}
                block
                style={{ marginBottom: "10px" }}
              >
                Send OTP
              </Button>
            )}
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {activeTab === "password" ? "Login" : "Verify OTP"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
