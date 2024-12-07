/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import FormValueModal from "../ui/FormValueModal";
import { TApplicantData } from "@/types";
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
  const [view, setView] = useState(false);

  const handleView = () => {
    setView(true);
  };
  const handleCancel = () => {
    setView(false);
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
          <button type="button" className="btn btn-success btn-sm mr-1">
            অনুমোদন
          </button>
        )}
        <Link
          to={`{https://api.uniontax.gov.bd/sonod/invoice/download/${item.id}}`}
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
