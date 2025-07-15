/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { setTradeFee } from "@/redux/features/union/unionSlice";
import { Form, Input, InputNumber, Select } from "antd";
import { useState } from "react";
import type { RootState } from "@/redux/features/store"
const { Option } = Select;
export interface TTradeKhat {
  name: string;
  khat_id: string;
  khat_fees: TKhatFee[];
  has_child?: boolean;

}

export interface TKhatFee {
  name: null | string;
  applicant_type_of_businessKhat: string;
  applicant_type_of_businessKhatAmount: string;
  fee: string;

}

const TradeLicenseForm = ({
  data,
  isLoading,
  form,
}: {
  data: any;
  isLoading: boolean;
  form: any;
}) => {
  const [khatAmounts, setKhatAmounts] = useState<TKhatFee[]>([]);
  const [checkChild, setSelectedChild] = useState<any>();
  const dispatch = useAppDispatch();

  const handleBusinessKhatChange = (value: string) => {
    //  khat.applicant_type_of_businessKhatAmount === null
    form.setFieldsValue({
      applicant_type_of_businessKhatAmount: null,
    });

    const selectedD = data?.data?.find((d: TTradeKhat) => d.khat_id === value);
    setKhatAmounts(selectedD.khat_fees);
    setSelectedChild(selectedD);

    if (selectedD.has_child == false) {
      dispatch(setTradeFee(selectedD.khat_fees[0].fee));
      form.setFieldsValue({
        applicant_type_of_businessKhatAmount: 0,
      });
    }

    // console.log(selectedD);
  };

  const handleTradeFees = (value: string) => {
    console.log(value);
    const selectedKhat = khatAmounts.find(
      (khat) => khat.applicant_type_of_businessKhatAmount === value
    );
    console.log(selectedKhat);
    if (selectedKhat) {
      dispatch(setTradeFee(selectedKhat.fee));
    }
  };
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const financialYearStart = currentMonth >= 4 ? currentYear : currentYear - 1;
  const financialYearEnd = financialYearStart + 1;

  const site_settings = useAppSelector((state: RootState) => state.union.site_settings);


  const financialYears = [];
  for (let i = 0; i < 3; i++) {
    const startYear = financialYearStart - i;
    const endYear = financialYearEnd - i;
    financialYears.push(`${startYear}-${endYear.toString().slice(-2)}`);
  }

  return (
    <>
      <div className="col-md-4">
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
      </div>
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
      <div className="col-md-4">
        <Form.Item label="ভ্যাট আইডি (যদি থাকে)" name="applicant_vat_id_number">
          <Input style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="ট্যাক্স আইডি (যদি থাকে)"
          name="applicant_tax_id_number"
        >
          <Input style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="ব্যবসা, বৃত্তি, পেশা, বা শিল্প প্রতিষ্ঠানের শ্রেণী"
          name="applicant_type_of_businessKhat"
          rules={[
            { required: true, message: "Please select business category" },
          ]}
        >
          <Select showSearch
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
      </div>

      {checkChild?.has_child == true && (
        <div className="col-md-4">
          <Form.Item
            label="মূলধন/ব্যবসার ধরন"
            name="applicant_type_of_businessKhatAmount"
            rules={[
              { required: true, message: "Please select investment type" },
            ]}
          >
            <Select showSearch
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
        </div>
      )}


      {site_settings?.union == "false" && (
        <>
          <div className="col-md-4">
            <Form.Item
              label="সাইনবোর্ডের ধরন"
              name="signboard_type"
            // rules={[{ required: true, message: "সাইনবোর্ডের ধরন নির্বাচন করুন" }]}
            >
              <Select
                showSearch
                style={{ height: 40, width: "100%" }}
                placeholder="নির্বাচন করুন"
              >
                <Option value="normal">সাধারন</Option>
                <Option value="digital_led">ডিজিটাল/এলইডি/নিয়ন</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="col-md-4">
            <Form.Item
              label="সাইনবোর্ডের আকার (বর্গফুটে)"
              name="signboard_size_square_fit"
            // rules={[{ required: true, message: "সাইনবোর্ডের আকার লিখুন" }]}
            >
              <Input
                type="number"
                style={{ height: 40, width: "100%" }}
                placeholder="আকার লিখুন"
                min={1}
              />
            </Form.Item>
          </div>

          <div className="col-md-4">
            <Form.Item
              label="চালান ট্র্যাকিং নম্বর"
              name="chalan_traking_no"
            //   rules={[
            // { required: true, message: "চালান ট্র্যাকিং নম্বর লিখুন" },
            //   ]}
            >
              <Input style={{ height: 40, width: "100%" }} />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item
              label="চালান তারিখ (মাস/দিন/বছর)"
              name="chalan_date"
            //   rules={[
            // { required: true, message: "চালান তারিখ নির্বাচন করুন" },
            //   ]}
            >
              <Input type="date" style={{ height: 40, width: "100%" }} />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item
              label="চালান টাকার পরিমাণ"
              name="chalan_amount"
            //   rules={[
            // { required: true, message: "চালান পরিমাণ লিখুন" },
            //   ]}
            >
              <InputNumber min={0} style={{ height: 40, width: "100%" }} />
            </Form.Item>
          </div>





        </>
      )}












      <div className="col-md-4">
        <Form.Item label="বকেয়া" name="last_years_money">
          <InputNumber min={0} style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="ব্যবসার বিবরণ"
          name="applicant_type_of_business"
          rules={[
            { required: true, message: "Please enter business description" },
          ]}
        >
          <Input style={{ height: 40, width: "100%" }} />
        </Form.Item>
      </div>



      <div className="col-md-4">
        <Form.Item
          label="অর্থ বছর"
          name="orthoBchor"
          rules={[{ required: true, message: "Please select financial year" }]}
        >
          <Select
            style={{ height: 40, width: "100%" }}
            placeholder="অর্থ বছর নির্বাচন করুন"
          >
            {financialYears.map((year) => (
              <Option key={year} value={year}>
                {year.replace(/(\d{4})-(\d{2})/, (_, y1, y2) => `${y1}-${y2}`)}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </>
  );
};

export default TradeLicenseForm;


// api.pouroseba.gov.bd/create/payment?sonod_id=27005&s_uri=https://dinajpursadar.pouroseba.gov.bd/payment-success&f_uri=https://dinajpursadar.pouroseba.gov.bd/payment-failed&c_uri=https://dinajpursadar.pouroseba.gov.bd/payment-cancel&hasEnData=&uddoktaId=