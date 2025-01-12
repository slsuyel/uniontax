import { Form, Input, Select } from "antd";
const { Option } = Select;

const inheritanceForm = (service: string) => {
  return (
    <div className="row mx-auto">
      <div className="col-md-4">
        {" "}
        <Form.Item
          label={`${service === "উত্তরাধিকারী সনদ"
              ? "জীবিত ব্যাক্তির"
              : service === "বিবিধ প্রত্যয়নপত্র"
                ? "সনদ ধারীর"
                : service === "একই নামের প্রত্যয়ন"
                  ? "সনদ ধারীর"
                  : "মৃত ব্যাক্তির"
            } নাম`}
          name="utname"
          rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      {service == "একই নামের প্রত্যয়ন" && (
        <div className="col-md-4">
          {" "}
          <Form.Item
            label="সনদ ধারীর দ্বিতীয় নাম"
            name="applicant_second_name"
          // rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
          >
            <Input style={{ height: 40 }} />
          </Form.Item>
        </div>
      )}

      {service == "বিবিধ প্রত্যয়নপত্র" && (
        <div className="col-md-4">
          {" "}
          <Form.Item label="জীবিত/মৃত" name="alive_status">
            <Select placeholder="লিঙ্গ " style={{ height: 40 }}>
              <Option value="1">জীবিত</Option>
              <Option value="0">মৃত</Option>
            </Select>
          </Form.Item>
        </div>
      )}

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="লিঙ্গ"
          name="ut_gender"
        // rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Select placeholder="লিঙ্গ " style={{ height: 40 }}>
            <Option value="male">পুরুষ</Option>
            <Option value="female">মহিলা</Option>
          </Select>
        </Form.Item>
      </div>


      <div className="col-md-4">
        {" "}
        <Form.Item label="ধর্ম" name="ut_religion">
          <Select placeholder='ধর্ম' style={{ height: 40 }}>
            <Option value="ইসলাম">ইসলাম</Option>
            <Option value="হিন্দু">হিন্দু</Option>
            <Option value="খ্রিস্টান">খ্রিস্টান</Option>
            <Option value="বৌদ্ধ">বৌদ্ধ</Option>
            <Option value="অন্যান্য">অন্যান্য</Option>
          </Select>
        </Form.Item>
      </div>
    

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="পিতা/স্বামীর নাম"
          name="ut_father_name"
        // rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="মাতার নাম"
          name="ut_mother_name"
        // rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="গ্রাম"
          name="ut_grame"
        // rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="ওয়ার্ড নং"
          name="ut_word"
        // rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="ডাকঘর"
          name="ut_post"
        // rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="উপজেলা"
          name="ut_thana"
        // rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="জেলা"
          name="ut_district"
        // rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {" "}
        <Form.Item
          label="বাসিন্দার ধরণ"
          name="applicant_resident_status"
        // rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
        >
          <Select style={{ height: 40 }}>
            <Option value="">নির্বাচন করুন</Option>
            <Option value="স্থায়ী">স্থায়ী</Option>
            <Option value="অস্থায়ী">অস্থায়ী</Option>
          </Select>
        </Form.Item>
      </div>
    </div>
  );
};

export default inheritanceForm;
