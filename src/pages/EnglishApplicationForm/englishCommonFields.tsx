import { Form, Input, Select, DatePicker } from "antd";

const { Option } = Select;
const englishCommonFields = () => {
    return (
        <>
            <div className="col-md-4">
                <Form.Item
                    label="Applicant's Name"
                    name="applicant_name"
                    rules={[{ required: true, message: "Please enter your name" }]}
                >
                    <Input
                        style={{ height: 40, width: "100%" }}
                        className="form-control"
                    />
                </Form.Item>
            </div>
            <div className="col-md-4">
                <Form.Item label="Gender" name="applicant_gender">
                    <Select
                        placeholder="Select Gender"
                        style={{ height: 40, width: "100%" }}
                        className=""
                    >
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                    </Select>
                </Form.Item>
            </div>
            <div className="col-md-4">
                <Form.Item label="Father's/Husband's Name" name="applicant_father_name">
                    <Input
                        style={{ height: 40, width: "100%" }}
                        className="form-control"
                    />
                </Form.Item>
            </div>
            <div className="col-md-4">
                <Form.Item label="Mother's Name" name="applicant_mother_name">
                    <Input
                        style={{ height: 40, width: "100%" }}
                        className="form-control"
                    />
                </Form.Item>
            </div>
            <div className="col-md-4">
                <Form.Item
                    label="National ID Number"
                    name="applicant_national_id_number"
                >
                    <Input
                        style={{ height: 40, width: "100%" }}
                        className="form-control"
                    />
                </Form.Item>
            </div>
            <div className="col-md-4">
                <Form.Item
                    label="Birth Certificate Number"
                    name="applicant_birth_certificate_number"
                >
                    <Input
                        style={{ height: 40, width: "100%" }}
                        className="form-control"
                    />
                </Form.Item>
            </div>
            <div className="col-md-4">
                <Form.Item label="Holding Number" name="applicant_holding_tax_number">
                    <Input
                        style={{ height: 40, width: "100%" }}
                        className="form-control"
                    />
                </Form.Item>
            </div>

            <div className="col-md-4">
                <Form.Item
                    rules={[
                        { required: true, message: "Please enter your mobile number" },
                        {
                            len: 11,
                            message: "Mobile number must be 11 digits",
                        },
                        {
                            pattern: /^[0-9]+$/,
                            message: "Mobile number must contain only numbers",
                        },
                    ]}
                    label="Mobile"
                    name="applicant_mobile"
                >
                    <Input
                        style={{ height: 40, width: "100%" }}
                        className="form-control"
                        type="tel"
                    />
                </Form.Item>
            </div>
            <div className="col-md-4">
                <Form.Item label="Date of Birth" name="applicant_date_of_birth">
                    <DatePicker className="form-control" style={{ width: "100%" }} />
                </Form.Item>
            </div>

            <div className="col-md-4">
                <Form.Item label="Photo" name="image">
                    <Input
                        type="file"
                    // onChange={(e) => handleFileChange(e, setBackPreview)}
                    />
                </Form.Item>
            </div>
        </>
    );
};

export default englishCommonFields;