import { Form, Input, Select } from "antd";
const { Option } = Select;
const tradeLicenseForm = () => {
  return (
    <>
      <div className="col-md-4">
        <Form.Item
          label="প্রতিষ্ঠানের মালিকানার ধরণ *"
          name="applicant_owner_type"
          rules={[{ required: true, message: "Please select ownership type" }]}
        >
          <Select
            style={{ height: 40, width: "100%" }}
            placeholder="নির্বাচন করুন"
          >
            <Option value="individual">ব্যক্তি মালিকানাধীন</Option>
            <Option value="joint">যৌথ মালিকানা</Option>
            <Option value="company">কোম্পানী</Option>
          </Select>
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="প্রতিষ্ঠানের নাম"
          name="applicant_name_of_the_organization"
        >
          <Input style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="প্রতিষ্ঠানের ঠিকানা" name="organization_address">
          <Input style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="পেশা" name="applicant_occupation">
          <Input style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="ভ্যাট আইডি (যদি থাকে)" name="applicant_vat_id_number">
          <Input style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="ট্যাক্স আইডি (যদি থাকে)"
          name="applicant_tax_id_number"
        >
          <Input style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="ব্যবসা, বৃত্তি, পেশা, বা শিল্প প্রতিষ্ঠানের শ্রেণী"
          name="applicant_type_of_businessKhat"
          rules={[
            { required: true, message: "Please select business category" },
          ]}
        >
          <Select
            style={{ height: 40, width: "100%" }}
            placeholder="নির্বাচন করুন"
          >
            <Option value="101">গুদাম (লিমিটেড কোম্পানী ব্যতীত)</Option>
          </Select>
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="মূলধন/ব্যবসার ধরন"
          name="applicant_type_of_businessKhatAmount"
          rules={[{ required: true, message: "Please select investment type" }]}
        >
          <Select
            style={{ height: 40, width: "100%" }}
            placeholder="নির্বাচন করুন"
          >
            <Option value="10000-20000">১০০০০-২০০০০</Option>
            <Option value="20000-30000">২০০০০-৩০০০০</Option>
          </Select>
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="বকেয়া" name="last_years_money">
          <Input style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="ব্যবসার বিবরণ"
          name="applicant_type_of_business"
          rules={[
            { required: true, message: "Please enter business description" },
          ]}
        >
          <Input style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="অর্থ বছর"
          name="orthoBchor"
          rules={[{ required: true, message: "Please select financial year" }]}
        >
          <Select
            style={{ height: 40, width: "100%" }}
            placeholder="অর্থ বছর নির্বাচন করুন"
          >
            <Option value="2023-24">২০২৩-২৪</Option>
          </Select>
        </Form.Item>
      </div>
    </>
  );
};

export default tradeLicenseForm;
