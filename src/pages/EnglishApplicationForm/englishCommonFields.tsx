import { Form, Input } from "antd";

// const { Option } = Select;

const englishCommonFields = () => {
  return (
    <>
      <div className="col-md-4">
        <Form.Item
          label="আবেদনকারীর নাম (Applicant's Name)"
          name="applicant_name"
          rules={[{ required: true, message: "দয়া করে আপনার নাম লিখুন" }]}
        >
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
          />
        </Form.Item>
      </div>
      {/* <div className="col-md-4">
        <Form.Item label="লিঙ্গ (Gender)" name="applicant_gender">
          <Select
            placeholder="লিঙ্গ নির্বাচন করুন"
            style={{ height: 40, width: "100%" }}
            className=""
          >
            <Option value="Male">পুরুষ (Male)</Option>
            <Option value="Female">মহিলা (Female)</Option>
          </Select>
        </Form.Item>
      </div> */}
      <div className="col-md-4">
        <Form.Item
          label="পিতার/স্বামীর নাম (Father's/Husband's Name)"
          name="applicant_father_name"
        >
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
          />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          label="মাতার নাম (Mother's Name)"
          name="applicant_mother_name"
        >
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
          />
        </Form.Item>
      </div>
      {/* <div className="col-md-4">
        <Form.Item
          label="জাতীয় পরিচয়পত্র নম্বর (National ID Number)"
          name="applicant_national_id_number"
        >
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
          />
        </Form.Item>
      </div> */}
      {/* <div className="col-md-4">
        <Form.Item
          label="জন্ম নিবন্ধন নম্বর (Birth Certificate Number)"
          name="applicant_birth_certificate_number"
        >
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
          />
        </Form.Item>
      </div> */}
      {/* <div className="col-md-4">
        <Form.Item
          label="হোল্ডিং নম্বর (Holding Number)"
          name="applicant_holding_tax_number"
        >
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
          />
        </Form.Item>
      </div> */}

      {/* <div className="col-md-4">
        <Form.Item
          rules={[
            { required: true, message: "দয়া করে আপনার মোবাইল নম্বর লিখুন" },
            {
              len: 11,
              message: "মোবাইল নম্বর ১১ ডিজিট হতে হবে",
            },
            {
              pattern: /^[0-9]+$/,
              message: "মোবাইল নম্বর শুধুমাত্র সংখ্যা হতে হবে",
            },
          ]}
          label="মোবাইল নম্বর (Mobile)"
          name="applicant_mobile"
        >
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
            type="tel"
          />
        </Form.Item>
      </div> */}
      {/* <div className="col-md-4">
        <Form.Item
          label="জন্ম তারিখ (Date of Birth)"
          name="applicant_date_of_birth"
        >
          <DatePicker className="form-control" style={{ width: "100%" }} />
        </Form.Item>
      </div> */}

      {/* <div className="col-md-4">
        <Form.Item label="ছবি (Photo)" name="image">
          <Input
            type="file"
            // onChange={(e) => handleFileChange(e, setBackPreview)}
          />
        </Form.Item>
      </div> */}
    </>
  );
};

export default englishCommonFields;
