import { Form, Input, Select } from "antd";
const { Option } = Select;

const englishInheritanceForm = (service: string) => {
  return (
    <div className="row mx-auto">
      <div className="col-md-4">
        <Form.Item
          label={`${
            service === "উত্তরাধিকারী সনদ"
              ? "জীবিত ব্যক্তির নাম (Living Person's Name)"
              : service === "বিবিধ প্রত্যয়নপত্র"
              ? "সনদধারীর নাম (Certificate Holder's Name)"
              : service === "একই নামের প্রত্যয়ন"
              ? "সনদধারীর নাম (Certificate Holder's Name)"
              : "মৃত ব্যক্তির নাম (Deceased Person's Name)"
          }`}
          name="utname"
          rules={[{ required: true, message: "এই তথ্যটি আবশ্যক" }]}
        >
          <Input style={{ height: 40 }} placeholder="নাম লিখুন" />
        </Form.Item>
      </div>

      {service == "একই নামের প্রত্যয়ন" && (
        <div className="col-md-4">
          <Form.Item
            label="সনদধারীর দ্বিতীয় নাম (Certificate Holder's Second Name)"
            name="applicant_second_name"
            // rules={[{ required: true, message: "এই তথ্যটি আবশ্যক" }]}
          >
            <Input style={{ height: 40 }} placeholder="দ্বিতীয় নাম লিখুন" />
          </Form.Item>
        </div>
      )}

      {service == "বিবিধ প্রত্যয়নপত্র" && (
        <div className="col-md-4">
          <Form.Item label="জীবিত/মৃত (Living/Deceased)" name="alive_status">
            <Select placeholder="অবস্থা নির্বাচন করুন" style={{ height: 40 }}>
              <Option value="1">জীবিত (Living)</Option>
              <Option value="0">মৃত (Deceased)</Option>
            </Select>
          </Form.Item>
        </div>
      )}

      <div className="col-md-4">
        <Form.Item
          label="লিঙ্গ (Gender)"
          name="ut_gender"
          // rules={[{ required: true, message: "এই তথ্যটি আবশ্যক" }]}
        >
          <Select placeholder="লিঙ্গ নির্বাচন করুন" style={{ height: 40 }}>
            <Option value="Male">পুরুষ (Male)</Option>
            <Option value="Female">মহিলা (Female)</Option>
          </Select>
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item label="ধর্ম (Religion)" name="applicant_religion">
          <Select placeholder="ধর্ম নির্বাচন করুন" style={{ height: 40 }}>
            <Option value="Islam">ইসলাম (Islam)</Option>
            <Option value="Hindu">হিন্দু (Hindu)</Option>
            <Option value="Christian">খ্রিস্টান (Christian)</Option>
            <Option value="Buddhist">বৌদ্ধ (Buddhist)</Option>
            <Option value="Other">অন্যান্য (Other)</Option>
          </Select>
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item
          label="পিতার/স্বামীর নাম (Father's/Husband's Name)"
          name="ut_father_name"
          // rules={[{ required: true, message: "এই তথ্যটি আবশ্যক" }]}
        >
          <Input style={{ height: 40 }} placeholder="নাম লিখুন" />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item
          label="মাতার নাম (Mother's Name)"
          name="ut_mother_name"
          // rules={[{ required: true, message: "এই তথ্যটি আবশ্যক" }]}
        >
          <Input style={{ height: 40 }} placeholder="নাম লিখুন" />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item
          label="গ্রাম (Village)"
          name="ut_grame"
          // rules={[{ required: true, message: "এই তথ্যটি আবশ্যক" }]}
        >
          <Input style={{ height: 40 }} placeholder="গ্রামের নাম লিখুন" />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item
          label="ওয়ার্ড নম্বর (Ward No)"
          name="ut_word"
          // rules={[{ required: true, message: "এই তথ্যটি আবশ্যক" }]}
        >
          <Input style={{ height: 40 }} placeholder="ওয়ার্ড নম্বর লিখুন" />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item
          label="পোস্ট অফিস (Post Office)"
          name="ut_post"
          // rules={[{ required: true, message: "এই তথ্যটি আবশ্যক" }]}
        >
          <Input style={{ height: 40 }} placeholder="পোস্ট অফিস লিখুন" />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item
          label="উপজেলা (Upazila)"
          name="ut_thana"
          // rules={[{ required: true, message: "এই তথ্যটি আবশ্যক" }]}
        >
          <Input style={{ height: 40 }} placeholder="উপজেলা লিখুন" />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item
          label="জেলা (District)"
          name="ut_district"
          // rules={[{ required: true, message: "এই তথ্যটি আবশ্যক" }]}
        >
          <Input style={{ height: 40 }} placeholder="জেলা লিখুন" />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item
          label="বাসিন্দার অবস্থা (Resident Type)"
          name="applicant_resident_status"
          // rules={[{ required: true, message: "এই তথ্যটি আবশ্যক" }]}
        >
          <Select placeholder="অবস্থা নির্বাচন করুন" style={{ height: 40 }}>
            <Option value="Permanent">স্থায়ী (Permanent)</Option>
            <Option value="Temporary">অস্থায়ী (Temporary)</Option>
          </Select>
        </Form.Item>
      </div>
    </div>
  );
};

export default englishInheritanceForm;
