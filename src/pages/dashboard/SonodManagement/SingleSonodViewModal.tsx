/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSingleSonodQuery } from "@/redux/api/sonod/sonodApi";

import { TApplicantData } from "@/types";

import { Button, Modal } from "antd";

interface FormValueModalProps {
  en?: boolean;
  visible: boolean;
  data?: TApplicantData;
  onCancel: () => void;
  from?: string;
  id?: number;
}

const SingleSonodViewModal = ({
  visible,
  en,
  onCancel,
  id,
}: FormValueModalProps) => {
  const token = localStorage.getItem("token");

  const { data: singleS, isLoading: getingSonod } = useSingleSonodQuery({
    id,
    token,
    en,
  });

  const handleCancel = () => {
    onCancel();
  };

  const data: TApplicantData = !getingSonod && singleS?.data;
  console.log(data);

  const successorList =
    (data?.successor_list && JSON.parse(data?.successor_list)) || [];

  return (
    <Modal
      loading={getingSonod}
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
            <b>মাতার নাম : {data?.applicant_mother_name} </b>
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
            <b>জম্ম তারিখ : {data.applicant_date_of_birth} </b>
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
            <b>বাসিন্দা: {data?.applicant_resident_status} </b>
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
                  {successorList?.map((successor: any, index: number) => (
                    <tr key={index}>
                      <td>{successor?.w_name}</td>
                      <td>{successor?.w_relation}</td>

                      <td>{successor?.w_age}</td>
                      <td>{successor?.w_nid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

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
      </div>
    </Modal>
  );
};

export default SingleSonodViewModal;
