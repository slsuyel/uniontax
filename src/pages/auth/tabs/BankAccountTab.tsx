import React, { useEffect } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import { useSetBankAccountMutation, useBankDetailsQuery } from "@/redux/api/auth/authApi";

const BankAccountTab: React.FC = () => {
  const token = localStorage.getItem("token");
  const { data, isLoading: getting, error } = useBankDetailsQuery(token); // Query to get bank details
  const [setBankAccount, { isLoading }] = useSetBankAccountMutation();

  useEffect(() => {
    if (error) {
      message.error("ব্যাংক একাউন্ট তথ্য লোড করতে সমস্যা হয়েছে।");
    }
  }, [error]);

  const handleBankFormSubmit = async (values: BankFormValues) => {
    try {
      const res = await setBankAccount({ data: values, token }).unwrap();
      if (res.status_code === 200) {
        message.success("ব্যাংক একাউন্ট সফলভাবে যোগ করা হয়েছে।");
      }
    } catch (error) {
      message.error("ব্যাংক একাউন্ট যোগ করতে সমস্যা হয়েছে।");
    }
  };

  interface BankFormValues {
    bank_name: string;
    branch_name: string;
    account_no: string;
    account_name: string;
    routing_no: string;
  }

  if (getting) {
    return <Spin tip="লোড হচ্ছে..." />;
  }

  return (
    <Form initialValues={data?.data || {}} onFinish={handleBankFormSubmit} className="row mx-auto" layout="vertical">
      <Form.Item className="col-md-6" label="ব্যাংকের নাম" name="bank_name">
        <Input style={{ height: 40 }} defaultValue={data?.data.bank_name || ""}  />
      </Form.Item>
      <Form.Item className="col-md-6" label="ব্রাঞ্চের নাম" name="branch_name">
        <Input style={{ height: 40 }} defaultValue={data?.data.branch_name || ""}  />
      </Form.Item>
      <Form.Item className="col-md-6" label="অ্যাকাউন্ট নম্বর" name="account_no">
        <Input style={{ height: 40 }} defaultValue={data?.data.account_no || ""}  />
      </Form.Item>
      <Form.Item className="col-md-6" label="অ্যাকাউন্টের নাম" name="account_name">
        <Input style={{ height: 40 }} defaultValue={data?.data.account_name || ""}  />
      </Form.Item>
      <Form.Item className="col-md-6" label="রাউটিং নম্বর" name="routing_no">
        <Input style={{ height: 40 }} defaultValue={data?.data.routing_no || ""}  />
      </Form.Item>
      <Form.Item className="col-md-12">
        <Button loading={isLoading} disabled={isLoading} type="primary" htmlType="submit">
          সংরক্ষণ করুন
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BankAccountTab;
