/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSonodApplyMutation } from "@/redux/api/user/userApi";
import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";

import { TApplicantData } from "@/types";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { Button, message, Modal } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface FormValueModalProps {
  visible: boolean;
  data?: TApplicantData & { [key: string]: any };
  onCancel: () => void;
  from?: string;
}

const FormValueModal = ({
  visible,
  data,
  onCancel,
  from,
}: FormValueModalProps) => {
  const token = localStorage.getItem("token");
  const [banglaSonod, setBanglaSonod] = useState(false);
  const navigate = useNavigate();
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
  // console.log(data?.image?.thumbUrl);
  const imageFile = data?.image?.originFileObj;
  const blobUrl = imageFile ? URL.createObjectURL(imageFile) : null;

  const handlePayment = async () => {
    const additionalData = {
      applicant_date_of_birth: formattedDate,
      unioun_name: unionInfo?.short_name_e,
      sonod_name: service,
      image: data?.image?.thumbUrl,
      s_uri: window.origin + "/payment-success",
      f_uri: window.origin + "/payment-failed",
      c_uri: window.origin + "/payment-cancel",
    };
    const updatedData = { ...data, ...additionalData };

    // Prepare FormData
    const formData = new FormData();
    formData.append("bn", JSON.stringify(updatedData)); // append additional data as JSON string
    formData.append("applicant_national_id_front_attachment", data?.frontFile);
    formData.append("applicant_national_id_back_attachment", data?.backFile);
    formData.append(
      "applicant_birth_certificate_attachment",
      data?.birthCertificateFile
    );

    try {
      const response = await sonodApply({ formData, token }).unwrap();
      // return;
      if (response.status_code === 200) {
        message.success("You are redirecting to the payment gateway");
        window.location.href = response.data.redirect_url;
      }
    } catch (error) {
      message.error("An error occurred while processing your request");
    }
  };

  // const handleEnglishSonod = () => {
  //   console.log(from);
  //   if (from == "uddokta") {
  //     navigate(`/uddokta/application-english/${service}`, {
  //       state: { userData: data },
  //     });
  //   } else
  //     navigate(`/application-english/${service}`, {
  //       state: { userData: data },
  //     });
  // };
  const handleEnglishSonod = () => {
    console.log(from);
    const sanitizedData = JSON.parse(JSON.stringify(data));
    if (from === "uddokta") {
      navigate(`/uddokta/application-english/${service}`, {
        state: { userData: sanitizedData },
      });
    } else {
      navigate(`/application-english/${service}`, {
        state: { userData: sanitizedData },
      });
    }
  };
  // console.log(data?.last_years_money);
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
          <div className="text-center">
            {blobUrl ? (
              <img
                src={blobUrl}
                alt={data?.image?.name || "Uploaded image"}
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
            ) : (
              <p>No image to display</p>
            )}
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
            <b>মাতার নাম :{data?.applicant_mother_name} </b>
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
          <hr />

          {data?.successor_list && (
            <div className="row mx-auto">
              <div className="col-md-12">
                <div className="app-heading">ওয়ারিশগণের তালিকা</div>
              </div>
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th>নাম</th>
                    <th>সম্পর্ক</th>
                    <th>জন্ম তারিখ</th>
                    <th>জাতীয় পরিচয়পত্র / জন্মনিবন্ধন</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.successor_list?.map(
                    (successor: any, index: number) => (
                      <tr key={index}>
                        <td>{successor.w_name}</td>
                        <td>{successor.w_relation}</td>

                        <td>{successor?.w_age}</td>
                        <td>{successor.w_nid}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <br />

        {/* <h3>
          আপনার আবেদনটি সফল করার জন্য সনদের ফি প্রদান করুন । {service} এর ফি{" "}
          {service === "ট্রেড লাইসেন্স"
            ? tradeFee
              ? Number(tradeFee) + Number(sonod?.sonod_fees) * 1.15
              : Number(sonod?.sonod_fees)
            : sonod?.sonod_fees}{" "}
          টাকা ।
        </h3> */}

        <div>
          {!banglaSonod && (
            <div className="text-center">
              <h4>আপনি কি ইংরেজি সনদের জন্য আবেদন করতে চান?</h4>
              <div className="d-flex gap-3 justify-content-center">
                <button
                  style={{ width: 100 }}
                  className="btn btn-primary"
                  onClick={handleEnglishSonod}
                >
                  হ্যাঁ{" "}
                </button>
                <button
                  style={{ width: 100 }}
                  className="btn btn-danger"
                  onClick={() => setBanglaSonod(true)}
                >
                  না
                </button>
              </div>
            </div>
          )}

          {banglaSonod && (
            <>
              {from !== "dashboard" && (
                <div className="text-center col-md-7 mx-auto">
                  <h3>
                    আপনার আবেদনটি সফল করার জন্য সনদের ফি প্রদান করুন। {service}{" "}
                    এর ফি{" "}
                    {service === "ট্রেড লাইসেন্স"
                      ? tradeFee
                        ? Number(tradeFee) +
                          Number(Number(sonod?.sonod_fees) * 1.15) +
                          Number(data?.last_years_money || 0)
                        : Number(sonod?.sonod_fees)
                      : sonod?.sonod_fees}{" "}
                    টাকা ।
                  </h3>
                  <button
                    disabled={isLoading}
                    onClick={handlePayment}
                    type="submit"
                    className="border-1 btn_main text-nowrap w-100"
                  >
                    {isLoading ? "Please wait" : "Pay And Submit"}
                  </button>

                  <div className="align-items-center d-flex gap-2 justify-content-end justify-content-start mb-2 mt-2 text-info-emphasis">
                    <span>ইংরেজি সনদ নিতে </span>
                    <button
                      onClick={handleEnglishSonod}
                      className="btn btn-sm btn-info"
                    >
                      এখানে ক্লিক
                    </button>{" "}
                    <span>করুন</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FormValueModal;
