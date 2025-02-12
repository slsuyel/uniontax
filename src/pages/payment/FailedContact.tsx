/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePaymentFailedTicketMutation } from "@/redux/api/support/supportApi";
import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
import { Button, Form, Input, message, Select } from "antd";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

const { Option } = Select;

interface FailedContactProps {
  sonodId?: string;
  transId?: string;
  className?: string;
}

const FailedContact: React.FC<FailedContactProps> = ({
  sonodId,
  transId,
  className,
}) => {
  const [paymentFailedTicket, { isLoading }] = usePaymentFailedTicketMutation();
  // const navigate = useNavigate();
  const sonodInfo = useAppSelector((state: RootState) => state.union.sonodList);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("বিকাশ");

  const handlePaymentMethodChange = (value: string) => {
    setSelectedPaymentMethod(value);
  };
  const onFinish = async (values: any) => {
    try {
      const submissionData = {
        ...values,
        transId,
        sonod_id: sonodId,
      };

      const res = await paymentFailedTicket({ data: submissionData }).unwrap();
      if (res.status_code == "201") {
        // navigate("/");
        message.success("আপনার তথ্যগুলো সফলভাবে জমা হয়েছে");
      } else {
        console.log(res);
        message.error(
          "তথ্য জমা করতে সমস্যা হয়েছে, বা আপনার প্রদানকৃত তথ্য ভুল হতে পারে"
        );
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      message.error("তথ্য জমা করতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="row container mx-auto my-5">
      <Form
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className={`mx-auto  card p-4 ${className ? className : "col-md-6"}`}
      >
        <div className="text-center mb-4">
          <h2>পেমেন্ট ব্যর্থ হয়েছে</h2>
          <p style={{ color: "red", fontSize: "16px" }}>
            দুঃখিত, আপনার পেমেন্ট ব্যর্থ হয়েছে। অনুগ্রহ করে নিচের ফর্মটি পূরণ
            করে জমা দিন।
          </p>
        </div>
        <Form.Item
          className="mb-1"
          label="সনদ নির্বাচন করুন"
          name="certificate"
        >
          <Select
            placeholder="সনদ নির্বাচন করুন"
            style={{ height: 40, width: "100%" }}
          >
            {sonodInfo.map((sonod) => (
              <Option value={sonod.bnname}>{sonod.bnname}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          className="mb-1"
          label="পেমেন্ট মেথড"
          name="payment_method"
          rules={[
            { required: true, message: "Please select your payment method!" },
          ]}
        >
          <Select
            placeholder="পেমেন্ট মেথড নির্বাচন করুন"
            style={{ height: 40, width: "100%" }}
            onChange={handlePaymentMethodChange} // Update selected payment method
          >
            <Option value="বিকাশ">বিকাশ</Option>
            <Option value="নগদ">নগদ</Option>
            <Option value="ব্যাংক ">ব্যাংক </Option>
            <Option value="রকেট">রকেট</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className="mb-1"
          label={`${selectedPaymentMethod} একাউন্ট নং`} // Dynamic label based on selected payment method
          name="account_number"
          rules={[
            { required: true, message: "Please input your account number!" },
          ]}
        >
          <Input
            className="form-control"
            placeholder={`${selectedPaymentMethod} একাউন্ট নং লিখুন`} // Dynamic placeholder
            style={{ height: 40, width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          className="mb-1"
          label="টাকার পরিমাণ"
          name="amount"
          rules={[{ required: true, message: "Please input the amount!" }]}
        >
          <Input
            className="form-control"
            placeholder="পরিমাণ লিখুন"
            style={{ height: 40, width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          className="mb-1"
          label={`${selectedPaymentMethod} ট্রানজেকশন আইডি`}
          name="bank_transaction_id"
          rules={[
            { required: true, message: "Please input the transaction ID!" },
          ]}
        >
          <Input
            className="form-control"
            placeholder="ট্রানজেকশন আইডি লিখুন"
            style={{ height: 40, width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          className="mb-1"
          label="বিস্তারিত লিখুন"
          name="details"
          rules={[{ required: true, message: "Please input the details!" }]}
        >
          <Input.TextArea
            className="form-control"
            placeholder="বিস্তারিত লিখুন"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item className="mb-1 mt-2">
          <Button loading={isLoading} type="primary" htmlType="submit">
            জমা দিন
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FailedContact;
