/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
// import logo from "/main_logo.webp";
// import logoUnionService from "/unionservices_logo.webp";
import SearchBox from "../reusable/SearchBox";
import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";


const TopHeader = () => {
  const unionData = useAppSelector((state: RootState) => state.union.unionInfo);
  const site_settings = useAppSelector((state: RootState) => state.union.site_settings);

  const baseUrl = window.origin;





  return (
    <>
      <div className=" container mx-auto">
        <div className="row mx-auto topHeader">
          <div className="topheaderItem col-md-6 col-6">
            <span> {site_settings?.header_title || ""}</span>
          </div>{" "}
          <div className="topheaderItem col-md-6 col-6 text-end">
            <span
              style={{
                borderRight: "1px solid rgba(255, 255, 255, 0.52)",
                padding: "8px 10px",
                marginRight: "9px",
              }}
            >
              {new Date().toISOString().split("T")[0]}
            </span>{" "}
            <span>Visitors : 42470</span>
          </div>
        </div>
      </div>

      <div className=" row mx-auto container">
        <div className="col-md-6 my-3 ps-0">
          <Link to={"/"}>
            <img 
              onError={(e:any) => e.target.src = (baseUrl.includes("unionservices") ? "https://unionservices.gov.bd/unionservices_logo.webp" : "https://uniontax.gov.bd/main_logo.webp")}
              width={270}
              src={`https://images.weserv.nl/?url=${encodeURIComponent(
                unionData?.web_logo ||
                (baseUrl.includes("unionservices") ? "https://unionservices.gov.bd/unionservices_logo.webp" : "https://uniontax.gov.bd/main_logo.webp")
              )}`}
              alt="Logo"
              height="auto"
            />

          </Link>


        </div>
        <div className="col-md-6  pe-0">
          <h3 className="defaltColor fs-4 searchHeader text-white">
          {site_settings?.header_union_select_title || ""}{" "}
          </h3>
            <SearchBox service={""} id={""} unionname={""} />
        </div>
      </div>
    </>
  );
};

export default TopHeader;
