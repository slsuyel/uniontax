/* eslint-disable @typescript-eslint/no-explicit-any */

// import { useAppDispatch } from "@/redux/features/hooks";
// import { setTradeFee } from "@/redux/features/union/unionSlice";
import { Form, Input } from "antd";
// import { useState } from "react";
// const { Option } = Select;
export interface TTradeKhat {
  name: string;
  khat_id: string;
  khat_fees: TKhatFee[];
}

export interface TKhatFee {
  name: null | string;
  applicant_type_of_businessKhat: string;
  applicant_type_of_businessKhatAmount: string;
  fee: string;
}

const EnglishTradeLicenseForm = () => {
  //   const [khatAmounts, setKhatAmounts] = useState<TKhatFee[]>([]);
  //   const dispatch = useAppDispatch();
  //   const handleBusinessKhatChange = (value: string) => {
  //     const selectedD = data?.data?.find((d: TTradeKhat) => d.khat_id === value);
  //     setKhatAmounts(selectedD.khat_fees);
  //   };

  //   const handleTradeFees = (value: string) => {
  //     const selectedKhat = khatAmounts.find(
  //       (khat) => khat.applicant_type_of_businessKhatAmount === value
  //     );
  //     if (selectedKhat) {
  //       dispatch(setTradeFee(selectedKhat.fee));
  //     }
  //   };

  return (
    <>
      {/* <div className="col-md-4">
                <Form.Item
                    label="প্রতিষ্ঠানের মালিকানার ধরণ *"
                    name="applicant_owner_type"
                    rules={[{ required: true, message: "Please select ownership type" }]}
                >
                    <Select
                        style={{ height: 40, width: "100%" }}
                        placeholder="নির্বাচন করুন"
                    >
                        <Option value="ব্যক্তি মালিকানাধীন">ব্যক্তি মালিকানাধীন</Option>
                        <Option value="যৌথ মালিকানা">যৌথ মালিকানা</Option>
                        <Option value="কোম্পানী">কোম্পানী</Option>
                    </Select>
                </Form.Item>
            </div> */}
      <div className="col-md-4">
        <Form.Item
          label="প্রতিষ্ঠানের নাম"
          name="applicant_name_of_the_organization"
        >
          <Input style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="প্রতিষ্ঠানের ঠিকানা" name="organization_address">
          <Input style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="পেশা" name="applicant_occupation">
          <Input style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div>
      {/* <div className="col-md-4">
                <Form.Item label="ভ্যাট আইডি (যদি থাকে)" name="applicant_vat_id_number">
                    <Input style={{ height: 40, width: "100%" }} />
                </Form.Item>
            </div> */}
      {/* <div className="col-md-4">
                <Form.Item
                    label="ট্যাক্স আইডি (যদি থাকে)"
                    name="applicant_tax_id_number"
                >
                    <Input style={{ height: 40, width: "100%" }} />
                </Form.Item>
            </div> */}
      {/* <div className="col-md-4">
        <Form.Item
          label="ব্যবসা, বৃত্তি, পেশা, বা শিল্প প্রতিষ্ঠানের শ্রেণী"
          name="applicant_type_of_businessKhat"
          rules={[
            { required: true, message: "Please select business category" },
          ]}
        >
          <Select
            style={{ height: 40, width: "100%" }}
            placeholder="নির্বাচন করুন"
            onChange={handleBusinessKhatChange}
          >
            {!isLoading &&
              data?.data?.map((d: TTradeKhat) => (
                <Option key={d.khat_id} value={d.khat_id}>
                  {d.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </div> */}
      {/* <div className="col-md-4">
        <Form.Item
          label="মূলধন/ব্যবসার ধরন"
          name="applicant_type_of_businessKhatAmount"
          rules={[{ required: true, message: "Please select investment type" }]}
        >
          <Select
            style={{ height: 40, width: "100%" }}
            placeholder="নির্বাচন করুন"
            onChange={handleTradeFees}
          >
            {khatAmounts.map((khat) => (
              <Option
                key={khat.name}
                value={khat.applicant_type_of_businessKhatAmount}
              >
                {khat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div> */}
      {/* <div className="col-md-4">
        <Form.Item label="বকেয়া" name="last_years_money">
          <Input style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div> */}
      <div className="col-md-4">
        <Form.Item
          label="ব্যবসার বিবরণ (ইংরেজিতে লিখুন)"
          name="applicant_type_of_business"
          rules={[
            { required: true, message: "Please enter business description" },
          ]}
        >
          <Input style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div>
      {/* <div className="col-md-4">
        <Form.Item
          label="অর্থ বছর"
          name="orthoBchor"
          rules={[{ required: true, message: "Please select financial year" }]}
        >
          <Select
            style={{ height: 40, width: "100%" }}
            placeholder="অর্থ বছর নির্বাচন করুন"
          >
            <Option value="2023-24">২০২৩-২৪</Option>
          </Select>
        </Form.Item>
      </div> */}
    </>
  );
};

export default EnglishTradeLicenseForm;
