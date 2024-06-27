import { Button, DatePicker, Form, Input, Select } from 'antd';

const { Option } = Select;

const inheritanceList = () => {
  return (
    <div className="">
      <div className="app-heading">ওয়ারিশগণের তালিকা</div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>নাম</th>
              <th>সম্পর্ক</th>
              <th>জন্ম তারিখ</th>
              <th>জাতীয় পরিচয়পত্র/জন্মনিবন্ধন নম্বর</th>
              <th>
                <button type="button" className="btn btn-info">
                  যোগ করুন
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Item
                  label="নাম"
                  name="inheritance_name"
                  rules={[{ required: true, message: 'এই তথ্যটি প্রয়োজন' }]}
                >
                  <Input />
                </Form.Item>
              </td>
              <td>
                <Form.Item
                  label="সম্পর্ক"
                  name="inheritance_relation"
                  rules={[{ required: true, message: 'এই তথ্যটি প্রয়োজন' }]}
                >
                  <Select placeholder="সম্পর্ক নির্বাচন করুন">
                    <Option value="স্ত্রী">স্ত্রী</Option>
                    <Option value="পুত্র">পুত্র</Option>
                  </Select>
                </Form.Item>
              </td>
              <td>
                <Form.Item label="জন্ম তারিখ" name="inheritance_dob">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </td>
              <td>
                <Form.Item
                  label="জাতীয় পরিচয়পত্র নাম্বার/জন্মনিবন্ধন নাম্বার"
                  name="inheritance_nid"
                  rules={[{ required: true, message: 'এই তথ্যটি প্রয়োজন' }]}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="">
                <label className="d-block mb-2">Action</label>
                <Button danger>মুছন</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default inheritanceList;
