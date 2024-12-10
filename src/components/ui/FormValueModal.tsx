import { useSonodApplyMutation } from "@/redux/api/user/userApi";
import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";

import { TApplicantData } from "@/types";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { Button, message, Modal } from "antd";
import { useParams } from "react-router-dom";

interface FormValueModalProps {
  visible: boolean;
  data?: TApplicantData;
  onCancel: () => void;
  from?: string;
}

const FormValueModal = ({
  visible,
  data,
  onCancel,
  from,
}: FormValueModalProps) => {
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
  const sonodList = useAppSelector((state: RootState) => state.union.sonodList);
  const { service } = useParams<{ service: string }>();
  const sonod = sonodList.find((d) => d.bnname == service);
  const tradeFee = useAppSelector((state: RootState) => state.union.tradeFee);
  const [sonodApply, { isLoading }] = useSonodApplyMutation();

  console.log(tradeFee);

  const handleCancel = () => {
    onCancel();
  };
  const formattedDate = getFormattedDate(data?.applicant_date_of_birth || null);

  const handlePayment = async () => {
    const additionalData = {
      applicant_date_of_birth: formattedDate,
      unioun_name: unionInfo?.short_name_e,
      sonod_name: service,
      s_uri: window.origin + "/payment-success",
      f_uri: window.origin + "/payment-failed",
      c_uri: window.origin + "/payment-cancel",
    };
    const updatedData = { ...data, ...additionalData };
    try {
      const response = await sonodApply(updatedData).unwrap();
      console.log(response);
      if (response.status_code === 200) {
        message.success("You are redirect to payment gateway");
        window.location.href = response.data.redirect_url;
      }
    } catch (error) {
      message.error("An error occurred while processing your request");
    }
  };

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
            <div className="app-heading">আবেদনকারীর তথ্য</div>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>আবেদনকারীর নাম : </b>
            {data?.applicant_name}
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>লিঙ্গ :{data?.applicant_gender} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>পিতা/স্বামীর নাম : {data?.applicant_father_name}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>মাতার নাম : </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>ন্যাশনাল আইডি : {data?.applicant_national_id_number}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>জন্ম নিবন্ধন নং : {data?.applicant_birth_certificate_number} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>হোল্ডিং নং : {data?.applicant_holding_tax_number} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>জম্ম তারিখ : {formattedDate} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>পাসপোর্ট নং : </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>বৈবাহিক সম্পর্ক : </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>পেশা: </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>শিক্ষাগত যোগ্যতা: </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>ধর্ম: {data?.applicant_religion}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>বাসিন্দা: {data?.applicant_resident_status} </b>স্থায়ী
          </div>
          <div className="col-md-12 col-12 mt-3">
            <b>
              আবেদনকৃত প্রত্যয়নের : <br />
            </b>
          </div>
          <div className="col-md-12">
            <div className="app-heading">বর্তমান ঠিকানা</div>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>গ্রাম/মহল্লা: {data?.applicant_present_village} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>রোড/ব্লক/সেক্টর: </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>ওয়ার্ড নং: {data?.applicant_present_word_number}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>জেলা: {data?.applicant_present_district}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>উপজেলা/থানা: {data?.applicant_present_Upazila}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>পোষ্ট অফিস: {data?.applicant_present_post_office} </b>
          </div>
          <div className="col-md-12">
            <div className="app-heading">স্থায়ী ঠিকানা</div>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>গ্রাম/মহল্লা: {data?.applicant_permanent_village} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>রোড/ব্লক/সেক্টর: </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>ওয়ার্ড নং: {data?.applicant_permanent_word_number} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>জেলা: {data?.applicant_permanent_district} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>উপজেলা/থানা: {data?.applicant_permanent_Upazila}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>পোষ্ট অফিস: {data?.applicant_permanent_post_office}</b>
          </div>
          <div className="col-md-12">
            <div className="app-heading">যোগাযোগের ঠিকানা</div>
          </div>
          <div className="col-md-6 col-6 mt-3">
            <b>মোবাইল: {data?.applicant_mobile}</b>
          </div>
          <div className="col-md-6 col-6 mt-3">
            <b>ইমেল: {data?.applicant_email}</b>
          </div>
          <div className="col-md-12">
            <div className="app-heading">সংযুক্ত</div>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <span>ন্যাশনাল আইডি (Front page)</span> <br />
          </div>
          <div className="col-md-4 col-6 mt-3">
            <span>ন্যাশনাল আইডি (Back page)</span> <br />
          </div>
          <div className="col-md-4 col-6 mt-3">
            <span>জন্ম নিবন্ধন</span> <br /> <img width="100%" alt="" />
          </div>
        </div>
        <br /> <br />
        {from !== "dashboard" && (
          <div
            className="text-center"
            style={{ width: "50%", margin: "0px auto" }}
          >
            <h3>
              আপনার আবেদনটি সফল করার জন্য সনদের ফি প্রদান করুন । {service} এর ফি{" "}

              {service === "ট্রেড লাইসেন্স" ? (tradeFee ? Number(tradeFee) + (Number(sonod?.sonod_fees) * 1.15) : Number(sonod?.sonod_fees)) : sonod?.sonod_fees}
              {' '}

              টাকা
              ।
            </h3>
            <button
              disabled={isLoading}
              onClick={handlePayment}
              type="submit"
              className="border-1 btn_main text-nowrap w-100"
            >
              {isLoading ? "Please wait" : "Pay And Submit"}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default FormValueModal;
