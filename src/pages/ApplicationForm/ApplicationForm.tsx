/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, Select, DatePicker, Upload, message } from 'antd';
import addressFields from './addressFields';
import attachmentForm from './attachmentForm';

import FormHeader from './FormHeader';
const { Option } = Select;

const ApplicationForm = () => {
  const onFinish = async (values: any) => {
    console.log(values);
    message.success('Form submitted successfully');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Form submission failed');
  };

  return (
    <div className="container">
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <FormHeader />
        <div className="form-pannel">
          <Form.Item name="hidden" initialValue="tepriganj" hidden>
            <Input style={{ height: 40, width: '100%' }} type="hidden" />
          </Form.Item>
          <div className="row">
            <div className="col-md-12">
              <div className="app-heading">আবেদনকারীর তথ্য</div>
            </div>
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
                <Select style={{ height: 40, width: '100%' }} className="">
                  <Option value="">লিঙ্গ নির্বাচন করুন</Option>
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
                <DatePicker
                  className="form-control"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
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

            <div className="col-md-4">
              <Form.Item label="বাসিন্দার ধরণ" name="residentType">
                <Select style={{ height: 40, width: '100%' }} className="">
                  <Option value="">নির্বাচন করুন</Option>
                  <Option value="permanent">স্থায়ী</Option>
                  <Option value="temporary">অস্থায়ী</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="মোবাইল"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your mobile number',
                  },
                  {
                    min: 11,
                    max: 11,
                    message: 'Mobile number must be 11 digits',
                  },
                ]}
              >
                <Input
                  style={{ height: 40, width: '100%' }}
                  type="tel"
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="ই-মেইল" name="email">
                <Input
                  style={{ height: 40, width: '100%' }}
                  type="email"
                  className="form-control"
                />
              </Form.Item>
            </div>
          </div>
          {addressFields()}
          {attachmentForm()}
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              সাবমিট
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ApplicationForm;
