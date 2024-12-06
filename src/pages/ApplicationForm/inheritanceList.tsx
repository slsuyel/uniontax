import { Button, DatePicker, Form, Input, Select } from "antd";
import { SetStateAction } from "react";

const { Option } = Select;

const inheritanceList = (
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
      <div className="app-heading">ওয়ারিশগণের তালিকা</div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>নাম</th>
              <th>সম্পর্ক</th>
              <th>জন্ম তারিখ</th>
              <th>জাতীয় পরিচয়পত্র/জন্মনিবন্ধন নম্বর</th>
              <th>
                <button
                  onClick={handleAddMore}
                  type="button"
                  className="btn btn-info"
                >
                  যোগ করুন
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {newArray.map((index) => (
              <tr key={index}>
                <td>
                  <Form.Item
                    label="নাম"
                    name={`successor_list[${index}].w_name`}
                    rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
                  >
                    <Input style={{ height: 40, width: "100%" }} />
                  </Form.Item>
                </td>
                <td>
                  <Form.Item
                    label="সম্পর্ক"
                    name={`successor_list[${index}].w_relation`}
                    rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
                  >
                    <Select
                      style={{ height: 40, width: "100%" }}
                      placeholder="সম্পর্ক নির্বাচন করুন"
                    >
                      <Option value="স্ত্রী">স্ত্রী</Option>
                      <Option value="পুত্র">পুত্র</Option>
                      <Option value="কন্যা">কন্যা</Option>
                    </Select>
                  </Form.Item>
                </td>
                <td>
                  <Form.Item
                    label="জন্ম তারিখ"
                    name={`successor_list[${index}].w_dob`}
                  >
                    <DatePicker style={{ height: 40, width: "100%" }} />
                  </Form.Item>
                </td>
                <td>
                  <Form.Item
                    label="জাতীয় পরিচয়পত্র নাম্বার/জন্মনিবন্ধন নাম্বার"
                    name={`successor_list[${index}].w_nid`}
                    rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
                  >
                    <Input style={{ height: 40, width: "100%" }} />
                  </Form.Item>
                </td>
                <td>
                  {newArray.length > 1 && (
                    <Button onClick={handleRemove} danger>
                      মুছন
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

export default inheritanceList;
