/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Form, Input, Button, Switch } from "antd";
import Breadcrumbs from "@/components/reusable/Breadcrumbs";

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [changePassword, setChangePassword] = useState(false);

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="container mt-5">
      <Breadcrumbs current="প্রোফাইল" />
      <div className="card p-2">
        <div>
          <Form
            className="row mx-auto"
            form={form}
            name="profile_form"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item className="col-md-6" label="নাম" name="name">
              <Input style={{ height: 40 }} />
            </Form.Item>

            <Form.Item className="col-md-6" label="জেলা" name="district">
              <Input style={{ height: 40 }} />
            </Form.Item>

            <Form.Item className="col-md-6" label="উপজেলা" name="upazila">
              <Input style={{ height: 40 }} />
            </Form.Item>

            <Form.Item className="col-md-6" label="মোবাইল নম্বর" name="mobile">
              <Input style={{ height: 40 }} />
            </Form.Item>

            <Form.Item className="col-md-6" label="ইমেইল" name="email">
              <Input style={{ height: 40 }} />
            </Form.Item>
            <div className="row">
              <Form.Item className="col-md-6" label="পাসওয়ার্ড পরিবর্তন">
                <Switch checked={changePassword} onChange={setChangePassword} />
              </Form.Item>

              {changePassword && (
                <>
                  <Form.Item
                    className="col-md-6"
                    label="বর্তমান পাসওয়ার্ড"
                    name="currentPassword"
                    rules={[
                      {
                        required: true,
                        message: "দয়া করে আপনার বর্তমান পাসওয়ার্ড লিখুন!",
                      },
                    ]}
                  >
                    <Input.Password style={{ height: 40 }} />
                  </Form.Item>

                  <Form.Item
                    className="col-md-6"
                    label="নতুন পাসওয়ার্ড"
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: "দয়া করে আপনার নতুন পাসওয়ার্ড লিখুন!",
                      },
                    ]}
                  >
                    <Input.Password style={{ height: 40 }} />
                  </Form.Item>

                  <Form.Item
                    className="col-md-6"
                    label="নতুন পাসওয়ার্ড নিশ্চিত করুন"
                    name="confirmNewPassword"
                    dependencies={["newPassword"]}
                    rules={[
                      {
                        required: true,
                        message: "দয়া করে আপনার নতুন পাসওয়ার্ড নিশ্চিত করুন!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "আপনার প্রবেশ করানো দুটি পাসওয়ার্ড মেলে না!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password style={{ height: 40 }} />
                  </Form.Item>
                </>
              )}
            </div>
            <Form.Item className="col-md-6">
              <Button type="primary" htmlType="submit">
                প্রোফাইল আপডেট করুন
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
