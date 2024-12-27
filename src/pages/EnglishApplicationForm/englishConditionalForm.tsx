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
                "Mobile",
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
                "Email",
                "applicant_email",
                <Input
                    style={{ height: 40, width: "100%" }}
                    type="email"
                    className="form-control"
                />
            )}

            {renderDynamicFormItem(
                "Resident Status",
                "applicant_resident_status",
                <Select
                    placeholder="Select Resident Status"
                    style={{ height: 40, width: "100%" }}
                    className=""
                >
                    <Option value="Permanent">Permanent</Option>
                    <Option value="Temporary">Temporary</Option>
                </Select>
            )}

            {service == "বিবিধ প্রত্যয়নপত্র" || service === "অনাপত্তি সনদপত্র"
                ? renderDynamicFormItem(
                    "Provide details of the applied certificate",
                    "prottoyon",
                    <TextArea style={{ height: 80 }} />
                )
                : null}

            {service == "পারিবারিক সনদ" &&
                renderDynamicFormItem(
                    "Family Name",
                    "family_name",
                    <Input style={{ height: 40 }} />
                )}

            {service == "বার্ষিক আয়ের প্রত্যয়ন" &&
                renderDynamicFormItem(
                    "Annual Income",
                    "Annual_income",
                    <Input style={{ height: 40 }} />
                )}

            {service == "প্রতিবন্ধী সনদপত্র" &&
                renderDynamicFormItem(
                    "Disability",
                    "disabled",
                    <Select style={{ height: 40 }} placeholder="Select">
                        <Option value="physical">Physical</Option>
                        <Option value="vision">Vision</Option>
                        <Option value="hearing">Hearing</Option>
                        <Option value="speech">Speech</Option>
                        <Option value="intellectual">Intellectual</Option>
                        <Option value="multiple">Multiple</Option>
                        <Option value="mental">Mental</Option>
                    </Select>
                )}
        </>
    );
};

export default englishConditionalForm;