import { Form, Input, Button, Select, DatePicker, Upload } from 'antd';

const { Option } = Select;
const commonFields = () => {
  return (
    <>
      <div className="col-md-4">
        <Form.Item
          label="আবেদনকারীর নাম"
          name="applicant_name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input
            style={{ height: 40, width: '100%' }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="লিঙ্গ" name="applicant_gender">
          <Select
            placeholder="লিঙ্গ নির্বাচন করুন"
            style={{ height: 40, width: '100%' }}
            className=""
          >
            <Option value="male">পুরুষ</Option>
            <Option value="female">মহিলা</Option>
          </Select>
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="পিতা/স্বামীর নাম" name="applicant_father_name">
          <Input
            style={{ height: 40, width: '100%' }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="মাতার নাম" name="applicant_mother_name">
          <Input
            style={{ height: 40, width: '100%' }}
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
            style={{ height: 40, width: '100%' }}
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
            style={{ height: 40, width: '100%' }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="হোল্ডিং নং" name="applicant_holding_tax_number">
          <Input
            style={{ height: 40, width: '100%' }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="জন্ম তারিখ" name="applicant_date_of_birth">
          <DatePicker className="form-control" style={{ width: '100%' }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item label="ছবি" name="image">
          <Upload
            style={{ height: 40, width: '100%' }}
            accept="image/*"
            listType="picture"
            maxCount={1}
            className="custom-file-input"
          >
            <Button>Choose file</Button>
          </Upload>
        </Form.Item>
      </div>
    </>
  );
};

export default commonFields;
