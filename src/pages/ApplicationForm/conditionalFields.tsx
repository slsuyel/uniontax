import { Form, Input, Select } from 'antd';
const { Option } = Select;
const conditionalFields = () => {
  return (
    <>
      <div className="col-md-4">
        <Form.Item
          label="প্রতিষ্ঠানের মালিকানার ধরণ *"
          name="ownershipType"
          rules={[{ required: true, message: 'Please select ownership type' }]}
        >
          <Select placeholder="নির্বাচন করুন">
            <Option value="individual">ব্যক্তি মালিকানাধীন</Option>
            <Option value="joint">যৌথ মালিকানা</Option>
            <Option value="company">কোম্পানী</Option>
          </Select>
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="প্রতিষ্ঠানের নাম" name="companyName">
          <Input />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="প্রতিষ্ঠানের ঠিকানা" name="companyAddress">
          <Input />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="পেশা" name="occupation">
          <Input />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="ভ্যাট আইডি (যদি থাকে)" name="vatId">
          <Input />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="ট্যাক্স আইডি (যদি থাকে)" name="taxId">
          <Input />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="ব্যবসা, বৃত্তি, পেশা, বা শিল্প প্রতিষ্ঠানের শ্রেণী"
          name="businessCategory"
          rules={[
            { required: true, message: 'Please select business category' },
          ]}
        >
          <Select placeholder="নির্বাচন করুন">
            <Option value="101">গুদাম (লিমিটেড কোম্পানী ব্যতীত)</Option>
            <Option value="102">হিমাগার (লিমিটেড কোম্পানী ব্যতীত)</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="মূলধন/ব্যবসার ধরন"
          name="investmentType"
          rules={[{ required: true, message: 'Please select investment type' }]}
        >
          <Select placeholder="নির্বাচন করুন">
            {/* Add options for investment type */}
          </Select>
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="বকেয়া" name="due">
          <Input type="tel" />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="ব্যবসার বিবরণ"
          name="businessDescription"
          rules={[
            { required: true, message: 'Please enter business description' },
          ]}
        >
          <Input />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="অর্থ বছর"
          name="financialYear"
          rules={[{ required: true, message: 'Please select financial year' }]}
        >
          <Select placeholder="অর্থ বছর নির্বাচন করুন">
            <Option value="2023-24">২০২৩-২৪</Option>
            {/* Add more financial years as needed */}
          </Select>
        </Form.Item>
      </div>
    </>
  );
};

export default conditionalFields;
