/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  // UploadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Select,
  // Upload,
  Space,
  message,
  InputNumber,
} from "antd";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAddHoldingMutation } from "@/redux/api/sonod/sonodApi";

const { Option } = Select;

const HoldingAdd = () => {
  const token = localStorage.getItem("token");
  const [addHolding, { isLoading }] = useAddHoldingMutation();
  const { word } = useParams();
  const [form] = Form.useForm();
  const [category, setCategory] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState(false);

  const handleTaxType = (value: string) => {
    setCategory(value);
  };

  const onFinish = async (values: any) => {
   
    try {
      const res = await addHolding({ data: values, token }).unwrap();
      if (res.status_code === 201) {
        message.success("Holding created successfully");
        form.resetFields();
        setCategory("");

        form.setFieldsValue({ bokeya: [] });
      } else if (res.isError) {
        console.error("Error in response:", res);
        message.error(
          `Failed to create holding: ${res.message || "An error occurred"}`
        );
      }
    } catch (error) {
      console.error("Error creating holding:", error);
      message.error(`Failed to create holding`);
    }
  };

  return (
    <div className="card p-4 mt-4">
      <h4 className="mb-3">হোল্ডিং ট্যাক্স</h4>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          word_no: word,
          griher_barsikh_mullo: 0,
          jomir_vara: 0,
        }}
      >
        <div className="row mx-auto">
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

          <div className="col-md-6">
            <Form.Item
              label="মাতার নাম"
              name="mother_name"
              className="my-1"
              rules={[{ required: true, message: "মাতার নাম দিন" }]}
            >
              <Input style={{ height: 40 }} />
            </Form.Item>
          </div>

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
          <div className="col-md-6">
            <Form.Item label="ওয়ার্ড নং" name="word_no" className="my-1">
              <Input disabled style={{ height: 40 }} />
            </Form.Item>
          </div>

          {/* Category Selection */}
          <div className="col-md-6">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "হোল্ডিং ট্যাক্স এর ধরণ নির্বাচন করুন",
                },
              ]}
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
                <Select.Option value="প্রতিষ্ঠান">
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
          {category === "মালিক নিজে বসবাসকারী" && (
            <>
              <div className="col-md-6">
                <Form.Item
                  label="গৃহের বার্ষিক মূল্য"
                  name="griher_barsikh_mullo"
                  className="my-1"
                >
                  <Input style={{ height: 40 }} />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item label="জমির ভাড়া" name="jomir_vara" className="my-1">
                  <Input style={{ height: 40 }} />
                </Form.Item>
              </div>
            </>
          )}
          {category === "ভাড়া" && (
            <div className="col-md-6">
              <Form.Item
                label="বার্ষিক ভাড়া"
                name="barsikh_vara"
                className="my-1"
                rules={[
                  {
                    required: true,
                    type: "number",
                    message: "The barsikh vara field must be a number.",
                  },
                ]}
              >
                <InputNumber
                  type="number"
                  style={{ height: 40, width: "100%" }}
                />
              </Form.Item>
            </div>
          )}
          {category === "আংশিক ভাড়া" && (
            <>
              <div className="col-md-6">
                <Form.Item
                  label="গৃহের বার্ষিক মূল্য"
                  name="griher_barsikh_mullo"
                  className="my-1"
                >
                  <Input style={{ height: 40 }} />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item label="জমির ভাড়া" name="jomir_vara" className="my-1">
                  <Input style={{ height: 40 }} />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  label="বার্ষিক ভাড়া"
                  name="barsikh_vara"
                  className="my-1"
                  rules={[
                    {
                      required: true,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber
                    type="number"
                    style={{ height: 40, width: "100%" }}
                  />
                </Form.Item>
              </div>
            </>
          )}

          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setAdditionalInfo(!additionalInfo);
              }}
              className="btn btn-info btn-sm text-white my-2"
            >
              অতিরিক্ত তথ্য যোগ করুন
            </button>
          </div>

          {
            additionalInfo && <>
              <div className="col-md-6">
                <Form.Item
                  label="জন্ম তারিখ"
                  name="date_of_birth"
                  className="my-1"

                >
                  <Input type="date" style={{ height: 40 }} />
                </Form.Item>
              </div>



              <div className="col-md-6">
                <Form.Item
                  label="পেশা"
                  name="profession"
                  className="my-1"

                >
                  <Input style={{ height: 40 }} />
                </Form.Item>
              </div>

              <div className="col-md-3">
                <Form.Item
                  label="ধর্ম"
                  name="religion"
                  className="my-1"

                >
                  <Select placeholder="ধর্ম নির্বাচন করুন" style={{ height: 40 }}>
                    <Option value="হিন্দু">হিন্দু</Option>
                    <Option value="মুসলিম">মুসলিম</Option>
                    <Option value="খ্রিস্টান">খ্রিস্টান</Option>
                    <Option value="বৌদ্ধ">বৌদ্ধ</Option>
                    <Option value="অন্যান্য">অন্যান্য</Option>
                  </Select>
                </Form.Item>
              </div>


              <div className="col-md-3">
                <Form.Item
                  label="গৃহের ধরণ"
                  name="house_type"
                  className="my-1"

                >
                  <Select placeholder="গৃহের ধরণ নির্বাচন করুন" style={{ height: 40 }}>
                    <Option value="পাকা">পাকা</Option>
                    <Option value=" আধা পাকা"> আধা পাকা</Option>
                    <Option value="কাচা">কাচা</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="col-md-6">
                <Form.Item
                  label="সামাজিক সুবিধা"
                  name="social_facility"
                  className="my-1"

                >
                  <Select placeholder="সামাজিক সুবিধা নির্বাচন করুন" style={{ height: 40 }}>
                    <Option value="টিসিবি">টিসিবি</Option>
                    <Option value="ভি ডব্লিউ বি">ভি ডব্লিউ বি</Option>
                    <Option value="বয়স্ক ভাতা">বয়স্ক ভাতা</Option>
                    <Option value="বিধবা ভাতা">বিধবা ভাতা</Option>
                    <Option value="স্বামী পরিত্যাক্ত ভাতা">স্বামী পরিত্যক্ত ভাতা</Option>
                    <Option value="মা ও শিশু সহায়তা ভাতা">মা ও শিশু সহায়তা ভাতা</Option>
                    <Option value="প্রতিবন্ধী ভাতা">প্রতিবন্ধী ভাতা</Option>
                    <Option value="আদিবাসী ভাতা">আদিবাসী ভাতা</Option>
                    <Option value="মুক্তিযোদ্ধা ভাতা">মুক্তিযোদ্ধা ভাতা</Option>
                    <Option value="হতদরিদ্র ভাতা">হতদরিদ্র ভাতা</Option>
                  </Select>
                </Form.Item>
              </div>


              <div className="col-md-6">
                <Form.Item
                  label="স্যানেটারি বা হাইজেনিক অবস্থা"
                  name="sanitary_condition"
                  className="my-1"
                >
                  <Select placeholder="বাড়ির ওপর ঋণ নির্বাচন করুন" style={{ height: 40 }}>
                    <Option value={'হ্যাঁ'}>হ্যাঁ</Option>
                    <Option value={'না'}>না</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="col-md-3">
                <Form.Item
                  label="ছেলে সন্তান"
                  name="number_of_sons"
                  className="my-1"

                >
                  <InputNumber style={{ height: 40, width: "100%" }} />
                </Form.Item>
              </div>

              <div className="col-md-3">
                <Form.Item
                  label="মেয়ে সন্তান"
                  name="number_of_daughters"
                  className="my-1"

                >
                  <InputNumber style={{ height: 40, width: "100%" }} />
                </Form.Item>
              </div>

              <div className="col-md-6">
                <Form.Item
                  label="বাড়ির ওপর ঋণ"
                  name="house_loan"
                  className="my-1"

                >
                  <Select placeholder="বাড়ির ওপর ঋণ নির্বাচন করুন" style={{ height: 40 }}>
                    <Option value={'হ্যাঁ'}>হ্যাঁ</Option>
                    <Option value={'না'}>না</Option>
                  </Select>
                </Form.Item>
              </div>


              <div className="col-md-6">
                <Form.Item
                  label="জমির পরিমান"
                  name="land_amount"
                  className="my-1"
                >
                  <InputNumber style={{ height: 40, width: "100%" }} />
                </Form.Item>
              </div>

              <div className="col-md-6">
                <Form.Item
                  label="বসত ভিটার পরিমান"
                  name="homestead_amount"
                  className="my-1"
                >
                  <InputNumber style={{ height: 40, width: "100%" }} />
                </Form.Item>
              </div>

              <div className="col-md-6">
                <Form.Item
                  label="ব্যবসার মূলধনের পরিমান"
                  name="business_capital"
                  className="my-1"
                >
                  <InputNumber style={{ height: 40, width: "100%" }} />
                </Form.Item>
              </div>

              <div className="col-md-6">
                <Form.Item
                  label="আর্থ সামাজিক অবস্থার ধরণ"
                  name="socioeconomic_status"
                  className="my-1"
                >
                  <Select placeholder="আর্থ সামাজিক অবস্থার ধরণ নির্বাচন করুন" style={{ height: 40 }}>
                    <Option value="A">A</Option>
                    <Option value="B">B</Option>
                    <Option value="C">C</Option>
                    <Option value="D">D</Option>
                  </Select>
                </Form.Item>
              </div>

            </>
          }


          <div className="border rounded my-4">
            <h3>
              <label>বকেয়ার পরিমাণ</label>
            </h3>
          </div>
          <Form.List name="bokeya">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <Space key={key} align="baseline" className="sssssssssdgsfdg">
                    <div style={{ width: "100%" }}>
                      <Form.Item
                        label="সাল"
                        name={[name, "year"]}
                        className="w-100"
                        style={{ width: "100%" }}
                      >
                        <Select
                          placeholder="Year"
                          style={{ width: "100%", height: 40 }}
                        >
                          <Option value="2025-2026">2025-2026</Option>
                          <Option value="2024-2025">2024-2025</Option>
                          <Option value="2023-2024">2023-2024</Option>
                          <Option value="2022-2023">2022-2023</Option>
                          <Option value="2021-2022">2021-2022</Option>
                          <Option value="2020-2021">2020-2021</Option>
                          <Option value="2019-2020">2019-2020</Option>
                          <Option value="2018-2019">2018-2019</Option>
                          <Option value="2017-2018">2017-2018</Option>
                          <Option value="2016-2017">2016-2017</Option>
                          <Option value="2015-2016">2015-2016</Option>
                          <Option value="2014-2015">2014-2015</Option>
                          <Option value="2013-2014">2013-2014</Option>
                          <Option value="2012-2013">2012-2013</Option>
                          <Option value="2011-2012">2011-2012</Option>
                          <Option value="2010-2011">2010-2011</Option>
                          <Option value="2009-2010">2009-2010</Option>
                          <Option value="2008-2009">2008-2009</Option>
                          <Option value="2007-2008">2007-2008</Option>
                          <Option value="2006-2007">2006-2007</Option>
                          <Option value="2005-2006">2005-2006</Option>
                          <Option value="2004-2005">2004-2005</Option>
                          <Option value="2003-2004">2003-2004</Option>
                          <Option value="2002-2003">2002-2003</Option>
                          <Option value="2001-2002">2001-2002</Option>
                        </Select>
                      </Form.Item>
                    </div>

                    <Form.Item
                      label="টাকার পরিমাণ"
                      name={[name, "price"]}
                      style={{ width: "100%" }}
                    >
                      <InputNumber
                        placeholder="Price"
                        style={{ width: "100%", height: 40 }}
                      />
                    </Form.Item>
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    className="border border-info"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    বকেয়া যোগ করুন
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>

        {/* Submit Button */}
        <div className=" text-center">
          <Form.Item className="mt-4">
            <Button
              size="large"
              disabled={isLoading}
              loading={isLoading}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default HoldingAdd;
