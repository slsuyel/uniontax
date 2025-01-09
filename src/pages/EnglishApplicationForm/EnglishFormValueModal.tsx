/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSonodApplyMutation } from "@/redux/api/user/userApi";
import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";

import { TApplicantData } from "@/types";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { Button, message, Modal } from "antd";
import { useParams } from "react-router-dom";

interface EnglishFormValueModalProps {
  visible: boolean;
  data?: TApplicantData & { [key: string]: any };
  bn?: TApplicantData & { [key: string]: any };
  onCancel: () => void;
  from?: string;
}

const EnglishFormValueModal = ({
  visible,
  data,
  bn,
  onCancel,
  from,
}: EnglishFormValueModalProps) => {
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
  const sonodList = useAppSelector((state: RootState) => state.union.sonodList);
  const { service } = useParams<{ service: string }>();
  const sonod = sonodList.find((d) => d.bnname == service);
  const tradeFee = useAppSelector((state: RootState) => state.union.tradeFee);
  const [sonodApply, { isLoading }] = useSonodApplyMutation();

  const handleCancel = () => {
    onCancel();
  };
  const formattedDate = getFormattedDate(data?.applicant_date_of_birth || null);
  const token = localStorage.getItem("token");
  const handlePayment = async () => {
    const additionalData = {
      applicant_date_of_birth: formattedDate,
      unioun_name: unionInfo?.short_name_e,
      sonod_name: service,
      s_uri: window.origin + "/payment-success",
      f_uri: window.origin + "/payment-failed",
      c_uri: window.origin + "/payment-cancel",
    };
    // const updatedData = { ...data, ...additionalData };

    const payload = {
      bn: { ...bn, ...additionalData },
      en: { ...data, ...additionalData },
    };

    console.log({ ...payload, token });
    // return;
    try {
      const response = await sonodApply({ ...payload, token }).unwrap();

      console.log(response);
      if (response.status_code === 200) {
        message.success("You are redirect to payment gateway");
        window.location.href = response.data.redirect_url;
      }
    } catch (error) {
      message.error("An error occurred while processing your request");
    }
  };

  const fees =
    service === "ট্রেড লাইসেন্স"
      ? tradeFee
        ? Number(tradeFee) + Number(sonod?.sonod_fees) * 1.15
        : Number(sonod?.sonod_fees)
      : Number(sonod?.sonod_fees);

  return (
    <Modal
      width={800}
      open={visible}
      onCancel={handleCancel}
      footer={
        <Button danger onClick={handleCancel}>
          Close
        </Button>
      }
    >
      <div>
        <div className="row w-100 mx-auto">
          <div className="col-md-12">
            <div className="app-heading">
              আবেদনকারীর তথ্য (Applicant Information)
            </div>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>আবেদনকারীর নাম (Applicant Name): </b>
            {data?.applicant_name}
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>লিঙ্গ (Gender): {data?.applicant_gender} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>
              পিতার/স্বামীর নাম (Father's/Husband's Name):{" "}
              {data?.applicant_father_name}
            </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>মাতার নাম (Mother's Name): {data?.applicant_mother_name}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>
              জাতীয় পরিচয়পত্র নম্বর (National ID):{" "}
              {data?.applicant_national_id_number}
            </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>
              জন্ম নিবন্ধন নম্বর (Birth Certificate Number):{" "}
              {data?.applicant_birth_certificate_number}{" "}
            </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>
              হোল্ডিং নম্বর (Holding Number):{" "}
              {data?.applicant_holding_tax_number}{" "}
            </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>জন্ম তারিখ (Date of Birth): {formattedDate} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>পাসপোর্ট নম্বর (Passport Number): </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>বৈবাহিক অবস্থা (Marital Status): </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>পেশা (Occupation): </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>শিক্ষাগত যোগ্যতা (Educational Qualification): </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>ধর্ম (Religion): {data?.applicant_religion}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>
              বাসিন্দার অবস্থা (Resident Status):{" "}
              {data?.applicant_resident_status}{" "}
            </b>
          </div>
          <div className="col-md-12 col-12 mt-3">
            <b>
              আবেদিত সনদ (Applied Certification): <br />
            </b>
          </div>
          <div className="col-md-12">
            <div className="app-heading">বর্তমান ঠিকানা (Present Address)</div>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>
              গ্রাম/মহল্লা (Village/Moholla): {data?.applicant_present_village}{" "}
            </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>রোড/ব্লক/সেক্টর (Road/Block/Sector): </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>
              ওয়ার্ড নম্বর (Ward Number): {data?.applicant_present_word_number}
            </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>জেলা (District): {data?.applicant_present_district}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>
              উপজেলা/থানা (Upazila/Thana): {data?.applicant_present_Upazila}
            </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>
              পোস্ট অফিস (Post Office): {data?.applicant_present_post_office}{" "}
            </b>
          </div>
          <div className="col-md-12">
            <div className="app-heading">স্থায়ী ঠিকানা (Permanent Address)</div>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>
              গ্রাম/মহল্লা (Village/Moholla):{" "}
              {data?.applicant_permanent_village}{" "}
            </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>রোড/ব্লক/সেক্টর (Road/Block/Sector): </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>
              ওয়ার্ড নম্বর (Ward Number):{" "}
              {data?.applicant_permanent_word_number}{" "}
            </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>জেলা (District): {data?.applicant_permanent_district} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>
              উপজেলা/থানা (Upazila/Thana): {data?.applicant_permanent_Upazila}
            </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>
              পোস্ট অফিস (Post Office): {data?.applicant_permanent_post_office}
            </b>
          </div>
          <div className="col-md-12">
            <div className="app-heading">
              যোগাযোগের তথ্য (Contact Information)
            </div>
          </div>
          <div className="col-md-6 col-6 mt-3">
            <b>মোবাইল নম্বর (Mobile): {data?.applicant_mobile}</b>
          </div>
          <div className="col-md-6 col-6 mt-3">
            <b>ইমেইল (Email): {data?.applicant_email}</b>
          </div>
          <div className="col-md-12">
            <div className="app-heading">সংযুক্তি (Attachments)</div>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <span>জাতীয় পরিচয়পত্র (সামনের পৃষ্ঠা) (National ID - Front)</span>{" "}
            <br />
          </div>
          <div className="col-md-4 col-6 mt-3">
            <span>জাতীয় পরিচয়পত্র (পিছনের পৃষ্ঠা) (National ID - Back)</span>{" "}
            <br />
          </div>
          <div className="col-md-4 col-6 mt-3">
            <span>জন্ম নিবন্ধন (Birth Certificate)</span> <br />{" "}
            <img width="100%" alt="" />
          </div>
          <hr />

          <div className="row mx-auto">
            <div className="col-md-12">
              <div className="app-heading">
                উত্তরাধিকারীদের তালিকা (List of Successors)
              </div>
            </div>
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>নাম (Name)</th>
                  <th>সম্পর্ক (Relation)</th>
                  <th>জন্ম তারিখ (Date of Birth)</th>
                  <th>
                    জাতীয় পরিচয়পত্র / জন্মনিবন্ধন (National ID / Birth
                    Certificate)
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.successor_list?.map((successor: any, index: number) => (
                  <tr key={index}>
                    <td>{successor.w_name}</td>
                    <td>{successor.w_relation}</td>
                    <td></td>
                    {/* <td>{successor?.w_age}</td> */}
                    <td>{successor.w_nid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <br /> <br />
        {/* {fees} */}
        {from !== "dashboard" && (
          <div className="text-center col-md-7 mx-auto">
            <h3>
              অনুগ্রহ করে আপনার আবেদন সম্পূর্ণ করতে ফি প্রদান করুন। {service} এর
              ফি হল {fees * 2} টাকা।
            </h3>
            <button
              disabled={isLoading}
              onClick={handlePayment}
              type="submit"
              className="border-1 btn_main text-nowrap w-100"
            >
              {isLoading ? "অপেক্ষা করুন" : "ফি প্রদান করুন এবং জমা দিন"}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EnglishFormValueModal;
