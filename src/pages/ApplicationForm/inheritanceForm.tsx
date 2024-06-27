import { Form, Input, Select } from 'antd';
const { Option } = Select;

const inheritanceForm = () => {
  return (
    <div className="row mx-auto">
      <div className="col-md-4">
        {' '}
        <Form.Item
          label="মৃত ব্যাক্তির নাম"
          name="deceased_name"
          rules={[{ required: true, message: 'এই তথ্যটি প্রয়োজন' }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {' '}
        <Form.Item
          label="লিঙ্গ"
          name="gender"
          rules={[{ required: true, message: 'এই তথ্যটি প্রয়োজন' }]}
        >
          <Select placeholder="লিঙ্গ " style={{ height: 40 }}>
            <Option value="male">পুরুষ</Option>
            <Option value="female">মহিলা</Option>
          </Select>
        </Form.Item>
      </div>

      <div className="col-md-4">
        {' '}
        <Form.Item
          label="ধর্ম"
          name="religion"
          rules={[{ required: true, message: 'এই তথ্যটি প্রয়োজন' }]}
        >
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
        {' '}
        <Form.Item
          label="পিতা/স্বামীর নাম"
          name="father_or_husband_name"
          rules={[{ required: true, message: 'এই তথ্যটি প্রয়োজন' }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {' '}
        <Form.Item
          label="মাতার নাম"
          name="mother_name"
          rules={[{ required: true, message: 'এই তথ্যটি প্রয়োজন' }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {' '}
        <Form.Item
          label="গ্রাম"
          name="village"
          rules={[{ required: true, message: 'এই তথ্যটি প্রয়োজন' }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {' '}
        <Form.Item
          label="ওয়ার্ড নং"
          name="ward_no"
          rules={[{ required: true, message: 'এই তথ্যটি প্রয়োজন' }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {' '}
        <Form.Item
          label="ডাকঘর"
          name="post_office"
          rules={[{ required: true, message: 'এই তথ্যটি প্রয়োজন' }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {' '}
        <Form.Item
          label="উপজেলা"
          name="upazila"
          rules={[{ required: true, message: 'এই তথ্যটি প্রয়োজন' }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {' '}
        <Form.Item
          label="জেলা"
          name="district"
          rules={[{ required: true, message: 'এই তথ্যটি প্রয়োজন' }]}
        >
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        {' '}
        <Form.Item
          label="বাসিন্দার ধরণ"
          name="resident_type"
          rules={[{ required: true, message: 'এই তথ্যটি প্রয়োজন' }]}
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
