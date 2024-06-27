import { Form, Select } from 'antd';
const { Option } = Select;
const citizenCertificateForm = () => {
  return (
    <>
      <div className="col-md-4">
        <Form.Item label="বাসিন্দার ধরণ" name="applicant_resident_status">
          <Select style={{ height: 40, width: '100%' }} className="">
            <Option value="">নির্বাচন করুন</Option>
            <Option value="permanent">স্থায়ী</Option>
            <Option value="temporary">অস্থায়ী</Option>
          </Select>
        </Form.Item>
      </div>
    </>
  );
};

export default citizenCertificateForm;
