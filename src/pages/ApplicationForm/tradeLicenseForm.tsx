import { Form, Input, Select } from 'antd';
const { Option } = Select;
const tradeLicenseForm = () => {
  return (
    <>
      <div className="col-md-4">
        <Form.Item
          label="প্রতিষ্ঠানের মালিকানার ধরণ *"
          name="ownershipType"
          rules={[{ required: true, message: 'Please select ownership type' }]}
        >
          <Select
            style={{ height: 40, width: '100%' }}
            placeholder="নির্বাচন করুন"
          >
            <Option value="individual">ব্যক্তি মালিকানাধীন</Option>
            <Option value="joint">যৌথ মালিকানা</Option>
            <Option value="company">কোম্পানী</Option>
          </Select>
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="প্রতিষ্ঠানের নাম" name="companyName">
          <Input style={{ height: 40, width: '100%' }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="প্রতিষ্ঠানের ঠিকানা" name="companyAddress">
          <Input style={{ height: 40, width: '100%' }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="পেশা" name="occupation">
          <Input style={{ height: 40, width: '100%' }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="ভ্যাট আইডি (যদি থাকে)" name="vatId">
          <Input style={{ height: 40, width: '100%' }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="ট্যাক্স আইডি (যদি থাকে)" name="taxId">
          <Input style={{ height: 40, width: '100%' }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="ব্যবসা, বৃত্তি, পেশা, বা শিল্প প্রতিষ্ঠানের শ্রেণী"
          name="businessCategory"
          rules={[
            { required: true, message: 'Please select business category' },
          ]}
        >
          <Select
            style={{ height: 40, width: '100%' }}
            placeholder="নির্বাচন করুন"
          >
            <Option value="101">গুদাম (লিমিটেড কোম্পানী ব্যতীত)</Option>
            <Option value="102">হিমাগার (লিমিটেড কোম্পানী ব্যতীত)</Option>
            <Option value="103">
              ক্ষুদ্র ও কুটির শিল্প (লিমিটেড কোম্পানী ব্যতীত)
            </Option>
            <Option value="104">শিল্প কারখানা (লিমিটেড কোম্পানী)</Option>
            <Option value="105">
              কৃষি খামার, দুগ্ধ খামার, হাঁস-মুরগীর খামার, মৎস্য খামার, গবাদি
              পশুর খামার ইত্যাদি (লিমিটেড কোম্পানী ব্যতীত)
            </Option>
            <Option value="106">
              ধান ভাঙানো কল, আটা বা ময়দার কল বা মিল, তেলের কল (লিমিটেড কোম্পানী
              ব্যতীত)
            </Option>
            <Option value="107">
              স-মিল, বিদ্যুৎ চালিত অন্যান্য মিল (লিমিটেড কোম্পানী ব্যতীত)
            </Option>
            <Option value="108">
              ইট ভাটা বা অন্যান্য সিরামিক প্রস্তুতকারক
            </Option>
            <Option value="109">সিনেমা হল</Option>
            <Option value="110">বিউটি পারলার, হেয়ার ড্রেসিং সেলুন</Option>
            <Option value="111">লন্ড্রী</Option>
            <Option value="112">
              ব্যাংক, আর্থিক প্রতিষ্ঠান, বেসরকারি অফিস, প্রতিষ্ঠান বা সংস্থা বা
              উহাদের কোন শাখা
            </Option>
            <Option value="113">ঠিকাদারী ফার্ম বা প্রতিষ্ঠান</Option>
            <Option value="114">কৃষি পণ্যের আড়ত</Option>
            <Option value="115">পেশা, বৃত্তি (কলিং)</Option>
            <Option value="116">
              আত্মকর্মে নিয়োজিত চিকিৎসক, প্রকৌশলী, আইনজীবী
            </Option>
            <Option value="117">আবাসিক হোটেল বা মোটেল</Option>
            <Option value="118">রেস্তোঁরা, খাবার দোকান, মিষ্টির দোকান</Option>
            <Option value="119">
              দোকানদার বা ব্যবসায়ী (খোলা জায়গায় যে সকল হকার্সগণ কেনাবেচা
              করেন, তাহারা ইহার অন্তর্ভুক্ত হইবেন না)
            </Option>
            <Option value="120">ভাড়ায় চালিত যানবাহন</Option>
            <Option value="121">ভাড়ায় চালিত নয় এইরূপ যানবাহন</Option>
          </Select>
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="মূলধন/ব্যবসার ধরন"
          name="investmentType"
          rules={[{ required: true, message: 'Please select investment type' }]}
        >
          <Select
            style={{ height: 40, width: '100%' }}
            placeholder="নির্বাচন করুন"
          >
            <Option value="10000-20000">১০০০০-২০০০০</Option>
            <Option value="20000-30000">২০০০০-৩০০০০</Option>
          </Select>
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item label="বকেয়া" name="due">
          <Input style={{ height: 40, width: '100%' }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="ব্যবসার বিবরণ"
          name="businessDescription"
          rules={[
            { required: true, message: 'Please enter business description' },
          ]}
        >
          <Input style={{ height: 40, width: '100%' }} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="অর্থ বছর"
          name="financialYear"
          rules={[{ required: true, message: 'Please select financial year' }]}
        >
          <Select
            style={{ height: 40, width: '100%' }}
            placeholder="অর্থ বছর নির্বাচন করুন"
          >
            <Option value="2023-24">২০২৩-২৪</Option>
          </Select>
        </Form.Item>
      </div>
    </>
  );
};

export default tradeLicenseForm;
