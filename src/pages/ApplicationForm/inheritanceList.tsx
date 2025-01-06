import React from "react";
import { Button, Form, Input, DatePicker, Select } from "antd";

const InheritanceList: React.FC = () => {
  return (
    <div>
      <div className="app-heading">ওয়ারিশগণের তালিকা</div>

      <Form.List name="successor_list">
        {(fields, { add, remove }) => (
          <div>
            <div className="d-flex justify-content-end my-2">
              <Button
                className="w-auto text-white bg-success"
                type="dashed"
                onClick={() => add()}
                block
              >
                ওয়ারিশ যোগ করুন
              </Button>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>নাম</th>
                    <th>সম্পর্ক</th>
                    <th>জন্ম তারিখ</th>
                    <th>জাতীয় পরিচয়পত্র/জন্মনিবন্ধন নম্বর</th>
                    <th>অপশন</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map(({ key, name, ...restField }) => (
                    <tr key={key}>
                      <td>
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          rules={[{ required: true, message: "নাম প্রয়োজন" }]}
                        >
                          <Input style={{ height: 40 }} placeholder="নাম" />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item
                          {...restField}
                          name={[name, "relation"]}
                          rules={[
                            { required: true, message: "সম্পর্ক প্রয়োজন" },
                          ]}
                        >
                          <Select style={{ height: 40 }} placeholder="সম্পর্ক">
                            <Select.Option value="father">পিতা</Select.Option>
                            <Select.Option value="mother">মাতা</Select.Option>
                            <Select.Option value="sibling">
                              ভাই/বোন
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item
                          {...restField}
                          name={[name, "birth_date"]}
                          rules={[
                            { required: true, message: "জন্ম তারিখ প্রয়োজন" },
                          ]}
                        >
                          <DatePicker style={{ width: "100%", height: 40 }} />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item
                          {...restField}
                          name={[name, "nid"]}
                          rules={[
                            {
                              required: true,
                              message: "জাতীয় পরিচয়পত্র নম্বর প্রয়োজন",
                            },
                          ]}
                        >
                          <Input
                            style={{ height: 40 }}
                            placeholder="NID/জন্মনিবন্ধন নম্বর"
                          />
                        </Form.Item>
                      </td>
                      <td>
                        <Button type="link" danger onClick={() => remove(name)}>
                          মুছুন
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Form.List>
    </div>
  );
};

export default InheritanceList;
