import { Form, Input, Select } from 'antd';
const { Option } = Select;
const sameNameForm = () => {
  return (
    <>
      <div className="col-md-4">
        <Form.Item label="সনদ ধারীর নাম" name="applicant_name">
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item label="সনদ ধারীর দ্বিতীয় নাম" name="applicant_second_name">
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item label="লিঙ্গ" name="gender">
          <Select style={{ height: 40, width: '100%' }}>
            <Option value="male">পুরুষ</Option>
            <Option value="female">মহিলা</Option>
          </Select>
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item label="ধর্ম" name="religion">
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item label="পিতা/স্বামীর নাম" name="father_or_husband_name">
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item label="মাতার নাম" name="mother_name">
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item label="গ্রাম" name="village">
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item label="ওয়ার্ড নং" name="ward_number">
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item label="ডাকঘর" name="post_office">
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item label="উপজেলা" name="upazila">
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item label="জেলা" name="district">
          <Input style={{ height: 40 }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item label="বাসিন্দার ধরণ" name="s_resident_type">
          <Select
            placeholder="নির্বাচন করুন"
            style={{ height: 40, width: '100%' }}
            className=""
          >
            <Option value="permanent">স্থায়ী</Option>
            <Option value="temporary">অস্থায়ী</Option>
          </Select>
        </Form.Item>
      </div>
    </>
  );
};

export default sameNameForm;
