import React from "react";
import { Form, Input, Button, message } from "antd";

const ChangePassword = () => {
  const onFinish = (values) => {
    const { oldPassword, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      message.error("New password and Confirm Password do not match!");
      return;
    }

    // TODO: Replace with API call to update password
    console.log("Change password request:", values);
    message.success("Password changed successfully!");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[{ required: true, message: "Please enter old password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: "Please enter new password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm new password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
