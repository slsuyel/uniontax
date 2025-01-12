/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Select } from "antd";
const { TextArea } = Input;
const { Option } = Select;

const englishConditionalForm = (service: any) => {
  const renderDynamicFormItem = (
    label: string,
    name: string,
    component: JSX.Element
  ) => (
    <div className="col-md-4">
      <Form.Item label={label} name={name}>
        {component}
      </Form.Item>
    </div>
  );

  return (
    <>
      {/* {renderDynamicFormItem(
        "ইমেইল (Email)",
        "applicant_email",
        <Input
          style={{ height: 40, width: "100%" }}
          type="email"
          className="form-control"
          placeholder="ইমেইল লিখুন"
        />
      )} */}

      {/* {renderDynamicFormItem(
        "বাসিন্দার অবস্থা (Resident Status)",
        "applicant_resident_status",
        <Select
          placeholder="বাসিন্দার অবস্থা নির্বাচন করুন"
          style={{ height: 40, width: "100%" }}
          className=""
        >
          <Option value="Permanent">স্থায়ী (Permanent)</Option>
          <Option value="Temporary">অস্থায়ী (Temporary)</Option>
        </Select>
      )} */}

      {service == "বিবিধ প্রত্যয়নপত্র" || service === "অনাপত্তি সনদপত্র"
        ? renderDynamicFormItem(
            "আবেদিত সনদের বিবরণ লিখুন (Provide details of the applied certificate)",
            "prottoyon",
            <TextArea style={{ height: 80 }} placeholder="বিবরণ লিখুন" />
          )
        : null}

      {service == "পারিবারিক সনদ" &&
        renderDynamicFormItem(
          "পরিবারের নাম (Family Name)",
          "family_name",
          <Input style={{ height: 40 }} placeholder="পরিবারের নাম লিখুন" />
        )}

      {service == "বার্ষিক আয়ের প্রত্যয়ন" &&
        renderDynamicFormItem(
          "বার্ষিক আয় (Annual Income)",
          "Annual_income",
          <Input style={{ height: 40 }} placeholder="বার্ষিক আয় লিখুন" />
        )}

      {service == "প্রতিবন্ধী সনদপত্র" &&
        renderDynamicFormItem(
          "প্রতিবন্ধিতা (Disability)",
          "disabled",
          <Select
            style={{ height: 40 }}
            placeholder="প্রতিবন্ধিতা নির্বাচন করুন"
          >
            <Option value="physical">শারীরিক (Physical)</Option>
            <Option value="vision">দৃষ্টি (Vision)</Option>
            <Option value="hearing">শ্রবণ (Hearing)</Option>
            <Option value="speech">বাক (Speech)</Option>
            <Option value="intellectual">বুদ্ধিবৃত্তিক (Intellectual)</Option>
            <Option value="multiple">বহুমাত্রিক (Multiple)</Option>
            <Option value="mental">মানসিক (Mental)</Option>
          </Select>
        )}
    </>
  );
};

export default englishConditionalForm;
