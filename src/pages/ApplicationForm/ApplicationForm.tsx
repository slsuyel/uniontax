/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, message } from 'antd';
import addressFields from './addressFields';
import attachmentForm from './attachmentForm';

import useSelectedServices from '@/hooks/useSelectedServices';

import tradeLicenseForm from './tradeLicenseForm';
import citizenCertificateForm from './citizenCertificateForm';
import InheritanceForm from './inheritanceForm';

import commonFields from './commonFields';
import inheritanceList from './inheritanceList';
import { useState } from 'react';

const ApplicationForm = () => {
  const selectedService = useSelectedServices();
  const [inherList, setInherList] = useState(1);

  const onFinish = async (values: any) => {
    console.log(values);
    message.success('Form submitted successfully');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Form submission failed');
  };

  return (
    <div className="container my-3">
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div
          className="panel-heading"
          style={{
            fontWeight: 'bold',
            fontSize: '20px',
            background: 'rgb(21, 149, 19)',
            textAlign: 'center',
            color: 'white',
          }}
        >
          {selectedService?.title}
        </div>
        <div className="form-pannel">
          <Form.Item name="hidden" initialValue="tepriganj" hidden>
            <Input style={{ height: 40, width: '100%' }} type="hidden" />
          </Form.Item>
          <div className="row">
            {selectedService?.link == 'Certificate_of_Inheritance' &&
              InheritanceForm()}
            <div className="col-md-12">
              <div className="app-heading">আবেদনকারীর তথ্য</div>
            </div>
            {/*  */}
            {commonFields()}
            {selectedService?.link == 'Citizenship_certificate' &&
              citizenCertificateForm()}
            {selectedService?.link == 'Trade_license' && tradeLicenseForm()}

            {/*  */}
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
          {selectedService?.link == 'Certificate_of_Inheritance' &&
            inheritanceList(inherList, setInherList)}
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
