import { Form, Input, Select, DatePicker, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;
const commonFields = () => {
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
        <Form.Item label="লিঙ্গ" name="applicant_gender">
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
        <Form.Item label="পিতা/স্বামীর নাম" name="applicant_father_name">
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="মাতার নাম" name="applicant_mother_name">
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
        <Form.Item label="হোল্ডিং নং" name="applicant_holding_tax_number">
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
          />
        </Form.Item>
      </div>
      {/* "applicant_mobile",
        <Input
          min={11}
          max={11}
          style={{ height: 40, width: "100%" }}
          type="tel"
          className="form-control"
        /> */}

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
        <Form.Item label="জন্ম তারিখ" name="applicant_date_of_birth">
          <DatePicker className="form-control" style={{ width: "100%" }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="ছবি"
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
        <Form.Item label="ধর্ম" name="applicant_religion">
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
