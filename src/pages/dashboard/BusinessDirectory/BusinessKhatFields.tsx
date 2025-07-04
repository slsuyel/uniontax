import { Col, Form, Select } from "antd";
import { TTradeKhat, TKhatFee } from "@/pages/ApplicationForm/tradeLicenseForm";

const { Option } = Select;

interface Props {
  tradeInfoData: any;
  selectedKhat: TTradeKhat | null;
  khatAmounts: TKhatFee[];
  handleBusinessKhatChange: (value: string) => void;
  handleTradeFees: (value: string) => void;
  selectStyle?: React.CSSProperties;
}

const BusinessKhatFields = ({
  tradeInfoData,
  selectedKhat,
  khatAmounts,
  handleBusinessKhatChange,
  handleTradeFees,
  selectStyle = {},
}: Props) => {
  return (
    <>
      <Col span={8}>
        <Form.Item
          name="applicant_type_of_businessKhat"
          label="ব্যবসা, বৃত্তি, পেশা, বা শিল্প প্রতিষ্ঠানের শ্রেণী"
          rules={[{ required: true, message: "Please select business category" }]}
        >
          <Select
            showSearch
            placeholder="নির্বাচন করুন"
            optionFilterProp="children"
            style={selectStyle}
            onChange={handleBusinessKhatChange}
          >
            <Option value="">নির্বাচন করুন</Option>
            {tradeInfoData?.map((d: TTradeKhat) => (
              <Option key={d.khat_id} value={String(d.khat_id)}>
                {d.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      {selectedKhat?.has_child && (
        <Col span={8}>
          <Form.Item
            name="applicant_type_of_businessKhatAmount"
            label="মূলধন/ব্যবসার ধরন"
            rules={[{ required: true, message: "Please select investment type" }]}
          >
            <Select
              showSearch
              placeholder="নির্বাচন করুন"
              style={selectStyle}
              onChange={handleTradeFees}
              optionFilterProp="children"
            >
              <Option value="">নির্বাচন করুন</Option>
              {khatAmounts?.map((fee: TKhatFee) => (
                <Option
                  key={fee.name}
                  value={fee.applicant_type_of_businessKhatAmount}
                >
                  {fee.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      )}
    </>
  );
};

export default BusinessKhatFields;
