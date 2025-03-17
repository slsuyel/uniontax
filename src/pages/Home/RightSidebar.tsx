/* eslint-disable @typescript-eslint/no-explicit-any */
import dc from "../../assets/images/dc_panchagarh.webp";
import dlg from "../../assets/images/dlg-rangpur.webp";
import uno from "../../assets/images/uno-pic2.webp";
import suport from "../../assets/images/support.webp";
import { RootState } from "@/redux/features/store";
import { useAppSelector } from "@/redux/features/hooks";
import Marquee from "react-fast-marquee";
const RightSidebar = () => {
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
  const baseUrl = window.origin;

  return (
    <>
      {unionInfo &&
        !["uniontax", "unionservices"].includes(
          unionInfo.short_name_e as string
        ) ? (
        <div className="pt-3 col-md-3 services">
          <div className={`sidebarTitle mb-3 ${unionInfo.defaultColor}`}>
            <h4>এক নজরে {unionInfo.short_name_b} ইউনিয়ন</h4>
          </div>
          <div className="">
            <img
              onError={(e: any) => e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-kSPdyaeGM-OkA-u262eL7B2bcsHuBR0Mg&s'}
              className="object-fit-cover"
              src={unionInfo.u_image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-kSPdyaeGM-OkA-u262eL7B2bcsHuBR0Mg&s"}
              width="100%"
              height="100px"
              alt="union-image"
            />
            <p style={{ fontSize: 12 }} className="sidebaruser mt-3 mb-1">
              {unionInfo?.u_description || ""}
            </p>
          </div>
          <div className="sidebarTitle mb-3 defaltColor">
            <h4 className="border-bottom t">নোটিশ</h4>
            <Marquee direction="left" className="text-white">
              {unionInfo?.u_notice}
            </Marquee>
          </div>
          <div className="sidebarTitle mb-3 defaltColor">
            <h4>জরুরি হটলাইন</h4>
          </div>
          <div className="column block">
            <img width="100%" src={suport} height={"auto"} alt="support" />
          </div>
        </div>
      ) : (
        <div className="pt-3 col-md-3 services">
          <div className="sidebarTitle mb-3 defaultColor">
            <h4>উপদেষ্টা ও তত্ত্বাবধানে</h4>
          </div>
          <p className="sidebaruser text-center">
            <img
              width="70%"
              height={"auto"}
              alt="unionservices"
              src={baseUrl.includes("unionservices") ? dlg : dc}
            />
          </p>
          <div className="contactInfo text-center">
            <span>
              <b>
                {baseUrl.includes("unionservices")
                  ? "মোঃ আবু জাফর"
                  : "জনাব মোঃ সাবেত আলী "}
              </b>
            </span>
            <br />
            <span>
              <b>
                {baseUrl.includes("unionservices")
                  ? "পরিচালক, (যুগ্মসচিব) স্থানীয় সরকার"
                  : "   জেলা প্রশাসক ও জেলা ম্যাজিস্ট্রেট"}
              </b>
            </span>
            <br />
          </div>
          <div className="sidebarTitle mb-3 defaltColor">
            <h4>পরিকল্পনা ও বাস্তবায়নে</h4>
          </div>
          <p className="sidebaruser text-center">
            <img width="70%" height={"auto"} alt="unio" src={uno} />
          </p>
          <div className="contactInfo text-center">
            <span>
              <b>সোহাগ চন্দ্র সাহা</b>
            </span>
            <br />
            <span>
              সিনিয়র সহকারী সচিব (ওএসডি) <br /> জনপ্রশাসন মন্ত্রণালয়
            </span>
            <br />
            <span>
              <b>প্রাক্তন উপজেলা নির্বাহী অফিসার তেঁতুলিয়া</b>
            </span>
            <br />
          </div>
          <div className="sidebarTitle mb-3 defaltColor">
            <h4>জরুরি হটলাইন</h4>
          </div>
          <div className="column block">
            <img width="100%" height={"auto"} src={suport} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default RightSidebar;
