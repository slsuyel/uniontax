import { useState, useEffect, ChangeEvent } from "react";
import { Button, Form, message, Input, Select } from "antd";
import {
  useUnionProfileQuery,
  useUpdateUnionMutation,
} from "@/redux/api/auth/authApi";
import { TUnionInfo } from "@/types";
import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import Loader from "@/components/reusable/Loader";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { setUnionData } from "@/redux/features/union/unionSlice";
import { RootState } from "@/redux/features/store";

const UnionProfile = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const { data, isLoading } = useUnionProfileQuery({ token });
  const [updateUnion, { isLoading: updating }] = useUpdateUnionMutation();
  const sonodInfo = useAppSelector((state: RootState) => state.union.sonodList);
  const [form] = Form.useForm();

  const [files, setFiles] = useState({
    web_logo: null,
    sonod_logo: null,
    c_signture: null,
    socib_signture: null,
    u_image: null,
  });

  const [formValues, setFormValues] = useState({
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
  });

  const cTypeOptions = [
    { bn: "চেয়ারম্যান", en: "Chairman" },
    { bn: "প্যানেল চেয়ারম্যান ১", en: "Panel Chairman 1" },
    { bn: "প্যানেল চেয়ারম্যান ২", en: "Panel Chairman 2" },
    { bn: "প্যানেল চেয়ারম্যান ৩", en: "Panel Chairman 3" },
    { bn: "প্রশাসক", en: "Deputy Commissioner" },
    { bn: "সদস্য/সদস্যা", en: "Member" },
  ];

  useEffect(() => {
    if (data?.data) {
      const unionInfo: TUnionInfo = data.data;
      setFormValues({
        full_name: unionInfo.full_name,
        full_name_en: unionInfo.full_name_en,
        short_name_b: unionInfo.short_name_b,
        thana: unionInfo.thana,
        district: unionInfo.district,
        thana_en: unionInfo.thana_en,
        district_en: unionInfo.district_en,
        c_name: unionInfo.c_name,
        c_name_en: unionInfo.c_name_en,
        c_type: unionInfo.c_type,
        c_type_en: unionInfo.c_type_en,
        c_email: unionInfo.c_email,
        socib_name: unionInfo.socib_name,
        socib_name_en: unionInfo.socib_name_en,
        socib_email: unionInfo.socib_email,
        u_description: unionInfo.u_description,
        u_notice: unionInfo.u_notice,
        google_map: unionInfo.google_map,
        defaultColor: unionInfo.defaultColor,
      });
      setFiles({
        web_logo: unionInfo.web_logo,
        sonod_logo: unionInfo.sonod_logo,
        c_signture: unionInfo.c_signture,
        socib_signture: unionInfo.socib_signture,
        u_image: unionInfo.u_image,
      });
      form.setFieldsValue(unionInfo);
    }
  }, [data, form]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = event.target;
    setFormValues((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleCTypeChange = (value: string) => {
    const selectedOption = cTypeOptions.find((option) => option.bn === value);
    if (selectedOption) {
      setFormValues((prevData) => ({
        ...prevData,
        c_type: value,
        c_type_en: selectedOption.en,
      }));
      form.setFieldsValue({ c_type: value, c_type_en: selectedOption.en });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // Append form values to FormData
    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    // Append files to FormData
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });

    // Debugging: Log FormData contents
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    try {
      const res = await updateUnion({ data: formData, token }).unwrap();
      if (res.status_code === 200) {
        console.log(res.data.data);
          dispatch(
            setUnionData({
              unionInfo: res.data.data,
              sonodList: sonodInfo,
            })
          );
        message.success("ইউনিয়ন তথ্য সফলভাবে আপডেট করা হয়েছে।");
      } else {
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
      {location.pathname == "/dashboard/union/profile" && (
        <Breadcrumbs current="ইউনিয়ন প্রোফাইল" />
      )}
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <Form.Item label="ইউনিয়নের পুরো নাম (বাংলা)" name="full_name">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                  id="full_name"
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
                  id="full_name_en"
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
                  id="short_name_b"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="উপজেলা (বাংলা)" name="thana">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                  id="thana"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="উপজেলা (ইংরেজি)" name="thana_en">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                  id="thana_en"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="জেলা (বাংলা)" name="district">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                  id="district"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="জেলা (ইংরেজি)" name="district_en">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                  id="district_en"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="চেয়ারম্যানের নাম (বাংলা)" name="c_name">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                  id="c_name"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="চেয়ারম্যানের নাম (ইংরেজি)" name="c_name_en">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                  id="c_name_en"
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
                  id="c_type_en"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="সচিবের নাম (বাংলা)" name="socib_name">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                  id="socib_name"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="সচিবের নাম (ইংরেজি)" name="socib_name_en">
                <Input
                  style={{ height: 40 }}
                  onChange={handleChange}
                  className="form-control"
                  id="socib_name_en"
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
                  id="c_email"
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
                  id="socib_email"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="ইউনিয়নের বিবরন (বাংলা)" name="u_description">
                <Input.TextArea
                  rows={6}
                  onChange={handleChange}
                  className="form-control"
                  id="u_description"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="ইউনিয়নের নোটিশ (বাংলা)" name="u_notice">
                <Input.TextArea
                  rows={6}
                  onChange={handleChange}
                  className="form-control"
                  id="u_notice"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="ইউনিয়নের ম্যাপ" name="google_map">
                <Input.TextArea
                  rows={6}
                  onChange={handleChange}
                  className="form-control"
                  id="google_map"
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
                  id="defaultColor"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="ওয়েবসাইট এর লোগো" name="web_logo">
                <Input
                  type="file"
                  onChange={(e) => handleFileChange(e, "web_logo")}
                  className="form-control"
                  id="web_logo"
                />
                {files.web_logo && (
                  <img
                    width={250}
                    height={"auto"}
                    alt="Web Logo"
                    className="img-thumbnail img-fluid"
                    src={files.web_logo}
                    style={{ marginTop: "10px" }}
                  />
                )}
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="সনদ এর লোগো" name="sonod_logo">
                <Input
                  type="file"
                  onChange={(e) => handleFileChange(e, "sonod_logo")}
                  className="form-control"
                  id="sonod_logo"
                />
                {files.sonod_logo && (
                  <img
                    width={250}
                    height={"auto"}
                    alt="Sonod Logo"
                    className="img-thumbnail img-fluid"
                    src={files.sonod_logo}
                    style={{ marginTop: "10px" }}
                  />
                )}
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="চেয়ারম্যানের স্বাক্ষর" name="c_signture">
                <Input
                  type="file"
                  onChange={(e) => handleFileChange(e, "c_signture")}
                  className="form-control"
                  id="c_signture"
                />
                {files.c_signture && (
                  <img
                    width={250}
                    height={"auto"}
                    alt="Chairman Signature"
                    className="img-thumbnail img-fluid"
                    src={files.c_signture}
                    style={{ marginTop: "10px" }}
                  />
                )}
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="সচিবের স্বাক্ষর" name="socib_signture">
                <Input
                  type="file"
                  onChange={(e) => handleFileChange(e, "socib_signture")}
                  className="form-control"
                  id="socib_signture"
                />
                {files.socib_signture && (
                  <img
                    width={250} height={"auto"}
                    alt="Secretary Signature"
                    className="img-thumbnail img-fluid"
                    src={files.socib_signture}
                    style={{ marginTop: "10px" }}
                  />
                )}
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="ইউনিয়নের ছবি" name="u_image">
                <Input
                  type="file"
                  onChange={(e) => handleFileChange(e, "u_image")}
                  className="form-control"
                  id="u_image"
                />
                {files.u_image && (
                  <img
                    width={250} height={"auto"}
                    alt="Union Image"
                    className="img-thumbnail img-fluid"
                    src={files.u_image}
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
