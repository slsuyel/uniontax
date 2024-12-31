/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Form, Button, message, /* Modal */
  Input
} from "antd";

import { useState } from "react";

import FormValueModal from "@/components/ui/FormValueModal";
import { useParams } from "react-router-dom";
import { useTradeInfoQuery } from "@/redux/api/user/userApi";

import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";

import inheritanceList from "../ApplicationForm/inheritanceList";
import conditionalForm from "../ApplicationForm/conditionalForm";
import commonFields from "../ApplicationForm/commonFields";
import InheritanceForm from "../ApplicationForm/inheritanceForm";
import addressFields from "../ApplicationForm/addressFields";
import attachmentForm from "../ApplicationForm/attachmentForm";
import TradeLicenseForm from "../ApplicationForm/tradeLicenseForm";
// const { confirm } = Modal;
const UddoktaApplicationForm = () => {

  const [form] = Form.useForm();
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
  const { service } = useParams<{ service: string }>();


  const { data, isLoading } = useTradeInfoQuery(
    { unionName: unionInfo?.short_name_e },
    {
      skip: !unionInfo?.short_name_e || service !== "ট্রেড লাইসেন্স",
    }
  );

  const [inherList, setInherList] = useState(1);
  const [userDta, setUserData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  // const navigate = useNavigate()

  const handleSubmitForm = async (values: any) => {
    try {
      setUserData(values);
      setModalVisible(true);
    } catch (error) {
      message.error(
        "An error occurred while submitting the form. Please try again later."
      );
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <div className={`container my-3`}>

      <div className="col-md-4">
        <Form.Item
          label="ট্রান্সজেকশন"
          name="tranc"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input
            style={{ height: 40, width: "100%" }}
            className="form-control"
          />
        </Form.Item>
      </div>


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
