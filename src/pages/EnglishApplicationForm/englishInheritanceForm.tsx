import { Form, Input, Select } from "antd";
const { Option } = Select;

const englishInheritanceForm = (service: string) => {
    return (
        <div className="row mx-auto">
            <div className="col-md-4">
                {" "}
                <Form.Item
                    label={`${service === "উত্তরাধিকারী সনদ"
                        ? "Living Person's"
                        : service === "বিবিধ প্রত্যয়নপত্র"
                            ? "Certificate Holder's"
                            : service === "একই নামের প্রত্যয়ন"
                                ? "Certificate Holder's"
                                : "Deceased Person's"
                        } Name`}
                    name="utname"
                    rules={[{ required: true, message: "This information is required" }]}
                >
                    <Input style={{ height: 40 }} />
                </Form.Item>
            </div>

            {service == "একই নামের প্রত্যয়ন" && (
                <div className="col-md-4">
                    {" "}
                    <Form.Item
                        label="Certificate Holder's Second Name"
                        name="applicant_second_name"
                    // rules={[{ required: true, message: "This information is required" }]}
                    >
                        <Input style={{ height: 40 }} />
                    </Form.Item>
                </div>
            )}

            {service == "বিবিধ প্রত্যয়নপত্র" && (
                <div className="col-md-4">
                    {" "}
                    <Form.Item label="Living/Deceased" name="alive_status">
                        <Select placeholder="Select Status" style={{ height: 40 }}>
                            <Option value="1">Living</Option>
                            <Option value="0">Deceased</Option>
                        </Select>
                    </Form.Item>
                </div>
            )}

            <div className="col-md-4">
                {" "}
                <Form.Item
                    label="Gender"
                    name="ut_gender"
                // rules={[{ required: true, message: "This information is required" }]}
                >
                    <Select placeholder="Select Gender" style={{ height: 40 }}>
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                    </Select>
                </Form.Item>
            </div>

            <div className="col-md-4">
                {" "}
                <Form.Item label="Religion" name="applicant_religion">
                    <Select style={{ height: 40 }}>
                        <Option value="islam">Islam</Option>
                        <Option value="hindu">Hindu</Option>
                        <Option value="christian">Christian</Option>
                        <Option value="buddhist">Buddhist</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>
            </div>

            <div className="col-md-4">
                {" "}
                <Form.Item
                    label="Father's/Husband's Name"
                    name="ut_father_name"
                // rules={[{ required: true, message: "This information is required" }]}
                >
                    <Input style={{ height: 40 }} />
                </Form.Item>
            </div>

            <div className="col-md-4">
                {" "}
                <Form.Item
                    label="Mother's Name"
                    name="ut_mother_name"
                // rules={[{ required: true, message: "This information is required" }]}
                >
                    <Input style={{ height: 40 }} />
                </Form.Item>
            </div>

            <div className="col-md-4">
                {" "}
                <Form.Item
                    label="Village"
                    name="ut_grame"
                // rules={[{ required: true, message: "This information is required" }]}
                >
                    <Input style={{ height: 40 }} />
                </Form.Item>
            </div>

            <div className="col-md-4">
                {" "}
                <Form.Item
                    label="Ward No"
                    name="ut_word"
                // rules={[{ required: true, message: "This information is required" }]}
                >
                    <Input style={{ height: 40 }} />
                </Form.Item>
            </div>

            <div className="col-md-4">
                {" "}
                <Form.Item
                    label="Post Office"
                    name="ut_post"
                // rules={[{ required: true, message: "This information is required" }]}
                >
                    <Input style={{ height: 40 }} />
                </Form.Item>
            </div>

            <div className="col-md-4">
                {" "}
                <Form.Item
                    label="Upazila"
                    name="ut_thana"
                // rules={[{ required: true, message: "This information is required" }]}
                >
                    <Input style={{ height: 40 }} />
                </Form.Item>
            </div>

            <div className="col-md-4">
                {" "}
                <Form.Item
                    label="District"
                    name="ut_district"
                // rules={[{ required: true, message: "This information is required" }]}
                >
                    <Input style={{ height: 40 }} />
                </Form.Item>
            </div>

            <div className="col-md-4">
                {" "}
                <Form.Item
                    label="Resident Type"
                    name="applicant_resident_status"
                // rules={[{ required: true, message: "This information is required" }]}
                >
                    <Select style={{ height: 40 }}>

                        <Option value="Permanent">Permanent</Option>
                        <Option value="Temporary">Temporary</Option>
                    </Select>
                </Form.Item>
            </div>
        </div>
    );
};

export default englishInheritanceForm;