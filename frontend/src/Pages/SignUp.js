import React, { useState } from "react";
import { Form, Input, Button, Typography, message,Row,Col } from "antd";
import axios from "axios";
import SummaryApi from '../common/index'
import { Link } from "react-router-dom";
import "../Styles/SignUp.css";
const { Title } = Typography;

const Signup = () => {
  const [form] = Form.useForm();
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const sendOtp = async () => {
    const mobile = form.getFieldValue("mobile");
    if (!mobile) {
      return message.warning("Please enter mobile number first");
    }

    try {
      setLoading(true);
      const res = await axios.post(SummaryApi.sendOtp.url, { mobile });
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
      const response = await axios.post(SummaryApi.signup.url, values);
      if (response.data.success) {
        message.success("Signup successful! Please login.");
        form.resetFields();
        setOtpSent(false);
      } else {
        message.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong. Try again!");
    }
  };

  return (
    <div className="signup-container">
      <Title level={3} className="signup-title">
        Create Account
      </Title>
      <Form form={form} layout="vertical" onFinish={onFinish} className="signup-form">
        
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
  label="Mobile Number"
  name="mobile"
  rules={[{ required: true, message: "Please enter your mobile number" }]}
>
  <Row gutter={8}>
    <Col span={16}>
      <Input placeholder="Enter mobile number" />
    </Col>
    <Col span={8}>
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

        <Form.Item>
          <Button type="primary" htmlType="submit" block disabled={!otpSent}>
            Register
          </Button>
        </Form.Item>
        <p>Already have an account? <Link to={"/login"}>Login</Link></p>
      </Form>
    </div>
  );
};

export default Signup;
