/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import FormValueModal from "../ui/FormValueModal";
import { TApplicantData } from "@/types";
import { useSonodActionMutation } from "@/redux/api/sonod/sonodApi";
import { message } from "antd";
interface SonodActionBtnProps {
  sonodName: string | undefined;
  item: TApplicantData;
  condition: string | undefined;
}
const SonodActionBtn = ({
  sonodName,
  item,
  condition,
}: SonodActionBtnProps) => {
  const token = localStorage.getItem("token");
  const [sonodAction, { isLoading }] = useSonodActionMutation();

  const [view, setView] = useState(false);

  const handleView = () => {
    setView(true);
  };
  const handleCancel = () => {
    setView(false);
  };

  const handleApproved = async () => {
    try {
      const response = await sonodAction({ id: item.id, token }).unwrap();
      console.log("Success:", response.data.message);
      message.success(` ${response.data.message}`);
    } catch (err) {
      console.error("Error:", err);
      message.error("কিছু সমস্যা হয়েছে");
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center flex-wrap gap-2"
        role="group"
        aria-label="Actions"
      >
        <Link
          to={`/dashboard/sonod/${sonodName}/action/edit/${item.id}`}
          className="btn btn-info btn-sm mr-1"
        >
          এডিট করুন
        </Link>
        <Link
          to={`https://api.uniontax.gov.bd/applicant/copy/download/${item.id}`}
          className="btn btn-success btn-sm mr-1"
          target="_blank"
        >
          প্রাপ্তী স্বীকারপত্র
        </Link>
        <button
          onClick={handleView}
          type="button"
          className="btn btn-info btn-sm mr-1"
        >
          আবেদনপত্র দেখুন
        </button>
        {condition !== "cancel" && condition !== "approved" && (
          <button
            onClick={handleApproved}
            type="button"
            className="btn btn-success btn-sm mr-1"
          >
            {isLoading ? "অপেক্ষা করুন" : "অনুমোদন"}
          </button>
        )}
        <Link
          to={`https://api.uniontax.gov.bd/sonod/invoice/download/${item.id}`}
          className="btn btn-info btn-sm mr-1"
          target="_blank"
        >
          রশিদ প্রিন্ট
        </Link>

        {condition == "approved" && (
          <button type="button" className="btn btn-info btn-sm mr-1">
            সনদ
          </button>
        )}

        {condition == "new" && (
          <button type="button" className="btn btn-danger btn-sm mr-1">
            বাতিল করুন
          </button>
        )}
      </div>

      {view && (
        <FormValueModal
          onCancel={handleCancel}
          visible={view}
          key={0}
          from="dashboard"
        />
      )}
    </>
  );
};

export default SonodActionBtn;
