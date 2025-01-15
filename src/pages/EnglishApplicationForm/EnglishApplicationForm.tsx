/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, Button, message } from "antd";

import { useEffect, useState } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useTradeInfoQuery } from "@/redux/api/user/userApi";
import { TApplicantData } from "@/types";
// import { useAppSelector } from "@/redux/features/hooks";
// import { RootState } from "@/redux/features/store";
import englishCommonFields from "./englishCommonFields";
import EnglishTradeLicenseForm from "./englishTradeLicenseForm";
import englishAddressFields from "./englishAddressFields";
import englishAttachmentForm from "./englishAttachmentForm";
import englishInheritanceList from "./englishInheritanceList";
import englishConditionalForm from "./englishConditionalForm";
import englishInheritanceForm from "./englishInheritanceForm";
import EnglishFormValueModal from "./EnglishFormValueModal";
import { useEnglishSonodUpdateMutation } from "@/redux/api/sonod/sonodApi";

const EnglishApplicationForm = ({ user }: { user?: TApplicantData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem(`token`);
  const [form] = Form.useForm();
  // const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
  const { service } = useParams<{ service: string }>();
  const [sonodName, setSonodName] = useState(service);
  const location = useLocation();
  const { state } = location || {};
  const bn = state?.userData;
  const [englishSonodUpdate, { isLoading: updating }] =
    useEnglishSonodUpdateMutation();
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
      const res = await englishSonodUpdate({
        data: values,
        id,
        token,
      }).unwrap();
      if (res.status_code === 200) {
        navigate(-1);
        message.success("সনদটি সফলভাবে আপডেট করা হয়েছে।");
      } else {
        message.error("সনদটি আপডেট করতে ব্যর্থ হয়েছে,আবার চেষ্টা করুন");
      }
    } else {
      setModalVisible(true);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const successorList =
    (user?.successor_list && JSON.parse(user?.successor_list)) || [];

  return (
    <div className={`${!isDashboard ? "container my-3" : ""}`}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          unioun_name: user?.unioun_name,
          sonod_name: user?.sonod_name,
          successor_father_name: user?.successor_father_name,
          successor_mother_name: user?.successor_mother_name,
          ut_father_name: user?.ut_father_name,
          ut_mother_name: user?.ut_mother_name,
          ut_grame: user?.ut_grame,
          ut_post: user?.ut_post,
          ut_thana: user?.ut_thana,
          ut_district: user?.ut_district,
          ut_word: user?.ut_word,
          successor_father_alive_status: user?.successor_father_alive_status,
          successor_mother_alive_status: user?.successor_mother_alive_status,
          applicant_holding_tax_number: user?.applicant_holding_tax_number,
          applicant_national_id_number: user?.applicant_national_id_number,
          applicant_birth_certificate_number:
            user?.applicant_birth_certificate_number,
          applicant_passport_number: user?.applicant_passport_number,

          family_name: user?.family_name,
          Annual_income: user?.Annual_income,
          Annual_income_text: user?.Annual_income_text,
          Subject_to_permission: user?.Subject_to_permission,
          disabled: user?.disabled,
          The_subject_of_the_certificate: user?.The_subject_of_the_certificate,
          Name_of_the_transferred_area: user?.Name_of_the_transferred_area,
          applicant_second_name: user?.applicant_second_name,
          applicant_owner_type: user?.applicant_owner_type,
          applicant_name_of_the_organization:
            user?.applicant_name_of_the_organization,
          organization_address: user?.organization_address,
          applicant_name: user?.applicant_name,
          utname: user?.utname,
          ut_religion: user?.ut_religion,
          alive_status: user?.alive_status,
          applicant_gender: user?.applicant_gender,
          applicant_marriage_status: user?.applicant_marriage_status,
          applicant_vat_id_number: user?.applicant_vat_id_number,
          applicant_tax_id_number: user?.applicant_tax_id_number,
          applicant_type_of_business: user?.applicant_type_of_business,
          applicant_type_of_businessKhat: user?.applicant_type_of_businessKhat,
          applicant_type_of_businessKhatAmount:
            user?.applicant_type_of_businessKhatAmount,
          applicant_father_name: user?.applicant_father_name,
          applicant_mother_name: user?.applicant_mother_name,
          applicant_occupation: user?.applicant_occupation,
          applicant_education: user?.applicant_education,
          applicant_religion: user?.applicant_religion,
          applicant_resident_status: user?.applicant_resident_status,
          applicant_present_village: user?.applicant_present_village,
          applicant_present_road_block_sector:
            user?.applicant_present_road_block_sector,
          applicant_present_word_number: user?.applicant_present_word_number,
          applicant_present_district: user?.applicant_present_district,
          applicant_present_Upazila: user?.applicant_present_Upazila,
          applicant_present_post_office: user?.applicant_present_post_office,
          applicant_permanent_village: user?.applicant_permanent_village,
          applicant_permanent_road_block_sector:
            user?.applicant_permanent_road_block_sector,
          applicant_permanent_word_number:
            user?.applicant_permanent_word_number,
          applicant_permanent_district: user?.applicant_permanent_district,
          applicant_permanent_Upazila: user?.applicant_permanent_Upazila,
          applicant_permanent_post_office:
            user?.applicant_permanent_post_office,
          successor_list: successorList,
          applicant_mobile: user?.applicant_mobile,
          applicant_email: user?.applicant_email,
          applicant_phone: user?.applicant_phone,
          applicant_national_id_front_attachment:
            user?.applicant_national_id_front_attachment,
          applicant_national_id_back_attachment:
            user?.applicant_national_id_back_attachment,
          applicant_birth_certificate_attachment:
            user?.applicant_birth_certificate_attachment,
          prottoyon: user?.prottoyon,
        }}
      >
        <div>
          <div
            className="panel-heading"
            style={{
              fontWeight: "bold",
              fontSize: "20px",
             
              textAlign: "center",
              color: "white",
            }}
          >
            <span> {sonodName || "Form Title"}</span>
          </div>
        </div>
        <div className="form-pannel">
          <h6 className="border-bottom border-danger fs-5 fw-bold text-center text-danger">
            *সকল তথ্য ইংরেজিতে লিখতে হবে
          </h6>
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
              <div className="app-heading">আবেদনকারীর তথ্য</div>
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
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              disabled={updating}
              loading={updating}
            >
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

export default EnglishApplicationForm;
