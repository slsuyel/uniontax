import { Button, DatePicker, Form, Input, Select } from "antd";
import { SetStateAction } from "react";

const { Option } = Select;

const englishInheritanceList = (
    inherList: number,
    setInherList: {
        (value: SetStateAction<number>): void;
        (arg0: (prevState: number) => number): void;
    }
) => {
    const handleAddMore = () => {
        setInherList((prevState: number) => prevState + 1);
    };

    const handleRemove = () => {
        setInherList((prevState: number) =>
            prevState > 1 ? prevState - 1 : prevState
        );
    };

    const newArray = Array.from({ length: inherList }, (_, index) => index);

    return (
        <div>
            <div className="app-heading">List of Heirs</div>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Relationship</th>
                            <th>Date of Birth</th>
                            <th>National ID/Birth Registration Number</th>
                            <th>
                                <button
                                    onClick={handleAddMore}
                                    type="button"
                                    className="btn btn-info"
                                >
                                    Add More
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {newArray.map((index) => (
                            <tr key={index}>
                                <td>
                                    <Form.Item
                                        label="Name"
                                        name={`successor_list[${index}].w_name`}
                                        rules={[{ required: true, message: "This information is required" }]}
                                    >
                                        <Input style={{ height: 40, width: "100%" }} />
                                    </Form.Item>
                                </td>
                                <td>
                                    <Form.Item
                                        label="Relationship"
                                        name={`successor_list[${index}].w_relation`}
                                        rules={[{ required: true, message: "This information is required" }]}
                                    >
                                        <Select
                                            style={{ height: 40, width: "100%" }}
                                            placeholder="Select Relationship"
                                        >
                                            <Option value="Wife">Wife</Option>
                                            <Option value="Son">Son</Option>
                                            <Option value="Daughter">Daughter</Option>
                                        </Select>
                                    </Form.Item>
                                </td>
                                <td>
                                    <Form.Item
                                        label="Date of Birth"
                                        name={`successor_list[${index}].w_dob`}
                                    >
                                        <DatePicker style={{ height: 40, width: "100%" }} />
                                    </Form.Item>
                                </td>
                                <td>
                                    <Form.Item
                                        label="National ID/Birth Registration Number"
                                        name={`successor_list[${index}].w_nid`}
                                        rules={[{ required: true, message: "This information is required" }]}
                                    >
                                        <Input style={{ height: 40, width: "100%" }} />
                                    </Form.Item>
                                </td>
                                <td>
                                    {newArray.length > 1 && (
                                        <Button onClick={handleRemove} danger>
                                            Remove
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default englishInheritanceList;