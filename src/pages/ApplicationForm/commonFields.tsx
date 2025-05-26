/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Select, Upload, Button } from "antd";
const { Option } = Select;
import { UploadOutlined } from "@ant-design/icons";
// import DatePicker from 'react-datepicker';
// import { useEffect, useState } from 'react';


const commonFields = ({ form }: { form: any; setFormData: (data: any) => void }) => {

  console.log(form.getFieldsValue(), "form values");


  // const getFieldsValue = form.getFieldsValue();

  // const [startDate, setStartDate] = useState<Date | null>(getFieldsValue.applicant_date_of_birth || null);

  // useEffect(() => {
  //   setStartDate(getFieldsValue.applicant_date_of_birth || null);
  // }, [getFieldsValue.applicant_date_of_birth]);



  return (
    <>
      <div className="col-md-4">
        <Form.Item
          label="আবেদনকারীর নাম"
          name="applicant_name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="লিঙ্গ" name="applicant_gender"
          rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Select
            placeholder="লিঙ্গ নির্বাচন করুন"
            style={{ height: 40, width: "100%" }}
            className=""
          >
            <Option value="পুরুষ">পুরুষ</Option>
            <Option value="মহিলা">মহিলা</Option>
          </Select>
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="পিতা/স্বামীর নাম" name="applicant_father_name" rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}>
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="মাতার নাম" name="applicant_mother_name" rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}>
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="জাতীয় পরিচয়পত্র নং"
          name="applicant_national_id_number"
        >
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="জন্ম নিবন্ধন নং"
          name="applicant_birth_certificate_number"
        >
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
          />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="বাসিন্দার ধরণ"
          name="applicant_resident_status"
          initialValue={'স্থায়ী'}
          rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Select style={{ height: 40 }}>
            <Option value="">নির্বাচন করুন</Option>
            <Option value="স্থায়ী">স্থায়ী</Option>
            <Option value="অস্থায়ী">বসবাসকারী</Option>
          </Select>
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item
          rules={[
            { required: true, message: "দয়া করে আপনার মোবাইল নম্বর লিখুন" },
            {
              len: 11,
              message: "মোবাইল নম্বরটি ১১ অক্ষর হতে হবে",
            },
            {
              pattern: /^[0-9]+$/,
              message: "মোবাইল নম্বরটি শুধুমাত্র সংখ্যা হতে হবে",
            },
          ]}
          label="মোবাইল"
          name="applicant_mobile"
        >
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
            type="tel"
          />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item label="হোল্ডিং নং" name="applicant_holding_tax_number">
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <fieldset className="border rounded p-3 mb-3 col-md-12">
        <legend className="w-auto px-2" style={{ fontWeight: 'bold' }}>হোল্ডিং সম্পর্কিত তথ্য</legend>

        <div className="row mx-auto">

          <div className="col-md-4">
            <Form.Item label="হোল্ডিং মালিকের নাম" name="holding_owner_name">
              <Input
                style={{ height: 40, width: "100%" }}
                className="form-control"
              />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item
              label="হোল্ডিং মালিকের সাথে সম্পর্ক"
              name="holding_owner_relationship"
            >
              <Select style={{ height: 40 }} placeholder="সম্পর্ক">
                <Select.Option value="নিজ">নিজ</Select.Option>
                <Select.Option value="ভাড়াটিয়া">ভাড়াটিয়া</Select.Option>
                <Select.Option value="পিতা">পিতা</Select.Option>
                <Select.Option value="মাতা">মাতা</Select.Option>
                <Select.Option value="স্ত্রী">স্ত্রী</Select.Option>
                <Select.Option value="পুত্র">পুত্র</Select.Option>
                <Select.Option value="কন্যা">কন্যা</Select.Option>
                <Select.Option value="স্বামী">স্বামী</Select.Option>
                <Select.Option value="ভাই">ভাই</Select.Option>
                <Select.Option value="বোন">বোন</Select.Option>
                <Select.Option value="নাতি">নাতি</Select.Option>
                <Select.Option value="নাতনি">নাতনি</Select.Option>

              </Select>
            </Form.Item>
          </div>

          <div className="col-md-4">
            <Form.Item label="হোল্ডিং মালিকের মোবাইল নম্বর" name="holding_owner_mobile">
              <Input
                style={{ height: 40, width: "100%" }}
                className="form-control"
              />
            </Form.Item>
          </div>
        </div>
      </fieldset>






      <div className="col-md-4">
        <Form.Item
          label="জন্ম তারিখ (মাস/দিন/বছর)"
          name="applicant_date_of_birth"
          rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input type="date" className="form-control" style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div>



      <div className="col-md-4">
        <Form.Item
          label="আবেদনকারীর ছবি"
          name="image"
          valuePropName="file"
          getValueFromEvent={(e) => {
            return e?.file;
          }}
        >
          <Upload name="image" listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
      </div>
      <div className="col-md-4">
        {" "}
        <Form.Item label="ধর্ম" name="applicant_religion"
          rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}>
          <Select style={{ height: 40 }}>
            <Option value="ইসলাম">ইসলাম</Option>
            <Option value="হিন্দু">হিন্দু</Option>
            <Option value="খ্রিস্টান">খ্রিস্টান</Option>
            <Option value="বৌদ্ধ">বৌদ্ধ</Option>
            <Option value="অন্যান্য">অন্যান্য</Option>
          </Select>
        </Form.Item>
      </div>
    </>
  );
};

export default commonFields;
