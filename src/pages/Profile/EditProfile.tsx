import { Form, Input, Checkbox, message } from 'antd';
import { renderRefugeeFields } from './Fields/renderRefugeeFields';
import { renderStudentFields } from './Fields/renderStudentFields';

import { TypeDataForm } from '@/types';
import { renderCommonFields } from './Fields/renderCommonFields';
import { callApi } from '@/utilities/functions';
import UseProfileData from '@/hooks/UseProfileData';
import Loader from '@/components/reusable/Loader';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

const EditProfile = (): JSX.Element | null => {
  const { user, loading } = UseProfileData();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values: TypeDataForm) => {
    setLoader(true);
    if (values.perjury_declaration && values.terms_agreement) {
      const updatedValues = {
        ...values,
        perjury_declaration: 'yes',
        terms_agreement: 'yes',
      };

      console.log(updatedValues);
      const res = await callApi(
        'POST',
        `/api/user/update/${user?.id}`,
        updatedValues
      );
      if (res.status == 200) {
        setLoader(false);
        navigate('/profile');
        message.success('profile Update Successfully');
      } else {
        message.error('User Update failed');
        setLoader(false);
      }
    } else {
      message.error('User Update failed');
      console.log('error');
      setLoader(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    navigate('/login');
    return null;
  }
  return (
    <div className=" py-5 " style={{ background: '#f4f5f7' }}>
      <Form
        layout="vertical"
        onFinish={onFinish}
        className="p-4 shadow rounded container edit_pro"
      >
        <div className="row mx-auto">
          {renderCommonFields(user)}
          {user.category === 'Student' && renderStudentFields(user)}
          {user.category === 'Refugee' && renderRefugeeFields()}

          <div className="col-md-6">
            <Form.Item
              initialValue={user.reference1_name}
              label="Reference 1 Name"
              name="reference1_name"
            >
              <Input
                className="input_bor_edit"
                placeholder="Enter reference 1 name"
                style={{ height: 45, width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              initialValue={user.reference1_address}
              label="Reference 1 Address"
              name="reference1_address"
            >
              <Input
                className="input_bor_edit"
                placeholder="Enter reference 1 address"
                style={{ height: 45, width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              initialValue={user.reference1_phone}
              label="Reference 1 Phone Number"
              name="reference1_phone"
            >
              <Input
                type="number"
                className="input_bor_edit"
                placeholder="Enter reference 1 phone number"
                style={{ height: 45, width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              initialValue={user.reference1_email}
              label="Reference 1 Email"
              name="reference1_email"
            >
              <Input
                type="email"
                className="input_bor_edit"
                placeholder="Enter reference 1 email"
                style={{ height: 45, width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              initialValue={user.reference1_relationship}
              label="Reference 1 Relationship"
              name="reference1_relationship"
            >
              <Input
                className="input_bor_edit"
                placeholder="Enter reference 1 relationship"
                style={{ height: 45, width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              initialValue={user.reference2_name}
              label="Reference 2 Name"
              name="reference2_name"
            >
              <Input
                className="input_bor_edit"
                placeholder="Enter reference 2 name"
                style={{ height: 45, width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              label="Reference 2 Address"
              initialValue={user.reference2_address}
              name="reference2_address"
            >
              <Input
                className="input_bor_edit"
                placeholder="Enter reference 2 address"
                style={{ height: 45, width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              initialValue={user.reference2_phone}
              label="Reference 2 Phone Number"
              name="reference2_phone"
            >
              <Input
                type="number"
                className="input_bor_edit"
                placeholder="Enter reference 2 phone number"
                style={{ height: 45, width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              initialValue={user.reference2_email}
              label="Reference 2 Email"
              name="reference2_email"
            >
              <Input
                type="email"
                className="input_bor_edit"
                placeholder="Enter reference 2 email"
                style={{ height: 45, width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              initialValue={user.reference2_relationship}
              label="Reference 2 Relationship"
              name="reference2_relationship"
            >
              <Input
                className="input_bor_edit"
                placeholder="Enter reference 2 relationship"
                style={{ height: 45, width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              initialValue={user.situation}
              label="Describe your situation in minimum 200 hundred Words: "
              name="situation"
            >
              <Input.TextArea
                className="input_bor_edit"
                placeholder="Enter current situation"
                style={{ height: 100, width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              initialValue={user.application_preparer_name}
              label="Application preparer name (If other than applicant)"
              name="application_preparer_name"
            >
              <Input
                className="input_bor_edit"
                placeholder="Enter application preparer name"
                style={{ height: 45, width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              initialValue={user.preparer_address}
              label="Address"
              name="preparer_address"
            >
              <Input
                className="input_bor_edit"
                placeholder="Enter preparer address"
                style={{ height: 45, width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              initialValue={user.preparer_email}
              label="Email"
              name="preparer_email"
            >
              <Input
                className="input_bor_edit"
                placeholder="Enter preparer email"
                style={{ height: 45, width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              initialValue={user.preparer_phone}
              label="Phone Number"
              name="preparer_phone"
            >
              <Input
                type="number"
                className="input_bor_edit"
                placeholder="Enter preparer phone number"
                style={{ height: 45, width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item name="perjury_declaration" valuePropName="checked">
              <Checkbox required className="fs-3">
                I swear under penalty of perjury that the above information is
                true and accurate.
              </Checkbox>
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item required name="terms_agreement" valuePropName="checked">
              <Checkbox className="fs-3">
                I agree with the terms and conditions and privacy policy of
                Mustafiz Foundation Inc.
              </Checkbox>
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              initialValue={user.applicant_signature}
              label="Sign Your Name"
              name="applicant_signature"
            >
              <Input
                className="input_bor_edit"
                placeholder="Enter your name"
                style={{ height: 45, width: '100%' }}
              />
            </Form.Item>
          </div>

          <Form.Item key="submit-button">
            <button
              type="submit"
              className="btn btn-get-started"
              style={{ width: '215px' }}
            >
              {' '}
              {loader ? <Spinner /> : ' Submit & Apply'}
            </button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EditProfile;
