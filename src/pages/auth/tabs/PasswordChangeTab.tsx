import React from "react";
import { Form, Input, Button, message } from "antd";
import { useChangePasswordMutation } from "@/redux/api/auth/authApi";

const PasswordChangeTab: React.FC = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const token = localStorage.getItem("token");

  const onPasswordFinish = async (values: PasswordFormValues) => {
    try {
      const res = await changePassword({ data: values, token }).unwrap();
      if (res.status_code === 200 && !res.isError) {
        message.success("পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে।");
      } else {
        const errorMessage =
          res.data?.message ||
          res.error?.message ||
          "An error occurred while updating the password.";
        message.error(errorMessage);
      }
    } catch (error) {
      message.error("An unexpected error occurred. Please try again.");
    }
  };

  interface PasswordFormValues {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
  }

  return (
    <Form className="row mx-auto" name="password_form" onFinish={onPasswordFinish} layout="vertical">
      <Form.Item className="col-md-6" label="বর্তমান পাসওয়ার্ড" name="current_password" rules={[{ required: true, message: "দয়া করে আপনার বর্তমান পাসওয়ার্ড লিখুন!" }]}>
        <Input.Password style={{ height: 40 }} />
      </Form.Item>
      <Form.Item className="col-md-6" label="নতুন পাসওয়ার্ড" name="new_password" rules={[{ required: true, message: "দয়া করে আপনার নতুন পাসওয়ার্ড লিখুন!" }]}>
        <Input.Password min={8} style={{ height: 40 }} />
      </Form.Item>
      <Form.Item className="col-md-6" label="নতুন পাসওয়ার্ড নিশ্চিত করুন" name="new_password_confirmation" dependencies={["new_password"]} rules={[({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue("new_password") === value) { return Promise.resolve(); } return Promise.reject(new Error("আপনার প্রবেশ করানো দুটি পাসওয়ার্ড মেলে না!")); } })]}>
        <Input.Password min={8} style={{ height: 40 }} />
      </Form.Item>
      <Form.Item className="col-md-6">
        <Button disabled={isLoading} loading={isLoading} type="primary" htmlType="submit">পাসওয়ার্ড পরিবর্তন করুন</Button>
      </Form.Item>
    </Form>
  );
};

export default PasswordChangeTab;
