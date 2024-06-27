import { useState } from 'react';
import { Form, Upload, Select, Button } from 'antd';
const { Option } = Select;

const AttachmentForm = () => {
  const [attachmentType, setAttachmentType] = useState('nationalId');

  const handleAttachmentTypeChange = (value: React.SetStateAction<string>) => {
    setAttachmentType(value);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="app-heading">সংযুক্ত</div>
        </div>
        <div className="col-md-12 row mb-3">
          <div className="col-md-4">
            <Form.Item
              initialValue="nationalId"
              name="attachmentType"
              label="সংযুক্তির ধরণ"
              // rules={[
              //   {
              //     required: true,
              //     message: 'সংযুক্তির ধরণ নির্বাচন করুন!',
              //   },
              // ]}
            >
              <Select
                placeholder="নির্বাচন করুন"
                onChange={handleAttachmentTypeChange}
              >
                <Option value="nationalId">জাতীয় পরিচয়পত্র</Option>
                <Option value="birthCertificate">জন্ম নিবন্ধন</Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        {attachmentType === 'nationalId' && (
          <>
            <div className="col-md-4">
              <Form.Item
                name="applicant_national_id_front_attachment"
                label="আগের পাতা (জাতীয় পরিচয়পত্র)"
                // rules={[
                //   {
                //     required: true,
                //     message: 'আগের পাতা ফাইল আপলোড করুন!',
                //   },
                // ]}
              >
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
              <Form.Item
                name="applicant_national_id_back_attachment"
                label="পেছনের পাতা (জাতীয় পরিচয়পত্র)"
                // rules={[
                //   {
                //     required: true,
                //     message: 'পেছনের পাতা ফাইল আপলোড করুন!',
                //   },
                // ]}
              >
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
        )}
        {attachmentType === 'birthCertificate' && (
          <>
            <div className="col-md-4">
              <Form.Item
                name="applicant_birth_certificate_attachment"
                label="জন্ম নিবন্ধন"
                rules={[
                  {
                    required: true,
                    message: 'জন্ম নিবন্ধন ফাইল আপলোড করুন!',
                  },
                ]}
              >
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
        )}
      </div>
    </>
  );
};

export default AttachmentForm;
