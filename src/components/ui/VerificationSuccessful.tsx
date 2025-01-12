/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { TSonodDetails } from "./SearchTimeline";
import { useState } from "react";
import { message, Modal } from "antd";
import { useRenewSonodMutation } from "@/redux/api/user/userApi";

const VerificationSuccessful = ({ sonod }: { sonod: TSonodDetails }) => {
  const [renewSonod,{isLoading}]=useRenewSonodMutation()
  const [renew, setRenew] = useState<boolean>(false);
  const handleRenew = () => {
    setRenew(true);
  };

  const handleCancel = () => {
    setRenew(false);
  };
  const additionalData = {
   
    s_uri: window.origin + "/payment-success",
    f_uri: window.origin + "/payment-failed",
    c_uri: window.origin + "/payment-cancel",
  };
const handleOk =async ()=>{
  const res = await renewSonod({data:additionalData,id:sonod.id}).unwrap()
  if (res.status_code === 200) {
    message.success("You are redirect to payment gateway");
    window.location.href = res.data.redirect_url;
    setRenew(false);
  }
  
}

  return (
    <div className="d-flex justify-content-between my-5 sonod-verification">
      <div className="col-md-12 p-sm-0">
        <div className=" text-end mb-2 no-print">
          <div className="d-flex gap-2 justify-content-end px-2">
            {sonod.renew_able ? (
              <button onClick={handleRenew} className="btn btn-sm btn-info">
                রিনিউ করুন
              </button>
            ) : (
              <>
                <Link
                  to={sonod.download_url}
                  target="_blank"
                  className="btn btn-sm btn-success"
                >
                  ডাউনলোড
                </Link>
                {sonod.download_url_en && (
                  <Link
                    to={sonod.download_url_en}
                    target="_blank"
                    className="btn btn-sm btn-success"
                  >
                    ইংরেজি সনদ ডাউনলোড
                  </Link>
                )}
              </>
            )}
          </div>
        </div>{" "}
        <div className="border">
          <div className="row m-0 mt-2 mx-auto ">
            <div className="logo-img col-md-3 col-sm-12 text-end hide-mobile">
              <img width={70} src="/bangladesh-govt.png" />
            </div>{" "}
            <div className="header-text col-md-6 col-sm-12 text-center">
              <p>Government of the People's Republic of Bangladesh</p>{" "}
              <p>Local Government Division</p>
            </div>{" "}
          </div>{" "}
          <div className="verification-sec text-center mt-2 mb-2">
            <h2 className="text-success fw-semibold">
              Verification Successful !
            </h2>{" "}
            <h4 className="fs-4 text-success">This Certificate is Valid.</h4>
          </div>
        </div>{" "}
        <div>
          <div className="row m-0">
            <div className="col-md-5 p-0">
              <div className="beneficiary text-center p-2">
                <h3>Beneficiary Details (সনদ গ্রহণকারীর বিবরণ)</h3>
              </div>{" "}
              <div className="row m-0">
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-right cert-verify-content-div">
                    Certificate No:
                    <br />
                    সার্টিফিকেট নং:
                  </div>
                </div>{" "}
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-left cert-verify-content-div">
                    {sonod.sonod_Id}
                  </div>
                </div>
              </div>{" "}
              <div className="row m-0">
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-right cert-verify-content-div">
                    NID Number:
                    <br />
                    জাতীয় পরিচয়পত্র নং:
                  </div>
                </div>{" "}
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-left cert-verify-content-div">
                    {sonod.applicant_national_id_number}
                  </div>
                </div>
              </div>{" "}
              <div className="row m-0">
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-right cert-verify-content-div">
                    Passport/Birth Registration:
                    <br />
                    পাসপোর্ট/জন্ম নিবন্ধন:
                  </div>
                </div>{" "}
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-left cert-verify-content-div"></div>
                </div>
              </div>{" "}
              <div className="row m-0">
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-right cert-verify-content-div">
                    Country/Nationality:
                    <br />
                    দেশ/জাতীয়তা:
                  </div>
                </div>{" "}
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-left cert-verify-content-div">
                    Bangladeshi
                  </div>
                </div>
              </div>{" "}
              <div className="row m-0">
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-right cert-verify-content-div">
                    Name:
                    <br />
                    নাম:
                  </div>
                </div>{" "}
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-left cert-verify-content-div">
                    {sonod.applicant_name}
                  </div>
                </div>
              </div>{" "}
              <div className="row m-0">
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-right cert-verify-content-div">
                    Date of Birth:
                    <br />
                    জন্ম তারিখ:
                  </div>
                </div>{" "}
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-left cert-verify-content-div">
                    {sonod.applicant_date_of_birth}
                  </div>
                </div>
              </div>{" "}
              <div className="row m-0">
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-right cert-verify-content-div">
                    Gender:
                    <br />
                    লিঙ্গ:
                  </div>
                </div>{" "}
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-left cert-verify-content-div">
                    {sonod.applicant_gender}
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="col-md-7 p-0">
              <div className="beneficiary text-center p-2">
                <h3>Certificate Details (সনদ প্রদানের বিবরণ)</h3>
              </div>{" "}
              <div className="row m-0">
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-right cert-verify-content-div">
                    Date of Certificate Issue):
                    <br />
                    সনদ প্রদানের তারিখ :
                  </div>
                </div>{" "}
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-left cert-verify-content-div">
                    DD/MM/YEAR
                  </div>
                </div>
              </div>{" "}
              <div className="row m-0">
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-right cert-verify-content-div">
                    Name of Certificate:
                    <br />
                    সনদের নাম:
                  </div>
                </div>{" "}
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-left cert-verify-content-div">
                    {sonod.sonod_name}
                  </div>
                </div>
              </div>{" "}
              <div className="row m-0">
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-right cert-verify-content-div">
                    Date of Certificate Renew:
                    <br />
                    সনদ নবায়নের তারিখ:
                  </div>
                </div>{" "}
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-left cert-verify-content-div" />
                </div>
              </div>{" "}
              <div className="row m-0">
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-right cert-verify-content-div">
                    Payment Status:
                    <br />
                    লেনদেনের অবস্থা:
                  </div>
                </div>{" "}
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-left cert-verify-content-div">
                    {sonod.payment_status}
                  </div>
                </div>
              </div>{" "}
              <div className="row m-0">
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-right cert-verify-content-div">
                    Certification Union:
                    <br />
                    সনদ প্রদানের ইউনিয়ন:
                  </div>
                </div>{" "}
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-left cert-verify-content-div">
                    {sonod.unioun_name}
                  </div>
                </div>
              </div>{" "}
              <div className="row m-0">
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-right cert-verify-content-div">
                    Certifier By:
                    <br />
                    সনদ প্রদানকারী:
                  </div>
                </div>{" "}
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-left cert-verify-content-div">
                    {sonod.unioun_name}
                  </div>
                </div>
              </div>{" "}
              <div className="row m-0">
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-right cert-verify-content-div">
                    Total Certificate Given:
                    <br />
                    মোট সনদ সংখ্যা:
                  </div>
                </div>{" "}
                <div className="col-6 border-dash">
                  <div className="beneficiary-details-left cert-verify-content-div">
                    1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/**/} {/**/}
      </div>
      {renew && (
        <Modal
          maskClosable={false}
          title="আপনি কি নিশ্চিত?"
          open={renew}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="হ্যাঁ নিশ্চিত"
          cancelText="না"
          okButtonProps={{ loading: isLoading }}
        >
          <p>সনদটি রিনিউ করতে চান?</p>
        </Modal>
      )}
    </div>
  );
};

export default VerificationSuccessful;
