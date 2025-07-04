import { Modal, Form, Input, Select, DatePicker, Button, Row, Col } from "antd";
import { useUpdateBusinessDirectoryMutation } from "@/redux/api/business/businessApi";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { BusinessDirectory } from "./BusinessDirectoryPage";
import { TTradeKhat, TKhatFee } from "@/pages/ApplicationForm/tradeLicenseForm";
import BusinessKhatFields from "./BusinessKhatFields";


interface Props {
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
  form: any;
  business: BusinessDirectory | null;
  tradeInfoData?: TTradeKhat[];
}

const genderOptions = [
  { label: "পুরুষ", value: "পুরুষ" },
  { label: "মহিলা", value: "মহিলা" },
  { label: "অন্যান্য", value: "অন্যান্য" },
];

const statusOptions = [
  { label: "সক্রিয়", value: "active" },
  { label: "নিষ্ক্রিয়", value: "inactive" },
];

const sectionStyle = {
  marginBottom: 24,
  paddingBottom: 12,
};

const headingStyle: React.CSSProperties = {
  textAlign: "center",
  borderBottom: "2px solid #1890ff",
  marginBottom: 16,
  fontWeight: 600,
  fontSize: 25,
  color: "#1890ff",
};

const inputStyle = {
  padding: "8px 10px",
  fontSize: "16px",
  borderColor: "#1890ff",
  borderRadius: 4,
};

const selectStyle = {
  fontSize: "16px",
  height: 40,
  borderColor: "#1890ff",
  borderRadius: 4,
};

const EditBusinessModal = ({ open, onClose, onUpdated, form, business, tradeInfoData }: Props) => {
  const [updateBusiness, { isLoading }] = useUpdateBusinessDirectoryMutation();
  const [khatAmounts, setKhatAmounts] = useState<TKhatFee[]>([]);
  const [selectedKhat, setSelectedKhat] = useState<TTradeKhat | null>(null);

  useEffect(() => {
    if (business && open) {
      const khatId = String(business.applicant_type_of_businessKhat);
      form.setFieldsValue({
        ...business,
        applicant_type_of_businessKhat: khatId,
        applicant_date_of_birth: business.applicant_date_of_birth
          ? dayjs(business.applicant_date_of_birth)
          : null,
      });

      if (khatId) {
        handleBusinessKhatChange(khatId);
      }
    }
  }, [business, open]);

  const handleSubmit = async (values: any) => {
    if (!business) return;
    try {
      await updateBusiness({ id: business.id, body: values }).unwrap();
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const handleBusinessKhatChange = (value: string) => {
    if (!value) {
      setKhatAmounts([]);
      setSelectedKhat(null);
      form.setFieldsValue({
        applicant_type_of_businessKhat: null,
        applicant_type_of_businessKhatAmount: null,
      });
      return;
    }

    const selected = tradeInfoData?.find((d: TTradeKhat) => String(d.khat_id) === String(value));
    if (selected) {
      setSelectedKhat(selected);
      setKhatAmounts(selected.khat_fees || []);
      form.setFieldsValue({
        applicant_type_of_businessKhat: value,
        applicant_type_of_businessKhatAmount: business?.applicant_type_of_businessKhatAmount ?? undefined,
      });
    }
  };

  const handleTradeFees = (value: string) => {
    console.log("Selected Fee:", value);
  };

  return (
    <Modal
      title="ব্যবসা তথ্য সম্পাদনা"
      open={open}
      onCancel={onClose}
      footer={null}
      width="80%"
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <div style={sectionStyle}>
          <h4 style={headingStyle}>ব্যক্তিগত তথ্য</h4>
          <Row gutter={16}>
            <Col span={8}><Form.Item name="name" label="নাম"><Input style={inputStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="gender" label="লিঙ্গ"><Select options={genderOptions} style={selectStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="father_name" label="পিতার নাম"><Input style={inputStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="mother_name" label="মাতার নাম"><Input style={inputStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="nid_no" label="জাতীয় পরিচয়পত্র নম্বর"><Input style={inputStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="birth_id_no" label="জন্ম নিবন্ধন নম্বর"><Input style={inputStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="mobile_no" label="মোবাইল নম্বর"><Input style={inputStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="applicant_date_of_birth" label="জন্ম তারিখ"><DatePicker className="w-100" format="YYYY-MM-DD" style={inputStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="applicant_religion" label="ধর্ম"><Input style={inputStyle} /></Form.Item></Col>
          </Row>
        </div>

        <div style={sectionStyle}>
          <h4 style={headingStyle}>প্রতিষ্ঠান সংক্রান্ত তথ্য</h4>
          <Row gutter={16}>
            <Col span={8}><Form.Item name="applicant_name_of_the_organization" label="প্রতিষ্ঠানের নাম"><Input style={inputStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="organization_address" label="প্রতিষ্ঠানের ঠিকানা"><Input style={inputStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="applicant_occupation" label="পেশা"><Input style={inputStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="applicant_owner_type" label="মালিকানার ধরণ"><Input style={inputStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="applicant_type_of_business" label="ব্যবসার ধরণ"><Input style={inputStyle} /></Form.Item></Col>

            <BusinessKhatFields
              tradeInfoData={tradeInfoData}
              selectedKhat={selectedKhat}
              khatAmounts={khatAmounts}
              handleBusinessKhatChange={handleBusinessKhatChange}
              handleTradeFees={handleTradeFees}
              selectStyle={selectStyle}
            />

            <Col span={8}><Form.Item name="last_years_money" label="গত বছরের বকেয়া"><Input style={inputStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="applicant_vat_id_number" label="ভ্যাট আইডি"><Input style={inputStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="applicant_tax_id_number" label="ট্যাক্স আইডি"><Input style={inputStyle} /></Form.Item></Col>
          </Row>
        </div>

        <div style={sectionStyle}>
          <h4 style={headingStyle}>হোল্ডিং সংক্রান্ত তথ্য</h4>
          <Row gutter={16}>
            <Col span={8}><Form.Item name="applicant_holding_tax_number" label="হোল্ডিং ট্যাক্স নম্বর"><Input style={inputStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="holding_owner_name" label="হোল্ডিং মালিকের নাম"><Input style={inputStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="holding_owner_relationship" label="সম্পর্ক"><Input style={inputStyle} /></Form.Item></Col>
            <Col span={8}><Form.Item name="holding_owner_mobile" label="হোল্ডিং মালিকের মোবাইল"><Input style={inputStyle} /></Form.Item></Col>
          </Row>
        </div>

        <div style={sectionStyle}>
          <h4 style={headingStyle}>অবস্থা</h4>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="status" label="স্ট্যাটাস"><Select options={statusOptions} style={selectStyle} /></Form.Item></Col>
          </Row>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            আপডেট করুন
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditBusinessModal;
