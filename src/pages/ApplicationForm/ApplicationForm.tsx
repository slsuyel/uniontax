/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, Button, message /* Modal */ } from "antd";
import addressFields from "./addressFields";
import attachmentForm from "./attachmentForm";

import { useEffect, useState } from "react";
import TradeLicenseForm from "./tradeLicenseForm";

import InheritanceForm from "./inheritanceForm";
import commonFields from "./commonFields";

import conditionalForm from "./conditionalForm";

import FormValueModal from "@/components/ui/FormValueModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTradeInfoQuery } from "@/redux/api/user/userApi";
import { TApplicantData } from "@/types";
import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
import { useSonodUpdateMutation } from "@/redux/api/sonod/sonodApi";
import InheritanceList from "./inheritanceList";
// const { confirm } = Modal;
const ApplicationForm = ({ user }: { user?: TApplicantData }) => {
  /* ```````````` */
  const [fetchedUser, setFetchedUser] = useState<TApplicantData | null>(null);

  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [birthCertificateFile, setBirthCertificateFile] = useState<File | null>(
    null
  );
  /* ```````````` */
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem(`token`);
  const [form] = Form.useForm();
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
  const { service } = useParams<{ service: string }>();
  const [sonodName, setSonodName] = useState(service);

  const postOffices = unionInfo?.post_offices || [];
  const addressFieldsProps = { form, postOffices };

  const [updateSonod, { isLoading: updating }] = useSonodUpdateMutation();
  const { data, isLoading } = useTradeInfoQuery(
    { unionName: unionInfo?.short_name_e },
    {
      skip: !unionInfo?.short_name_e || sonodName !== "ট্রেড লাইসেন্স",
    }
  );
  const location = useLocation();
  const pathname = location.pathname;
  const isDashboard = pathname.includes("dashboard");

  const [userDta, setUserData] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

  // Extract the 'id' query parameter from the URL
  const queryParams = new URLSearchParams(location.search);
  const idFromUrl = queryParams.get("id");

    // If no id is provided, use the `user` prop to populate the form data
    useEffect(() => {
      if (idFromUrl) {
        // Fetch the data based on the `id` parameter
        const fetchUser = async () => {
          try {
            const response = await fetch(`${BASE_API_URL}/sonod/search/for/re-applicaion?id=${idFromUrl}`);
            const result = await response.json();
            if (result?.data) {
              setFetchedUser(result.data);
         
              form.setFieldsValue(result.data); // Set form values after fetching
            }
          } catch (error) {
            console.error("Failed to fetch user by ID:", error);
          }
        };
        fetchUser();
      } else {
        setFetchedUser(user || null);
        form.setFieldsValue(user || {}); // Set form values from the `user` prop
      }
    }, [idFromUrl, service, user, form]);






  const sonodInfo = fetchedUser;

  useEffect(() => {
    if (isDashboard && sonodInfo?.sonod_name) {
      setSonodName(sonodInfo?.sonod_name);
    } else {
      setSonodName(service);
    }
  }, [isDashboard, sonodInfo?.sonod_name, service]);

  const handleSubmitForm = async (values: any) => {
    const files = {
      frontFile,
      backFile,
      birthCertificateFile,
    };

    const updatedData = { ...values, ...files };

    // console.log(updatedData);
    // return;
    try {
      setUserData(updatedData);
      if (isDashboard) {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (typeof value === "string" || typeof value === "number") {
            formData.append(key, value.toString());
          }
        });
        
        if (frontFile)
          formData.append("applicant_national_id_front_attachment", frontFile);
        if (backFile)
          formData.append("applicant_national_id_back_attachment", backFile);
        if (birthCertificateFile)
          formData.append(
            "applicant_birth_certificate_attachment",
            birthCertificateFile
          );
        if (values.successor_list) {
          formData.append(
            "successor_list",
            JSON.stringify(values.successor_list)
          );
        }

        const res = await updateSonod({ formData, id, token }).unwrap();

        console.log("res---", res);
        // return;
        if (res.status_code === 200) {
          navigate(-1);
          message.success("সনদটি সফলভাবে আপডেট করা হয়েছে।");
        } else {
          message.error("সনদটি আপডেট করতে ব্যর্থ হয়েছে,আবার চেষ্টা করুন");
        }
      } else {
        // return
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



  const successorList = Array.isArray(sonodInfo?.successor_list)
    ? sonodInfo?.successor_list
    : (() => {
        try {
          return JSON.parse(sonodInfo?.successor_list || "[]");
        } catch {
          return [];
        }
      })();

  return (
    <div className={`${!isDashboard ? "container my-3" : ""}`}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmitForm}
        initialValues={{
          unioun_name: sonodInfo?.unioun_name,
          sonod_name: sonodInfo?.sonod_name,
          successor_father_name: sonodInfo?.successor_father_name,
          successor_mother_name: sonodInfo?.successor_mother_name,
          ut_father_name: sonodInfo?.ut_father_name,
          ut_mother_name: sonodInfo?.ut_mother_name,
          ut_grame: sonodInfo?.ut_grame,
          ut_post: sonodInfo?.ut_post,
          last_years_money: sonodInfo?.last_years_money ?? 0,
          ut_thana: sonodInfo?.ut_thana,
          ut_district: sonodInfo?.ut_district,
          ut_word: sonodInfo?.ut_word,
          successor_father_alive_status: sonodInfo?.successor_father_alive_status,
          successor_mother_alive_status: sonodInfo?.successor_mother_alive_status,
          applicant_holding_tax_number: sonodInfo?.applicant_holding_tax_number,
          applicant_national_id_number: sonodInfo?.applicant_national_id_number,
          applicant_birth_certificate_number:
            sonodInfo?.applicant_birth_certificate_number,
          applicant_passport_number: sonodInfo?.applicant_passport_number,

          family_name: sonodInfo?.family_name,
          Annual_income: sonodInfo?.Annual_income,
          Annual_income_text: sonodInfo?.Annual_income_text,
          Subject_to_permission: sonodInfo?.Subject_to_permission,
          disabled: sonodInfo?.disabled,
          The_subject_of_the_certificate: sonodInfo?.The_subject_of_the_certificate,
          Name_of_the_transferred_area: sonodInfo?.Name_of_the_transferred_area,
          applicant_second_name: sonodInfo?.applicant_second_name,
          applicant_owner_type: sonodInfo?.applicant_owner_type,
          applicant_name_of_the_organization:
            sonodInfo?.applicant_name_of_the_organization,
          organization_address: sonodInfo?.organization_address,
          applicant_name: sonodInfo?.applicant_name,
          utname: sonodInfo?.utname,
          orthoBchor: sonodInfo?.orthoBchor,
          ut_religion: sonodInfo?.ut_religion,
          alive_status: sonodInfo?.alive_status,
          applicant_gender: sonodInfo?.applicant_gender,
          applicant_marriage_status: sonodInfo?.applicant_marriage_status,
          applicant_vat_id_number: sonodInfo?.applicant_vat_id_number,
          applicant_tax_id_number: sonodInfo?.applicant_tax_id_number,
          applicant_type_of_business: sonodInfo?.applicant_type_of_business,
          applicant_type_of_businessKhat: sonodInfo?.applicant_type_of_businessKhat,
          applicant_type_of_businessKhatAmount:
            sonodInfo?.applicant_type_of_businessKhatAmount,
          applicant_father_name: sonodInfo?.applicant_father_name,
          applicant_mother_name: sonodInfo?.applicant_mother_name,
          applicant_occupation: sonodInfo?.applicant_occupation,
          applicant_education: sonodInfo?.applicant_education,
          applicant_religion: sonodInfo?.applicant_religion,
          applicant_resident_status: sonodInfo?.applicant_resident_status,
          applicant_present_village: sonodInfo?.applicant_present_village,
          applicant_present_road_block_sector:
            sonodInfo?.applicant_present_road_block_sector,
          applicant_present_word_number: sonodInfo?.applicant_present_word_number,
          applicant_present_district: sonodInfo?.applicant_present_district,
          applicant_present_Upazila: sonodInfo?.applicant_present_Upazila,
          applicant_present_post_office: sonodInfo?.applicant_present_post_office,
          applicant_permanent_village: sonodInfo?.applicant_permanent_village,
          applicant_permanent_road_block_sector:
            sonodInfo?.applicant_permanent_road_block_sector,
          applicant_permanent_word_number:
            sonodInfo?.applicant_permanent_word_number,
          applicant_permanent_district: sonodInfo?.applicant_permanent_district,
          applicant_permanent_Upazila: sonodInfo?.applicant_permanent_Upazila,
          applicant_permanent_post_office:
            sonodInfo?.applicant_permanent_post_office,
          successor_list: successorList,
          applicant_mobile: sonodInfo?.applicant_mobile,
          applicant_date_of_birth: sonodInfo?.applicant_date_of_birth,
          applicant_email: sonodInfo?.applicant_email,
          applicant_phone: sonodInfo?.applicant_phone,
          applicant_national_id_front_attachment:
            sonodInfo?.applicant_national_id_front_attachment,
          applicant_national_id_back_attachment:
            sonodInfo?.applicant_national_id_back_attachment,
          applicant_birth_certificate_attachment:
            sonodInfo?.applicant_birth_certificate_attachment,
          prottoyon: sonodInfo?.prottoyon,
        }}
      >
        <div
          className="panel-heading"
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            background: "green",
            textAlign: "center",
            color: "white",
          }}
        >
          {sonodName || "Form Title"}
        </div>
        <div className="form-pannel">
          <div className="row">
            {sonodName == "উত্তরাধিকারী সনদ" && InheritanceForm(sonodName)}
            {/* {sonodName == "উত্তরাধিকারী সনদ" && InheritanceForm(sonodName)} */}
            {sonodName == "ওয়ারিশান সনদ" && InheritanceForm(sonodName)}
            {sonodName == "বিবিধ প্রত্যয়নপত্র" && InheritanceForm(sonodName)}
            {sonodName == "একই নামের প্রত্যয়ন" && InheritanceForm(sonodName)}
            <div className="col-md-12">
              <div className="app-heading">আবেদনকারীর তথ্য</div>
            </div>
            {commonFields({ form, setFormData: form.setFieldsValue })}
            {sonodName === "ট্রেড লাইসেন্স" && (
              <TradeLicenseForm data={data} isLoading={isLoading} form={form} />
            )}{" "}
            {/* Corrected JSX component call */}
            {conditionalForm(sonodName)}
          </div>
            {addressFields(addressFieldsProps)}
          {attachmentForm({
            setFrontFile,
            setBackFile,
            setBirthCertificateFile,
          })}

          {sonodName === "ওয়ারিশান সনদ" && <InheritanceList />}

          {sonodName === "উত্তরাধিকারী সনদ" && <InheritanceList />}

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

export default ApplicationForm;
