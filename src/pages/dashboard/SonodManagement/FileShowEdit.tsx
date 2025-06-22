/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import { TApplicantData } from "@/types";
import { useSonodFilesUpdateMutation } from "@/redux/api/sonod/sonodApi";

const { Option } = Select;

const FILE_TYPE_OPTIONS: Record<string, string> = {
  applicant_national_id_front_attachment: "জাতীয় পরিচয়পত্র (সামনের দিক)",
  applicant_national_id_back_attachment: "জাতীয় পরিচয়পত্র (পেছনের দিক)",
  applicant_birth_certificate_attachment: "জন্ম সনদ",
  recommendation: "সুপারিশ",
  holding_tax_promanok: "হোল্ডিং ট্যাক্সের  প্রমাণক ",
  certification: "প্রত্যয়ন",
  ssc_certificate: "এসএসসি সনদ",
  hsc_certificate: "এইচএসসি সনদ",
  vaccine_card: "টিকা কার্ড",
  parents_id: "পিতা/মাতার আইডি",
  others: "অন্যান্য",
};

const FileShowEdit = ({ data }: { data: TApplicantData }) => {
  const token = localStorage.getItem("token");
  const [sonodFilesUpdate, { isLoading }] = useSonodFilesUpdateMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<
    Record<string, File | null>
  >({});
  const [previews, setPreviews] = useState<Record<string, string>>({});

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    typeKey: string
  ) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      setSelectedFiles((prev) => ({ ...prev, [typeKey]: file }));
      setPreviews((prev) => ({
        ...prev,
        [typeKey]: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = async () => {
    if (selectedTypes.length === 0)
      return alert("কমপক্ষে একটি ফাইল টাইপ নির্বাচন করুন।");

    const missing = selectedTypes.filter((type) => !selectedFiles[type]);
    if (missing.length > 0) return alert("সব নির্বাচিত টাইপের জন্য ফাইল দিন।");

    const formData = new FormData();
    selectedTypes.forEach((type) => {
      if (selectedFiles[type]) {
        formData.append(type, selectedFiles[type] as File);
      }
    });
    const response = await sonodFilesUpdate({
      formData,
      id: data.id,
      token,
    }).unwrap();
    if (response?.status_code === 200) {
      message.success("সনদটি সফলভাবে আপডেট করা হয়েছে।");
      setIsEditing(false);
    } else {
      message.error("সনদটি আপডেট করতে ব্যর্থ হয়েছে,আবার চেষ্টা করুন");
    }
  };

  return (
    <div className="row mx-auto">
      <div className="col-md-12 mb-3">
        <div className="app-heading">সংযুক্ত ফাইল</div>
        <Button
          type="primary"
          size="small"
          onClick={() => setIsEditing(!isEditing)}
          className="float-end"
        >
          {isEditing ? "বাতিল করুন" : "ফাইল সম্পাদনা করুন"}
        </Button>
      </div>

      {/* Show existing files when not editing */}
      {!isEditing &&
        data?.files?.map((file, idx) => (
          <div key={idx} className="col-md-4 col-6 mb-3">
            <div>
              <strong>{FILE_TYPE_OPTIONS[file.type] || file.type}</strong>
              <img
                src={file.file_path}
                alt={file.type}
                className="img-thumbnail mt-2"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        ))}

      {/* Editing Mode */}
      {isEditing && (
        <>
          <div className="col-md-12 mb-3">
            <Form.Item label="এক বা একাধিক ফাইল টাইপ নির্বাচন করুন">
              <Select
                className="h-auto"
                mode="multiple"
                placeholder="ডকুমেন্ট টাইপ নির্বাচন করুন"
                style={{ width: "100%", height: 40 }}
                onChange={(vals) => setSelectedTypes(vals)}
                value={selectedTypes}
                allowClear
              >
                {Object.entries(FILE_TYPE_OPTIONS).map(([key, label]) => (
                  <Option key={key} value={key}>
                    {label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* Render file input for each selected type */}
          {selectedTypes.map((typeKey) => (
            <div className="col-md-6 mb-3" key={typeKey}>
              <Form.Item label={FILE_TYPE_OPTIONS[typeKey]}>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, typeKey)}
                />
                {previews?.[typeKey] && (
                  <img
                    src={previews[typeKey]!}
                    alt={`${typeKey} Preview`}
                    className="img-thumbnail mt-2"
                    style={{ width: "100%" }}
                  />
                )}
              </Form.Item>
            </div>
          ))}

          <div className="col-md-12">
            <Button type="primary" loading={isLoading} onClick={handleSave}>
              সংরক্ষণ করুন
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FileShowEdit;
