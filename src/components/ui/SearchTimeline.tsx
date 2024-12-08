/* eslint-disable @typescript-eslint/no-explicit-any */
import { Steps } from "antd";
import VerificationSuccessful from "./VerificationSuccessful";

export interface TSonodDetails {
  id?: number;
  unioun_name?: string;
  year?: string;
  sonod_Id?: string;
  sonod_name?: string;
  applicant_national_id_number?: string;
  applicant_birth_certificate_number?: string;
  applicant_name?: string;
  applicant_date_of_birth?: string;
  applicant_gender?: string;
  payment_status?: string;
  stutus?: string;
  successor_list?: string;
}

const SearchTimeline = ({ data }: any) => {
  const sonod: TSonodDetails = data?.data;

  const steps = [
    "আবেদন জমা হয়েছে",
    "পেমেন্ট",
    "সেক্রেটারি",
    "চেয়ারম্যান",
    "কমপ্লিট",
  ];

  // Determine the current active step index
  const activeStep = (() => {
    if (sonod.stutus === "approved") return 4;
    if (sonod.stutus === "approved") return 3;
    if (sonod.stutus === "sec_approved") return 2;
    if (sonod.payment_status === "Paid") return 1;
    return 0;
  })();

  // console.log(sonod);

  return (
    <div>
      <Steps
        className="mt-3 p-2 rounded shadow-sm"
        direction="horizontal"
        size="default"
        current={activeStep}
      >
        {steps.map((title, index) => (
          <Steps.Step key={index} title={title} />
        ))}
      </Steps>

      {sonod.stutus == "approved" && <VerificationSuccessful sonod={sonod} />}

      {data && sonod.stutus !== "approved" && (
        <table className="table">
          <tbody>
            <tr>
              <td
                colSpan={2}
                style={{ textAlign: "center", fontSize: "20px" }}
              ></td>
            </tr>
            <tr>
              <td>সনদের ধরণ</td> <td>{sonod.sonod_name}</td>
            </tr>
            <tr>
              <td>সনদ নম্বর</td> <td>{sonod.sonod_Id}</td>
            </tr>
            <tr>
              <td>সনদ ইস্যুর বছর</td> <td>{sonod.year}</td>
            </tr>
            <tr>
              <td>আবেদনকারীর নাম</td> <td>{sonod.applicant_name}</td>
            </tr>
            <tr>
              <td>জাতীয় পরিচয়পত্র নম্বর</td>{" "}
              <td>{sonod.applicant_national_id_number}</td>
            </tr>
            <tr>
              <td>ইউনিয়নের নাম</td> <td>{sonod.unioun_name}</td>
            </tr>
            <tr>
              <td>জন্ম নিবন্ধন নম্বর</td>{" "}
              <td>{sonod.applicant_birth_certificate_number}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchTimeline;
