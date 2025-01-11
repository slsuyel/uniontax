/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Select } from "antd";
const { TextArea } = Input;
const { Option } = Select;

const conditionalForm = (service: any) => {
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
        "মোবাইল",
        "applicant_mobile",
        <Input
          min={11}
          max={11}
          style={{ height: 40, width: "100%" }}
          type="tel"
          className="form-control"
        />
      )} */}

      {renderDynamicFormItem(
        "ই-মেইল",
        "applicant_email",
        <Input
          style={{ height: 40, width: "100%" }}
          type="email"
          className="form-control"
        />
      )}

      {renderDynamicFormItem(
        "বাসিন্দার ধরণ",
        "applicant_resident_status",
        <Select
          placeholder="নির্বাচন করুন"
          style={{ height: 40, width: "100%" }}
          className=""
        >
          <Option value="স্থায়ী">স্থায়ী</Option>
          <Option value="অস্থায়ী">অস্থায়ী</Option>
        </Select>
      )}

      {service == "বিবিধ প্রত্যয়নপত্র" || service === "অনাপত্তি সনদপত্র"
        ? renderDynamicFormItem(
            "আবেদনকৃত প্রত্যয়নের বিবরণ উল্লেখ করুন",
            "prottoyon",
            <TextArea style={{ height: 80 }} />
          )
        : null}

      {service == "পারিবারিক সনদ" &&
        renderDynamicFormItem(
          "বংশের নাম",
          "family_name",
          <Input style={{ height: 40 }} />
        )}
      {service == "বার্ষিক আয়ের প্রত্যয়ন" &&
        renderDynamicFormItem(
          "পেশা",
          "applicant_occupation",
          <Input style={{ height: 40 }} />
        )}
      {/* <div className="col-md-4">
        <Form.Item label="পেশা" name="applicant_occupation">
          <Input style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div> */}
      {service == "বার্ষিক আয়ের প্রত্যয়ন" &&
        renderDynamicFormItem(
          "বার্ষিক আয়",
          "Annual_income",
          <Input style={{ height: 40 }} />
        )}

      {service == "প্রতিবন্ধী সনদপত্র" &&
        renderDynamicFormItem(
          "প্রতিবন্ধী",
          "disabled",
          <Select style={{ height: 40 }} placeholder="নির্বাচন করুন">
            <Option value="physical">শারীরিক (Physical)</Option>
            <Option value="vision">দৃষ্টি (Vision)</Option>
            <Option value="hearing">শ্রবন (Hearing)</Option>
            <Option value="speech">বাক (Speech)</Option>
            <Option value="intellectual">বুদ্ধি (Intellectual)</Option>
            <Option value="multiple">বহুবিধ (Multiple)</Option>
            <Option value="mental">মানসিক (Mental)</Option>
          </Select>
        )}
    </>
  );
};

export default conditionalForm;
