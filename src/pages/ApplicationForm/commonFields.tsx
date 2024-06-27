import { Form, Input, Button, Select, DatePicker, Upload } from 'antd';

const { Option } = Select;
const commonFields = () => {
  return (
    <>
      <div className="col-md-4">
        <Form.Item
          label="আবেদনকারীর নাম"
          name="applicantName"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input
            style={{ height: 40, width: '100%' }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="লিঙ্গ" name="gender">
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
        <Form.Item label="পিতা/স্বামীর নাম" name="fatherHusbandName">
          <Input
            style={{ height: 40, width: '100%' }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="মাতার নাম" name="motherName">
          <Input
            style={{ height: 40, width: '100%' }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="জাতীয় পরিচয়পত্র নং" name="nationalID">
          <Input
            style={{ height: 40, width: '100%' }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="জন্ম নিবন্ধন নং" name="birthRegistration">
          <Input
            style={{ height: 40, width: '100%' }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="হোল্ডিং নং" name="holdingNumber">
          <Input
            style={{ height: 40, width: '100%' }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="জন্ম তারিখ" name="birthDate">
          <DatePicker className="form-control" style={{ width: '100%' }} />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item label="ছবি" name="photo">
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
