/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

interface AttachmentFormProps {
  setFrontFile: React.Dispatch<React.SetStateAction<File | null>>;
  setBackFile: React.Dispatch<React.SetStateAction<File | null>>;
  setBirthCertificateFile: React.Dispatch<React.SetStateAction<File | null>>;
  attachments?: { [key: string]: File | null };
  setAttachments?: React.Dispatch<
    React.SetStateAction<{ [key: string]: File | null }>
  >;
  previews?: { [key: string]: string | null };
  setPreviews?: React.Dispatch<
    React.SetStateAction<{ [key: string]: string | null }>
  >;
}

const optionalFields: Record<string, string> = {
  recommendation: "সুপারিশ",
  holding_tax_promanok: "হোল্ডিং ট্যাক্সের  প্রমাণক ",
  certification: "প্রত্যয়ন",
  ssc_certificate: "এসএসসি সনদ",
  hsc_certificate: "এইচএসসি সনদ",
  vaccine_card: "টিকা কার্ড",
  parents_id: "পিতা/মাতার আইডি",
  others: "অন্যান্য",
};

const AttachmentForm: React.FC<AttachmentFormProps> = ({
  setFrontFile,
  setBackFile,
  setBirthCertificateFile,
  setAttachments = () => {},
  previews = {},
  setPreviews = () => {},
}) => {
  const [attachmentType, setAttachmentType] = useState<"nid" | "birth">("nid");
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [birthCertificatePreview, setBirthCertificatePreview] = useState<
    string | null
  >(null);

  const [selectedOptionalDocs, setSelectedOptionalDocs] = useState<string[]>(
    []
  );

  // NID / Birth Certificate জন্য ফাইল হ্যান্ডলার
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // অন্যান্য ডকুমেন্টের ফাইল হ্যান্ডলার
  const handleOptionalFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      setAttachments((prev) => ({ ...prev, [key]: file }));
      setPreviews((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
    }
  };

  return (
    <div className="row mx-auto">
      <div className="col-md-12">
        <div className="app-heading">সংযুক্ত</div>
      </div>
      <div className="col-md-6 mb-3">
        <Form.Item
          label="সংযুক্তির ধরণ"
          initialValue="nid"
          name="attachment_type"
        >
          <Select
            style={{ width: "100%", height: 40 }}
            onChange={(val) => setAttachmentType(val)}
            value={attachmentType}
          >
            <Option value="nid">জাতীয় পরিচয়পত্র (NID)</Option>
            <Option value="birth">জন্ম নিবন্ধন (Birth Certificate)</Option>
          </Select>
        </Form.Item>
      </div>

      {/* NID Upload */}
      {attachmentType === "nid" && (
        <>
          <div className="col-md-6 mb-3">
            <Form.Item
              label="NID সামনের পাতা"
              rules={[
                { required: true, message: "NID সামনের পাতা আপলোড করুন" },
              ]}
            >
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange(e, setFrontFile, setFrontPreview)
                }
              />
              {frontPreview && (
                <img
                  src={frontPreview}
                  alt="NID Front Preview"
                  className="img-thumbnail mt-2"
                  style={{ width: "100%" }}
                />
              )}
            </Form.Item>
          </div>
          <div className="col-md-6 mb-3">
            <Form.Item
              label="NID পেছনের পাতা"
              rules={[
                { required: true, message: "NID পেছনের পাতা আপলোড করুন" },
              ]}
            >
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange(e, setBackFile, setBackPreview)
                }
              />
              {backPreview && (
                <img
                  src={backPreview}
                  alt="NID Back Preview"
                  className="img-thumbnail mt-2"
                  style={{ width: "100%" }}
                />
              )}
            </Form.Item>
          </div>
        </>
      )}

      {/* Birth Certificate Upload */}
      {attachmentType === "birth" && (
        <div className="col-md-6 mb-3">
          <Form.Item
            label="জন্ম নিবন্ধন"
            rules={[{ required: true, message: "জন্ম নিবন্ধন আপলোড করুন" }]}
          >
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileChange(
                  e,
                  setBirthCertificateFile,
                  setBirthCertificatePreview
                )
              }
            />
            {birthCertificatePreview && (
              <img
                src={birthCertificatePreview}
                alt="Birth Certificate Preview"
                className="img-thumbnail mt-2"
                style={{ width: "100%" }}
              />
            )}
          </Form.Item>
        </div>
      )}

      {/* অন্যান্য ডকুমেন্টস Multi-select */}
      <div className="col-md-6 mb-3">
        <Form.Item label="অন্যান্য ডকুমেন্টস">
          <Select
            mode="multiple"
            placeholder="এক বা একাধিক ডকুমেন্ট সিলেক্ট করুন"
            style={{ width: "100%", height: 40 }}
            onChange={(vals) => setSelectedOptionalDocs(vals)}
            value={selectedOptionalDocs}
            allowClear
          >
            {Object.entries(optionalFields).map(([key, label]) => (
              <Option key={key} value={key}>
                {label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      {/* সিলেক্ট করা প্রতিটি ডকুমেন্টের জন্য আলাদা ফাইল ইনপুট */}
      {selectedOptionalDocs.map((docKey) => (
        <div className="col-md-6 mb-3" key={docKey}>
          <Form.Item label={optionalFields[docKey]}>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleOptionalFileChange(e, docKey)}
            />
            {previews?.[docKey] && (
              <img
                src={previews[docKey]!}
                alt={`${optionalFields[docKey]} Preview`}
                className="border img-thumbnail mt-2"
                style={{ width: "100%" }}
              />
            )}
          </Form.Item>
        </div>
      ))}
    </div>
  );
};

export default AttachmentForm;
