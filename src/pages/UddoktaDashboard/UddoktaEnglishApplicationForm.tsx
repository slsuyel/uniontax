/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, Button, message } from "antd";

import { useEffect, useState } from "react";

import { useLocation, useParams } from "react-router-dom";
// import { useTradeInfoQuery } from "@/redux/api/user/userApi";
import { TApplicantData } from "@/types";
import { useAppSelector } from "@/redux/features/hooks";
// import { RootState } from "@/redux/features/store";
import englishInheritanceForm from "../EnglishApplicationForm/englishInheritanceForm";
import englishCommonFields from "../EnglishApplicationForm/englishCommonFields";
import EnglishTradeLicenseForm from "../EnglishApplicationForm/englishTradeLicenseForm";
import englishConditionalForm from "../EnglishApplicationForm/englishConditionalForm";
import englishAddressFields from "../EnglishApplicationForm/englishAddressFields";
import englishAttachmentForm from "../EnglishApplicationForm/englishAttachmentForm";
import englishInheritanceList from "../EnglishApplicationForm/englishInheritanceList";
import EnglishFormValueModal from "../EnglishApplicationForm/EnglishFormValueModal";

const UddoktaEnglishApplicationForm = ({ user }: { user?: TApplicantData }) => {
  const applicantInfo = useAppSelector(
    (state) => state.applicant.applicantInfo
  );
  const info = applicantInfo;
  const [form] = Form.useForm();
  // const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
  const { service } = useParams<{ service: string }>();
  const [sonodName, setSonodName] = useState(service);
  const location = useLocation();
  const { state } = location || {};
  const bn = state?.userData;

  // const { data, isLoading } = useTradeInfoQuery(
  //   { unionName: unionInfo?.short_name_e },
  //   {
  //     skip: !unionInfo?.short_name_e || sonodName !== "ট্রেড লাইসেন্স",
  //   }
  // );

  const pathname = location.pathname;
  const isDashboard = pathname.includes("dashboard");
  const [inherList, setInherList] = useState(1);
  const [userDta, setUserData] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  console.log(applicantInfo);

  useEffect(() => {
    if (isDashboard && user?.sonod_name) {
      setSonodName(user?.sonod_name);
    } else {
      setSonodName(service);
    }
  }, [isDashboard, user?.sonod_name, service]);

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

  console.log(info);
  return (
    <div className={`${!isDashboard ? "container my-3" : ""}`}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          applicant_name: info?.fullNameEN,
          applicant_gender: info?.gender,
          applicant_father_name: info?.fathersNameEN,
          applicant_mother_name: info?.mothersNameEN,
          applicant_national_id_number: info?.nationalIdNumber,
          applicant_birth_certificate_number: info?.birthRegistrationNumber,
          applicant_permanent_district: info?.presentDistrict_en,
          applicant_present_district: info?.presentDistrict_en,
          applicant_present_Upazila: info?.presentThana_en,
          applicant_permanent_Upazila: info?.permanentThana_en,
          applicant_present_post_office: info?.presentPost_en,
          applicant_permanent_post_office: info?.permanentPost_en,
          unioun_name: info?.permanentUnion_en,
          applicant_present_village: info?.presentVillage_en,
          applicant_permanent_village: info?.permanentVillage_en,
        }}
      >
        <div
          className="panel-heading"
          style={{
            fontWeight: "bold",
            fontSize: "20px",

            textAlign: "center",
            color: "white",
          }}
        >
          {sonodName || "Form Title"}
        </div>
        <div className="form-pannel">
          <div className="row">
            {sonodName == "উত্তরাধিকারী সনদ" &&
              englishInheritanceForm(sonodName)}
            {/* {sonodName == "উত্তরাধিকারী সনদ" && InheritanceForm(sonodName)} */}
            {sonodName == "ওয়ারিশান সনদ" && englishInheritanceForm(sonodName)}
            {sonodName == "বিবিধ প্রত্যয়নপত্র" &&
              englishInheritanceForm(sonodName)}
            {sonodName == "একই নামের প্রত্যয়ন" &&
              englishInheritanceForm(sonodName)}
            <div className="col-md-12">
              <div className="app-heading">Applicant Information</div>
            </div>
            {englishCommonFields()}
            {sonodName === "ট্রেড লাইসেন্স" && <EnglishTradeLicenseForm />}{" "}
            {/* Corrected JSX component call */}
            {englishConditionalForm(sonodName)}
          </div>
          {englishAddressFields({ form })}
          {englishAttachmentForm()}

          {sonodName === "ওয়ারিশান সনদ" &&
            englishInheritanceList(inherList, setInherList)}

          {sonodName === "উত্তরাধিকারী সনদ" &&
            englishInheritanceList(inherList, setInherList)}

          <div style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit" size="large">
              Submit
            </Button>
          </div>
        </div>
      </Form>

      <EnglishFormValueModal
        visible={modalVisible}
        data={userDta}
        bn={bn}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default UddoktaEnglishApplicationForm;
