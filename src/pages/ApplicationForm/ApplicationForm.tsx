/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, message } from 'antd';
import addressFields from './addressFields';
import attachmentForm from './attachmentForm';
import useSelectedServices from '@/hooks/useSelectedServices';
import tradeLicenseForm from './tradeLicenseForm';
import InheritanceForm from './inheritanceForm';
import commonFields from './commonFields';
import inheritanceList from './inheritanceList';
import { useState } from 'react';
import conditionalForm from './conditionalForm';
import sameNameForm from './sameNameForm';
import FormValueModal from '@/components/ui/FormValueModal';
import { useLocation } from 'react-router-dom';

const ApplicationForm = () => {
  const selectedService = useSelectedServices();
  const location = useLocation();
  const pathname = location.pathname;
  const isDashboard = pathname.includes('dashboard');
  const [inherList, setInherList] = useState(1);
  const [userDta, setUserData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const onFinish = async (values: any) => {
    setUserData(values);
    if (isDashboard) {
      console.log(values);
      message.success('Form submitted successfully');
    } else setModalVisible(true);
    message.success('Form submitted successfully');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Form submission failed');
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className={`${!isDashboard ? 'container my-3' : ''} `}>
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
          <Form.Item name="unioun_name" initialValue="tepriganj" hidden>
            <Input style={{ height: 40, width: '100%' }} type="hidden" />
          </Form.Item>
          <div className="row">
            {selectedService?.link == 'Certificate_of_Inheritance' &&
              InheritanceForm(selectedService)}
            {selectedService?.link == 'Inheritance_certificate' &&
              InheritanceForm(selectedService)}
            {selectedService?.link == 'Certification_of_the_same_name' &&
              sameNameForm()}

            <div className="col-md-12">
              <div className="app-heading">আবেদনকারীর তথ্য</div>
            </div>

            {commonFields()}

            {selectedService?.link == 'Trade_license' && tradeLicenseForm()}

            {conditionalForm(selectedService)}
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

      <FormValueModal
        visible={modalVisible}
        data={userDta}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ApplicationForm;
