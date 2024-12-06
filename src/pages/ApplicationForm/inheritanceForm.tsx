import { Form, Input, Select } from "antd";
const { Option } = Select;

const inheritanceForm = (service: string) => {
  return (
    <div className="row mx-auto">
      <div className="col-md-4">
        {" "}
        <Form.Item
          label={`${
            service == "উত্তরাধিকারী সনদ" ? "জীবিত " : "মৃত"
          } ব্যাক্তির নাম`}
          name="utname"
          rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="লিঙ্গ"
          name="ut_gender"
          rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Select placeholder="লিঙ্গ " style={{ height: 40 }}>
            <Option value="male">পুরুষ</Option>
            <Option value="female">মহিলা</Option>
          </Select>
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item label="ধর্ম" name="applicant_religion">
          <Select style={{ height: 40 }}>
            <Option value="islam">ইসলাম</Option>
            <Option value="hindu">হিন্দু</Option>
            <Option value="christian">খ্রিস্টান</Option>
            <Option value="buddhist">বৌদ্ধ</Option>
            <Option value="other">অন্যান্য</Option>
          </Select>
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="পিতা/স্বামীর নাম"
          name="ut_father_name"
          rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="মাতার নাম"
          name="ut_mother_name"
          rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="গ্রাম"
          name="ut_grame"
          rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="ওয়ার্ড নং"
          name="ut_word"
          rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="ডাকঘর"
          name="ut_post"
          rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="উপজেলা"
          name="ut_thana"
          rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="জেলা"
          name="ut_district"
          rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="বাসিন্দার ধরণ"
          name="applicant_resident_status"
          rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Select style={{ height: 40 }}>
            <Option value="">নির্বাচন করুন</Option>
            <Option value="permanent">স্থায়ী</Option>
            <Option value="temporary">অস্থায়ী</Option>
          </Select>
        </Form.Item>
      </div>
    </div>
  );
};

export default inheritanceForm;
