/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import Loader from "@/components/reusable/Loader";
import {
  useUnionProfileQuery,
  useUpdateUnionMutation,
} from "@/redux/api/auth/authApi";
import { TUnionInfo } from "@/types";
import { message, Form, Input, Button, Select } from "antd";
import { useState, ChangeEvent, useEffect } from "react";
// import { UploadOutlined } from "@ant-design/icons";

const UnionProfile = () => {
  const token = localStorage.getItem("token");
  const { data, isLoading } = useUnionProfileQuery({ token });
  const [updateUnion, { isLoading: updating }] = useUpdateUnionMutation();
  const [form] = Form.useForm();

  const [formData, setFormData] = useState<TUnionInfo>({
    full_name: "",
    full_name_en: "",
    short_name_b: "",
    thana: "",
    district: "",
    thana_en: "",
    district_en: "",
    c_name: "",
    c_name_en: "",
    c_type: "",
    c_type_en: "",
    c_email: "",
    socib_name: "",
    socib_name_en: "",
    socib_email: "",

    u_description: "",
    u_notice: "",
    google_map: "",
    defaultColor: "",
    web_logo: null,
    sonod_logo: null,
    c_signture: null,
    socib_signture: null,
    u_image: null,
  });

  useEffect(() => {
    const unionInfo: TUnionInfo = data?.data;
    if (data?.data) {
      setFormData({
        full_name: unionInfo.full_name,
        full_name_en: unionInfo.full_name_en,
        short_name_b: unionInfo.short_name_b,
        thana: unionInfo.thana,
        district: unionInfo.district,
        thana_en: unionInfo.thana_en,
        district_en: unionInfo.district_en,
        c_name: unionInfo.c_name,
        c_name_en: unionInfo.c_name_en,
        c_type: unionInfo.c_name,
        c_type_en: unionInfo.c_name_en,
        c_email: unionInfo.c_email,
        socib_name: unionInfo.socib_name,
        socib_name_en: unionInfo.socib_name,
        socib_email: unionInfo.socib_email,

        u_description: unionInfo.u_description,
        u_notice: unionInfo.u_notice,
        google_map: unionInfo.google_map,
        defaultColor: unionInfo.defaultColor,
        web_logo: unionInfo.web_logo,
        sonod_logo: unionInfo.sonod_logo,
        c_signture: unionInfo.c_signture,
        socib_signture: unionInfo.socib_signture,
        u_image: unionInfo.u_image,
      });
      form.setFieldsValue(unionInfo);
    }
  }, [data, form]);

  // const handleChange = (
  //   event: ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   const { id, value, type } = event.target;

  //   if (type === "file") {
  //     const files = (event.target as HTMLInputElement).files;
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [id]: files ? files[0] : null,
  //     }));
  //   } else {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [id]: value,
  //     }));
  //   }
  // };
  const cTypeOptions = [
    { bn: "চেয়ারম্যান", en: "Chairman" },
    { bn: "প্যানেল চেয়ারম্যান ১", en: "Panel Chairman 1" },
    { bn: "প্যানেল চেয়ারম্যান ২", en: "Panel Chairman 2" },
    { bn: "প্যানেল চেয়ারম্যান ৩", en: "Panel Chairman 3" },
    { bn: "প্রশাসক", en: "Deputy Commissioner" },
    { bn: "সদস্য/সদস্যা", en: "Member" },
  ];

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | any
  ) => {
    const { id, value, type, files } = event.target;

    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [id]: files ? files[0] : null,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };
  const handleCTypeChange = (value: string) => {
    const selectedOption = cTypeOptions.find((option) => option.bn === value);
    if (selectedOption) {
      setFormData((prevData) => ({
        ...prevData,
        c_type: value,
        c_type_en: selectedOption.en,
      }));
      form.setFieldsValue({ c_type: value, c_type_en: selectedOption.en }); // Update form fields
    }
  };
  const handleSubmit = async (values: TUnionInfo) => {
    const formData = new FormData();

    // Append all fields to FormData
    Object.keys(values).forEach((key) => {
      const value = values[key as keyof TUnionInfo];
      if (value !== null && value !== undefined) {
        if (
          key === "web_logo" ||
          key === "sonod_logo" ||
          key === "c_signture" ||
          key === "socib_signture" ||
          key === "u_image"
        ) {
          // Append files if they exist
          if (value instanceof File) {
            formData.append(key, value);
          }
        } else {
          // Append other fields as strings
          formData.append(key, value as string);
        }
      }
    });

    try {
      const res = await updateUnion({ data: formData, token }).unwrap();
      console.log(res.status_code);
      if (res.status_code === 200) {
        message.success("ইউনিয়ন তথ্য সফলভাবে আপডেট করা হয়েছে।");
      } else if (
        res.status_code !== 200 ||
        res.status_code === 302 ||
        res.status_code === 401
      ) {
        message.error("Failed to update union information.");
      }
    } catch (error) {
      console.error("Failed updating union:", error);
      message.error("Failed to update union information. Please try again.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="card p-3 border-0">
      <Breadcrumbs current="ইউনিয়ন প্রোফাইল" />
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <Form.Item label="ইউনিয়নের পুরো নাম (বাংলা)" name="full_name">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="ইউনিয়নের পুরো নাম (ইংরেজি)"
                name="full_name_en"
              >
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="ইউনিয়নের সংক্ষিপ্ত নাম (বাংলা)"
                name="short_name_b"
              >
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="উপজেলা (বাংলা)" name="thana">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="উপজেলা (ইংরেজি)" name="thana_en">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="জেলা (বাংলা)" name="district">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="জেলা (ইংরেজি)" name="district_en">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="চেয়ারম্যানের নাম (বাংলা)" name="c_name">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="চেয়ারম্যানের নাম (ইংরেজি)" name="c_name_en">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item label="চেয়ারম্যানের ধরন (বাংলা)" name="c_type">
                <Select style={{ height: 40 }} onChange={handleCTypeChange}>
                  {cTypeOptions.map((option) => (
                    <Select.Option key={option.bn} value={option.bn}>
                      {option.bn}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4 d-none">
              <Form.Item label="চেয়ারম্যানের ধরন (ইংরেজি)" name="c_type_en">
                <Input
                  style={{ height: 40 }}
                  readOnly
                  className="form-control"
                />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item label="সচিবের নাম (বাংলা)" name="socib_name">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="সচিবের নাম (ইংরেজি)" name="socib_name_en">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="চেয়ারম্যানের ইমেইল" name="c_email">
                <Input
                  style={{ height: 40 }}
                  type="email"
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="সচিবের ইমেইল" name="socib_email">
                <Input
                  style={{ height: 40 }}
                  type="email"
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item label="ইউনিয়নের বিবরন (বাংলা)" name="u_description">
                <Input.TextArea
                  rows={6}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="ইউনিয়নের নোটিশ (বাংলা)" name="u_notice">
                <Input.TextArea
                  rows={6}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="ইউনিয়নের ম্যাপ" name="google_map">
                <Input.TextArea
                  rows={6}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="ওয়েবসাইট কালার" name="defaultColor">
                <Input
                  style={{ height: 40 }}
                  type="color"
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="ওয়েবসাইট এর লোগো" name="web_logo">
                <Input
                  type="file"
                  onChange={handleChange}
                  className="form-control"
                  id="web_logo"
                />
                {formData.web_logo && (
                  <img
                    width={250}
                    alt="Web Logo"
                    className="img-thumbnail img-fluid"
                    src={formData.web_logo}
                    style={{ marginTop: "10px" }}
                  />
                )}
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="সনদ এর লোগো" name="sonod_logo">
                <Input
                  type="file"
                  onChange={handleChange}
                  className="form-control"
                  id="sonod_logo"
                />
                {formData.sonod_logo && (
                  <img
                    width={250}
                    alt="Sonod Logo"
                    className="img-thumbnail img-fluid"
                    src={formData.sonod_logo}
                    style={{ marginTop: "10px" }}
                  />
                )}
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="চেয়ারম্যানের স্বাক্ষর" name="c_signture">
                <Input
                  type="file"
                  onChange={handleChange}
                  className="form-control"
                  id="c_signture"
                />
                {formData.c_signture && (
                  <img
                    width={250}
                    alt="Chairman Signature"
                    className="img-thumbnail img-fluid"
                    src={formData.c_signture}
                    style={{ marginTop: "10px" }}
                  />
                )}
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="সচিবের স্বাক্ষর" name="socib_signture">
                <Input
                  type="file"
                  onChange={handleChange}
                  className="form-control"
                  id="socib_signture"
                />
                {formData.socib_signture && (
                  <img
                    width={250}
                    alt="Secretary Signature"
                    className="img-thumbnail img-fluid"
                    src={formData.socib_signture}
                    style={{ marginTop: "10px" }}
                  />
                )}
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="ইউনিয়নের ছবি" name="u_image">
                <Input
                  type="file"
                  onChange={handleChange}
                  className="form-control"
                  id="u_image"
                />
                {formData.u_image && (
                  <img
                    width={250}
                    alt="Union Image"
                    className="img-thumbnail img-fluid"
                    src={formData.u_image}
                    style={{ marginTop: "10px" }}
                  />
                )}
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div className="">
            <Button disabled={updating} type="primary" htmlType="submit">
              {updating ? "Submitting" : "সাবমিট"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UnionProfile;
