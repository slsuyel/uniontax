/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined } from "@ant-design/icons";

import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import Loader from "@/components/reusable/Loader";
import {
  useHoldingBokeyaUpdateMutation,
  useSingleHoldingQuery,
  useUpdateHoldingMutation,
} from "@/redux/api/sonod/sonodApi";
import { useParams } from "react-router-dom";
import { Form, Input, Select, InputNumber, Modal, Button, message } from "antd";
import { SetStateAction, useState } from "react";

const HoldingTaxEdit = () => {
  const [updateHolding, { isLoading: updatingHolding }] =
    useUpdateHoldingMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBokeya, setSelectedBokeya] = useState<any>(null);
  const [form] = Form.useForm();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [category, setCategory] = useState("");
  const [holdingBokeyaUpdate, { isLoading: updating }] =
    useHoldingBokeyaUpdateMutation();
  const { data, isLoading } = useSingleHoldingQuery({
    id,
    token,
  });

  if (isLoading) {
    return <Loader />;
  }
  const onFinish = async (values: any) => {
    try {
      const res = await updateHolding({ data: values, token, id }).unwrap();
      if (res.status_code === 200 && !res.isError) {
        message.success("হোল্ডিং ট্যাক্স সফলভাবে আপডেট করা হয়েছে");
        console.log(res);
      } else {
        message.error("হোল্ডিং ট্যাক্স আপডেট করতে সমস্যা হয়েছে");
      }
    } catch (error) {
      message.error("একটি অপ্রত্যাশিত ত্রুটি ঘটেছে");
      console.error(error);
    }
  };

  const handleTaxType = (value: SetStateAction<string>) => {
    setCategory(value);
  };

  const handleEdit = (bokeya: { price: any }) => {
    setSelectedBokeya(bokeya);
    setIsModalVisible(true);
    form.setFieldsValue({ price: bokeya.price });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(selectedBokeya.id);
      console.log("Edited Bokeya Amount:", values.price);

      const res = await holdingBokeyaUpdate({
        price: values.price,
        id: selectedBokeya.id,
        token,
      }).unwrap();

      // Check if the response indicates success
      if (res.isError === false && res.status_code === 200) {
        // Show success message
        message.success(
          res.data.message || "Holding Bokeya price updated successfully"
        );
      } else {
        // Show error message from the response
        message.error(res.error || "Failed to update Holding Bokeya price");
      }
      setIsModalVisible(false); // Close the modal
    } catch (error) {
      console.error("Validation or API call failed:", error);
      message.error(
        "An error occurred while updating the Holding Bokeya price"
      );
    }
  };
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="card p-3 border-0">
      <Breadcrumbs current="হোল্ডিং ট্যাক্স এডিট" />

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          holding_no: data?.data?.holding_no,
          maliker_name: data?.data?.maliker_name,
          father_or_samir_name: data?.data?.father_or_samir_name,
          gramer_name: data?.data?.gramer_name,
          nid_no: data?.data?.nid_no,
          mobile_no: data?.data?.mobile_no,
          word_no: data?.data?.word_no,
          category: data?.data?.category,
          griher_barsikh_mullo: data?.data?.griher_barsikh_mullo,
          jomir_vara: data?.data?.jomir_vara,
          barsikh_vara: data?.data?.barsikh_vara,
          bokeya: data?.data?.holding_bokeyas?.map(
            (bokeya: { year: any; price: any }) => ({
              year: bokeya.year,
              price: bokeya.price,
            })
          ),
        }}
      >
        <div className="row mx-auto">
          {/* Holding Number */}
          <div className="col-md-6">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "হোল্ডিং নং",
                },
              ]}
              label="হোল্ডিং নং"
              name="holding_no"
              className="my-1"
            >
              <Input style={{ height: 40 }} />
            </Form.Item>
          </div>

          {/* Owner's Name */}
          <div className="col-md-6">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "মালিকের নাম",
                },
              ]}
              label="মালিকের নাম"
              name="maliker_name"
              className="my-1"
            >
              <Input style={{ height: 40 }} />
            </Form.Item>
          </div>

          {/* Father/Husband's Name */}
          <div className="col-md-6">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "পিতা/স্বামীর নাম",
                },
              ]}
              label="পিতা/স্বামীর নাম"
              name="father_or_samir_name"
              className="my-1"
            >
              <Input style={{ height: 40 }} />
            </Form.Item>
          </div>

          {/* Village Name */}
          <div className="col-md-6">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "গ্রামের নাম",
                },
              ]}
              label="গ্রামের নাম"
              name="gramer_name"
              className="my-1"
            >
              <Input style={{ height: 40 }} />
            </Form.Item>
          </div>

          {/* NID Number */}
          <div className="col-md-6">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "এনআইডি নং",
                },
              ]}
              label="এনআইডি নং"
              name="nid_no"
              className="my-1"
            >
              <Input style={{ height: 40 }} />
            </Form.Item>
          </div>

          {/* Mobile Number */}
          <div className="col-md-6">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "মোবাইল নং",
                },
              ]}
              label="মোবাইল নং"
              name="mobile_no"
              className="my-1"
            >
              <Input style={{ height: 40 }} />
            </Form.Item>
          </div>

          {/* Ward Number */}
          <div className="col-md-6">
            <Form.Item label="ওয়ার্ড নং" name="word_no" className="my-1">
              <Input
                min={1}
                max={9}
                maxLength={1}
                style={{ height: 40, width: "100%" }}
              />
            </Form.Item>
          </div>

          {/* Category Selection */}
          <div className="col-md-6">
            <Form.Item
              label="হোল্ডিং ট্যাক্স এর ধরণ"
              name="category"
              className="my-1"
            >
              <Select
                placeholder="হোল্ডিং ট্যাক্স এর ধরণ নির্বাচন করুন"
                style={{ height: 40 }}
                onChange={handleTaxType}
                value={category}
              >
                <Select.Option value="ভাড়া">ভাড়া</Select.Option>
                <Select.Option value="আংশিক ভাড়া">আংশিক ভাড়া</Select.Option>
                <Select.Option value="মালিক নিজে বসবাসকারী">
                  মালিক নিজে বসবাসকারী
                </Select.Option>
                <Select.Option value="প্রতিষ্ঠান (সরকারি/আধা সরকারি/বেসরকারি/বাণিজ্যিক)">
                  প্রতিষ্ঠান (সরকারি/আধা সরকারি/বেসরকারি/বাণিজ্যিক)
                </Select.Option>
              </Select>
            </Form.Item>
          </div>

          {/* Dynamic Fields Based on Category */}
          {category === "প্রতিষ্ঠান (সরকারি/আধা সরকারি/বেসরকারি/বাণিজ্যিক)" && (
            <>
              <div className="col-md-6">
                <Form.Item
                  label="গৃহের বার্ষিক মূল্য"
                  name="griher_barsikh_mullo"
                  className="my-1"
                  rules={[
                    {
                      required: true,
                      message: "The griher barsikh mullo field is required.",
                    },
                  ]}
                >
                  <InputNumber
                    type="number"
                    style={{ height: 40, width: "100%" }}
                  />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item label="জমির ভাড়া" name="jomir_vara" className="my-1">
                  <InputNumber
                    type="number"
                    style={{ height: 40, width: "100%" }}
                  />
                </Form.Item>
              </div>

              <div className="col-md-6">
                <Form.Item
                  label="প্রতিষ্ঠানের নাম"
                  name="busnessName"
                  className="my-1"
                >
                  <Input style={{ height: 40 }} />
                </Form.Item>
              </div>
            </>
          )}

          <Form.Item>
            <Button
              loading={updatingHolding}
              disabled={updatingHolding}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>

          {/* Bokeya Table */}
          <div className="border rounded my-4">
            <h3>
              <label>বকেয়ার পরিমাণ</label>
            </h3>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>সাল</th>
                    <th>টাকার পরিমাণ</th>
                    <th>একশন</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.holding_bokeyas?.map((bokeya: any) => (
                    <tr key={bokeya.id}>
                      <td>{bokeya.year}</td>
                      <td>{bokeya.price}</td>
                      <td>
                        <Button
                          disabled={bokeya.status == "Paid"}
                          type="primary"
                          onClick={() => handleEdit(bokeya)}
                          className=""
                        >
                          {bokeya.status !== "Paid" && <EditOutlined />}
                          {bokeya.status == "Paid" ? "Paid" : "এডিট"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Form>

      {/* Edit Bokeya Modal */}
      <Modal
        maskClosable={false}
        title="বকেয়া এডিট করুন"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="সেভ করুন"
        cancelText="বাতিল করুন"
        confirmLoading={updating}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            className="my-1"
            label="সাল"
            name="year"
            rules={[{ required: true, message: "সাল অবশ্যই পূরণ করতে হবে" }]}
            initialValue={selectedBokeya?.year}
          >
            <Input style={{ height: 40 }} />
          </Form.Item>
          <Form.Item
            className="my-1"
            label="টাকার পরিমাণ"
            name="price"
            rules={[
              { required: true, message: "টাকার পরিমাণ অবশ্যই পূরণ করতে হবে" },
            ]}
          >
            <InputNumber style={{ width: "100%", height: 40 }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HoldingTaxEdit;
