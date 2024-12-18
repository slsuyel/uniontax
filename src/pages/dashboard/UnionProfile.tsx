/* eslint-disable @typescript-eslint/no-explicit-any */
import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import Loader from "@/components/reusable/Loader";
import {
  useUnionProfileQuery,
  useUpdateUnionMutation,
} from "@/redux/api/auth/authApi";
import { TUnionInfo } from "@/types";
import { message } from "antd";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

const UnionProfile = () => {
  const token = localStorage.getItem("token");
  const { data, isLoading } = useUnionProfileQuery({ token });
  const [updateUnion, { isLoading: updating }] = useUpdateUnionMutation();

  const [formData, setFormData] = useState<TUnionInfo>({
    full_name: "",
    short_name_b: "",
    thana: "",
    district: "",
    c_name: "",
    c_email: "",
    socib_name: "",
    socib_email: "",
    u_code: "",
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
        short_name_b: unionInfo.short_name_b,
        thana: unionInfo.thana,
        district: unionInfo.district,
        c_name: unionInfo.c_name,
        c_email: unionInfo.c_email,
        socib_name: unionInfo.socib_name,
        socib_email: unionInfo.socib_email,
        u_code: unionInfo.u_code,
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
    }
  }, [data]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value, type } = event.target;

    if (type === "file") {
      const files = (event.target as HTMLInputElement).files;
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await updateUnion({ data: formData, token }).unwrap();
      console.log(res.status_code);
      if (res.status_code === 200) {
        message.success("Union information updated successfully.");
      }
    } catch (error) {
      console.error("Error updating union information:", error);
      message.error("Failed to update union information. Please try again.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Breadcrumbs current="ইউনিয়ন প্রোফাইল" />
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ইউনিয়নের পুরো নাম
                </label>
                <input
                  type="text"
                  id="full_name"
                  className="form-control"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ইউনিয়নের সংক্ষিপ্ত নাম (বাংলা)
                </label>
                <input
                  type="text"
                  id="short_name_b"
                  className="form-control"
                  value={formData.short_name_b}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  উপজেলা (বাংলা)
                </label>
                <input
                  type="text"
                  id="thana"
                  className="form-control"
                  value={formData.thana}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  জেলা (বাংলা)
                </label>
                <input
                  type="text"
                  id="district"
                  className="form-control"
                  value={formData.district}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  চেয়ারম্যানের নাম (বাংলা)
                </label>
                <input
                  type="text"
                  id="c_name"
                  className="form-control"
                  value={formData.c_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  চেয়ারম্যানের ইমেইল
                </label>
                <input
                  type="email"
                  id="c_email"
                  className="form-control"
                  value={formData.c_email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ইউনিয়নের কোড (English)
                </label>
                <input
                  type="text"
                  id="u_code"
                  className="form-control"
                  value={formData.u_code}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ইউনিয়নের বিবরন (বাংলা)
                </label>
                <textarea
                  id="u_description"
                  cols={30}
                  rows={6}
                  className="form-control"
                  style={{ resize: "none", height: "120px" }}
                  value={formData.u_description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ইউনিয়নের নোটিশ (বাংলা)
                </label>
                <textarea
                  id="u_notice"
                  cols={30}
                  rows={6}
                  className="form-control"
                  style={{ resize: "none", height: "120px" }}
                  value={formData.u_notice}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ইউনিয়নের ম্যাপ
                </label>
                <textarea
                  id="google_map"
                  cols={30}
                  rows={6}
                  className="form-control"
                  style={{ resize: "none", height: "120px" }}
                  value={formData.google_map}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ওয়েবসাইট কালার
                </label>
                <input
                  style={{ height: 50 }}
                  type="color"
                  id="defaultColor"
                  className="form-control"
                  value={formData.defaultColor}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ওয়েবসাইট এর লোগো
                </label>
                <input
                  type="file"
                  id="web_logo"
                  className="form-control"
                  onChange={handleChange}
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
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  সনদ এর লোগো
                </label>
                <input
                  type="file"
                  id="sonod_logo"
                  className="form-control"
                  onChange={handleChange}
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
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  চেয়ারম্যানের স্বাক্ষর
                </label>
                <input
                  type="file"
                  id="c_signture"
                  className="form-control"
                  onChange={handleChange}
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
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  সচিবের স্বাক্ষর
                </label>
                <input
                  type="file"
                  id="socib_signture"
                  className="form-control"
                  onChange={handleChange}
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
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ইউনিয়নের ছবি
                </label>
                <input
                  type="file"
                  id="u_image"
                  className="form-control"
                  onChange={handleChange}
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
              </div>
            </div>
          </div>
        </div>
        <div className=" pt-4">
          <div className="">
            <button
              disabled={updating}
              type="submit"
              className="btn btn-primary"
            >
              {updating ? "Submitting" : "সাবমিট"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UnionProfile;
