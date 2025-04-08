/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button, message, Input, Select, Modal } from "antd";
import { SetStateAction, useEffect, useState } from "react";
import FormValueModal from "@/components/ui/FormValueModal";
import { useNavigate, useParams } from "react-router-dom";
import { useTradeInfoQuery } from "@/redux/api/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
import inheritanceList from "../ApplicationForm/inheritanceList";
import conditionalForm from "../ApplicationForm/conditionalForm";
import commonFields from "../ApplicationForm/commonFields";
import InheritanceForm from "../ApplicationForm/inheritanceForm";
import addressFields from "../ApplicationForm/addressFields";
// import attachmentForm from "../ApplicationForm/attachmentForm";
import TradeLicenseForm from "../ApplicationForm/tradeLicenseForm";
import DatePicker from "react-datepicker";
import { TApplicantData, TPersonalInformation } from "@/types/global";
import { setApplicantInfo } from "@/redux/features/application/applicantSlice";
import { useNidCheckMutation } from "@/redux/api/sonod/sonodApi";

const { Option } = Select;

const UddoktaApplicationForm = () => {
  const informations = useAppSelector(
    (state: RootState) => state.informations.data
  );
  const last_sonod = useAppSelector(
    (state: RootState) => state.informations.lastApplicationSonodName
  );
  const token = localStorage.getItem("token");
  const [nidCheck, { isLoading: checkingNid }] = useNidCheckMutation();
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [form] = Form.useForm<TApplicantData>();
  const navigate = useNavigate();
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
  const { service } = useParams<{ service: string }>();
  const [selectedIdType, setSelectedIdType] = useState("nid");
  const { data, isLoading } = useTradeInfoQuery(
    { unionName: unionInfo?.short_name_e },
    {
      skip: !unionInfo?.short_name_e || service !== "ট্রেড লাইসেন্স",
    }
  );
  const dispatch = useAppDispatch();
  const [inherList, setInherList] = useState(1);
  const [userData, setUserData] = useState();
  const [modalVisible, setModalVisible] = useState(false);

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
  // console.log(userData);
  useEffect(() => {
    if (last_sonod && informations?.fullNameBN && last_sonod !== service) {
      Modal.confirm({
        title: `আপনি ইতোপূর্বে ${informations?.fullNameBN} এর জন্যে একটি ${last_sonod} এর আবেদন করার চেষ্টা করেছেন।`,
        content: `অনুগ্রহ করে আবেদনটি সম্পন্য করে নতুন আবেদনের চেষ্টা করুন।`,
        okText: "OK",
        cancelButtonProps: { style: { display: "none" } },
        onOk() {
          navigate(`/uddokta/application/${last_sonod}`);
        },
      });
    }
  }, [informations?.fullNameBN, last_sonod, navigate, service]);

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleIdTypeChange = (value: SetStateAction<string>) => {
    setSelectedIdType(value);
  };

  useEffect(() => {
    if (informations) {
      form.setFieldsValue({
        applicant_name: informations.fullNameBN,
        applicant_gender: informations.gender === "male" ? "পুরুষ" : "মহিলা",
        applicant_father_name: informations.fathersNameBN,
        applicant_mother_name: informations.mothersNameBN,
        applicant_national_id_number: informations.nationalIdNumber,
        applicant_birth_certificate_number:
          informations.birthRegistrationNumber,
        applicant_permanent_district: informations.permanentDistrict,
        applicant_present_district: informations.presentDistrict,
        applicant_present_Upazila: informations.presentThana,
        applicant_permanent_Upazila: informations.permanentThana,
        applicant_present_post_office: informations.presentPost,
        applicant_permanent_post_office: informations.permanentPost,
        unioun_name: informations.permanentUnion,
        applicant_present_village: informations.presentVillage,
        applicant_permanent_village: informations.permanentVillage,
      });
    }
  }, [informations, form]);

  const handleCheckNid = async (values: any) => {
    try {
      const date = new Date(values.dateOfBirth);
      const localDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const formattedDate = `${localDate.getFullYear()}-${(
        localDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${localDate.getDate().toString().padStart(2, "0")}`;

      const payload = {
        nidNumber: values.nidNumber,
        dateOfBirth: formattedDate,
        sonod_name: service,
      };
      const res = await nidCheck({ data: payload, token }).unwrap();
      const info: TPersonalInformation = res?.data?.informations;
      dispatch(setApplicantInfo(info));
      form.setFieldsValue({
        applicant_name: info?.fullNameBN,
        applicant_gender: info?.gender == "male" ? "পুরুষ" : "মহিলা",
        applicant_father_name: info?.fathersNameBN,
        applicant_mother_name: info?.mothersNameBN,
        applicant_national_id_number: info?.nationalIdNumber,
        applicant_birth_certificate_number: info?.birthRegistrationNumber,
        applicant_permanent_district: info.permanentDistrict,
        applicant_present_district: info.presentDistrict,
        applicant_present_Upazila: info.presentThana,
        applicant_permanent_Upazila: info.permanentThana,
        applicant_present_post_office: info.presentPost,
        applicant_permanent_post_office: info.permanentPost,
        unioun_name: info.permanentUnion,
        applicant_present_village: info.presentVillage,
        applicant_permanent_village: info.permanentVillage,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={`container my-3`}>
      {!informations && (
        <Form
          layout="vertical"
          onFinish={handleCheckNid}
          className=" border rounded p-3"
        >
          <div className=" row">
            <Form.Item
              className="col-md-4"
              label="আইডির ধরণ"
              name="idType"
              initialValue="nid"
              rules={[{ required: true, message: "Please select the ID type" }]}
            >
              <Select
                style={{ height: 40, width: "100%" }}
                placeholder="Select ID Type"
                onChange={handleIdTypeChange}
              >
                <Option value="nid">জাতীয় পরিচয়পত্র (NID)</Option>
                <Option value="birthCertificate">
                  জন্ম নিবন্ধন (Birth Certificate)
                </Option>
              </Select>
            </Form.Item>
          </div>

          <div className="align-items-end d-flex gap-3">
            <div className="">
              <Form.Item
                label={`${
                  selectedIdType == "birthCertificate"
                    ? "জন্ম নিবন্ধন "
                    : "জাতীয় পরিচয়পত্র"
                } নাম্বার`}
                name="nidNumber"
                rules={[
                  { required: true, message: "Please enter your number" },
                ]}
              >
                <Input
                  type="number"
                  style={{ height: 40, width: "100%" }}
                  className="form-control"
                />
              </Form.Item>
            </div>
            <div className="align-items-end d-flex gap-3">
              <Form.Item
                label="জন্ম তারিখ"
                name="dateOfBirth"
                rules={[
                  {
                    required: true,
                    message: "Please enter your date of birth",
                  },
                ]}
              >
                <DatePicker
                  className="form-control w-100"
                  selected={dateOfBirth}
                  onChange={(date) => {
                    if (date) {
                      setDateOfBirth(new Date(date));
                    } else {
                      setDateOfBirth(null);
                    }
                  }}
                />
              </Form.Item>
              <Form.Item label="">
                <Button
                  loading={checkingNid}
                  disabled={checkingNid}
                  size="large"
                  type="primary"
                  htmlType="submit"
                >
                  খুজুন
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      )}

      <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
        <div
          className="panel-heading"
          style={{
            fontWeight: "bold",
            fontSize: "20px",

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
            {service == "বিবিধ প্রত্যয়নপত্র" && InheritanceForm(service)}
            {service == "একই নামের প্রত্যয়ন" && InheritanceForm(service)}
            <div className="col-md-12">
              <div className="app-heading">আবেদনকারীর তথ্য</div>
            </div>
            {commonFields({ form, setFormData: form.setFieldsValue })}
            {service === "ট্রেড লাইসেন্স" && (
              <TradeLicenseForm data={data} isLoading={isLoading} form={form} />
            )}
            {conditionalForm(service)}
          </div>
          {addressFields({ form })}
          {/* {attachmentForm()} */}

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
        data={userData}
        from="uddokta"
        onCancel={handleCancel}
      />
    </div>
  );
};

export default UddoktaApplicationForm;
