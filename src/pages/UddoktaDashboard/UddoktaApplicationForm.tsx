/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, Button, message /* Modal */ } from "antd";

import { useState } from "react";

import FormValueModal from "@/components/ui/FormValueModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTradeInfoQuery } from "@/redux/api/user/userApi";

import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
import { useSonodUpdateMutation } from "@/redux/api/sonod/sonodApi";
import inheritanceList from "../ApplicationForm/inheritanceList";
import conditionalForm from "../ApplicationForm/conditionalForm";
import commonFields from "../ApplicationForm/commonFields";
import InheritanceForm from "../ApplicationForm/inheritanceForm";
import addressFields from "../ApplicationForm/addressFields";
import attachmentForm from "../ApplicationForm/attachmentForm";
import TradeLicenseForm from "../ApplicationForm/tradeLicenseForm";
// const { confirm } = Modal;
const UddoktaApplicationForm = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
  const { service } = useParams<{ service: string }>();
  const navigate = useNavigate();

  const [updateSonod, { isLoading: updating }] = useSonodUpdateMutation();
  const { data, isLoading } = useTradeInfoQuery(
    { unionName: unionInfo?.short_name_e },
    {
      skip: !unionInfo?.short_name_e || service !== "ট্রেড লাইসেন্স",
    }
  );
  const token = localStorage.getItem(`token`);
  const location = useLocation();
  const pathname = location.pathname;
  const isDashboard = pathname.includes("dashboard");
  const [inherList, setInherList] = useState(1);
  const [userDta, setUserData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  // const navigate = useNavigate()

  const handleSubmitForm = async (values: any) => {
    try {
      setUserData(values);
      if (isDashboard) {
        console.log("Submitted values:", values);
        const res = await updateSonod({ data: values, id, token }).unwrap();
        if (res.status_code === 200) {
          navigate(-1);
          message.success("সনদটি সফলভাবে আপডেট করা হয়েছে।");
        } else {
          message.error("সনদটি আপডেট করতে ব্যর্থ হয়েছে,আবার চেষ্টা করুন");
        }
      } else {
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error(
        "An error occurred while submitting the form. Please try again later."
      );
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <div className={`${!isDashboard ? "container my-3" : ""}`}>
      <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
        <div
          className="panel-heading"
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            background: "rgb(21, 149, 19)",
            textAlign: "center",
            color: "white",
          }}
        >
          {service || "Form Title"}
        </div>
        <div className="form-pannel">
          <div className="row">
            {service == "উত্তরাধিকারী সনদ" && InheritanceForm(service)}
            {/* {service == "উত্তরাধিকারী সনদ" && InheritanceForm(service)} */}
            {service == "ওয়ারিশান সনদ" && InheritanceForm(service)}
            {service == "বিবিধ প্রত্যয়নপত্র" && InheritanceForm(service)}
            {service == "একই নামের প্রত্যয়ন" && InheritanceForm(service)}
            <div className="col-md-12">
              <div className="app-heading">আবেদনকারীর তথ্য</div>
            </div>
            {commonFields()}
            {service === "ট্রেড লাইসেন্স" && (
              <TradeLicenseForm data={data} isLoading={isLoading} />
            )}{" "}
            {/* Corrected JSX component call */}
            {conditionalForm(service)}
          </div>
          {addressFields({ form })}
          {attachmentForm()}

          {service === "ওয়ারিশান সনদ" &&
            inheritanceList(inherList, setInherList)}

          {service === "উত্তরাধিকারী সনদ" &&
            inheritanceList(inherList, setInherList)}

          <div style={{ textAlign: "center" }}>
            <Button
              loading={updating}
              disabled={updating}
              type="primary"
              htmlType="submit"
              size="large"
            >
              সাবমিট
            </Button>
          </div>
        </div>
      </Form>

      <FormValueModal
        visible={modalVisible}
        data={userDta}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default UddoktaApplicationForm;
