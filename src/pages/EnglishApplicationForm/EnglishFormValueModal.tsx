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

    try {
      const response = await sonodApply(payload).unwrap();
      console.log(response);
      if (response.status_code === 200) {
        message.success("You are redirect to payment gateway");
        window.location.href = response.data.redirect_url;
      }
    } catch (error) {
      message.error("An error occurred while processing your request");
    }
  };

  const getSuccessorList = () => {
    const successors = [];
    let index = 0;

    while (true) {
      const name = data?.[`successor_list[${index}].w_name`];
      const relation = data?.[`successor_list[${index}].w_relation`];
      const dob = data?.[`successor_list[${index}].w_dob`];
      const nid = data?.[`successor_list[${index}].w_nid`];

      if (!name) break;

      successors.push({
        w_name: name,
        w_relation: relation,
        w_dob: dob,
        w_nid: nid,
      });

      index++;
    }

    return successors;
  };
  const successorList = getSuccessorList();

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
            <div className="app-heading">Applicant Information</div>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Applicant Name: </b>
            {data?.applicant_name}
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Gender: {data?.applicant_gender} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Father's/Husband's Name: {data?.applicant_father_name}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Mother's Name: </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>National ID: {data?.applicant_national_id_number}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>
              Birth Certificate Number:{" "}
              {data?.applicant_birth_certificate_number}{" "}
            </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Holding Number: {data?.applicant_holding_tax_number} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Date of Birth: {formattedDate} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Passport Number: </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Marital Status: </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Occupation: </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Educational Qualification: </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Religion: {data?.applicant_religion}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Resident Status: {data?.applicant_resident_status} </b>Permanent
          </div>
          <div className="col-md-12 col-12 mt-3">
            <b>
              Applied Certification: <br />
            </b>
          </div>
          <div className="col-md-12">
            <div className="app-heading">Present Address</div>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Village/Moholla: {data?.applicant_present_village} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Road/Block/Sector: </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Ward Number: {data?.applicant_present_word_number}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>District: {data?.applicant_present_district}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Upazila/Thana: {data?.applicant_present_Upazila}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Post Office: {data?.applicant_present_post_office} </b>
          </div>
          <div className="col-md-12">
            <div className="app-heading">Permanent Address</div>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Village/Moholla: {data?.applicant_permanent_village} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Road/Block/Sector: </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Ward Number: {data?.applicant_permanent_word_number} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>District: {data?.applicant_permanent_district} </b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Upazila/Thana: {data?.applicant_permanent_Upazila}</b>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <b>Post Office: {data?.applicant_permanent_post_office}</b>
          </div>
          <div className="col-md-12">
            <div className="app-heading">Contact Information</div>
          </div>
          <div className="col-md-6 col-6 mt-3">
            <b>Mobile: {data?.applicant_mobile}</b>
          </div>
          <div className="col-md-6 col-6 mt-3">
            <b>Email: {data?.applicant_email}</b>
          </div>
          <div className="col-md-12">
            <div className="app-heading">Attachments</div>
          </div>
          <div className="col-md-4 col-6 mt-3">
            <span>National ID (Front page)</span> <br />
          </div>
          <div className="col-md-4 col-6 mt-3">
            <span>National ID (Back page)</span> <br />
          </div>
          <div className="col-md-4 col-6 mt-3">
            <span>Birth Certificate</span> <br /> <img width="100%" alt="" />
          </div>
          <hr />

          <div className="row mx-auto">
            <div className="col-md-12">
              <div className="app-heading">List of Successors</div>
            </div>
            {successorList.map((successor, index) => (
              <div key={index} className="col-md-12 mt-3">
                <div className="row">
                  <div className="col-md-3">
                    <b>Name: {successor.w_name}</b>
                  </div>
                  <div className="col-md-3">
                    <b>Relation: {successor.w_relation}</b>
                  </div>
                  <div className="col-md-3">
                    <b>
                      Date of Birth:{" "}
                      {new Date(successor.w_dob).toLocaleDateString()}
                    </b>
                  </div>
                  <div className="col-md-3">
                    <b>National ID / Birth Certificate: {successor.w_nid}</b>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <br /> <br />
        {/* {fees} */}
        {from !== "dashboard" && (
          <div className="text-center col-md-7 mx-auto">
            <h3>
              Please pay the fee to complete your application. The fee for{" "}
              {service} is {fees * 2} Taka.
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

export default EnglishFormValueModal;
