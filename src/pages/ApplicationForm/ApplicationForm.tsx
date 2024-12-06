/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, Button, message } from "antd";
import addressFields from "./addressFields";
import attachmentForm from "./attachmentForm";

import { useState } from "react";
import tradeLicenseForm from "./tradeLicenseForm";

import InheritanceForm from "./inheritanceForm";
import commonFields from "./commonFields";
import inheritanceList from "./inheritanceList";
import conditionalForm from "./conditionalForm";

import FormValueModal from "@/components/ui/FormValueModal";
import { useLocation, useParams } from "react-router-dom";

const ApplicationForm = () => {
  const { service } = useParams<{ service: string }>();
  const location = useLocation();
  const pathname = location.pathname;
  const isDashboard = pathname.includes("dashboard");

  const [inherList, setInherList] = useState(1);
  const [userDta, setUserData] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const onFinish = async (values: any) => {
    setUserData(values);

    if (isDashboard) {
      console.log("Submitted values:", values);
      message.success("Form submitted from dashboard successfully");
    } else {
      setModalVisible(true);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className={`${!isDashboard ? "container my-3" : ""}`}>
      <Form layout="vertical" onFinish={onFinish}>
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
            {service == "ওয়ারিশান সনদ" && InheritanceForm(service)}
            {service == "ওয়ারিশান সনদ" && InheritanceForm(service)}
            {service == "বিবিধ প্রত্যয়নপত্র" && InheritanceForm(service)}
            {service == "একই নামের প্রত্যয়ন" && InheritanceForm(service)}

            <div className="col-md-12">
              <div className="app-heading">আবেদনকারীর তথ্য</div>
            </div>

            {commonFields()}

            {service === "ট্রেড লাইসেন্স" && tradeLicenseForm()}

            {conditionalForm(service)}
          </div>
          {addressFields()}
          {attachmentForm()}

          {service === "ওয়ারিশান সনদ" &&
            inheritanceList(inherList, setInherList)}

          {service === "উত্তরাধিকারী সনদ" &&
            inheritanceList(inherList, setInherList)}

          <div style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit" size="large">
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

export default ApplicationForm;
