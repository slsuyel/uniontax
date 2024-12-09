import dc from "../../assets/images/dc_anchagarh.png";
import uno from "../../assets/images/uno-pic2.png";
import suport from "../../assets/images/support.png";
import { RootState } from "@/redux/features/store";
import { useAppSelector } from "@/redux/features/hooks";
import Marquee from "react-fast-marquee";
const RightSidebar = () => {
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);

  return (
    <>
      {unionInfo && unionInfo.short_name_e !== "uniontax" ? (
        <div className=" pt-3 col-md-3 services">
          {" "}
          <div className={`sidebarTitle mb-3 ${unionInfo.defaultColor}`}>
            <h4> এক নজরে {unionInfo?.short_name_b} ইউনিয়ন</h4>
          </div>{" "}
          <p className="sidebaruser text-center">
            <img
              className=" object-fit-cover"
              src="https://www.newagebd.com/files/records/news/202303/195797_133.JPG"
              width="100%"
              height="100px"
              alt=""
            />
          </p>
          <div className="sidebarTitle mb-3 defaltColor">
            <h4 className=" border-bottom t">নোটিশ</h4>

            <Marquee direction="left" className="text-white">
              ইউনিয়ন পরিষদ হল বাংলাদেশে পল্লী অঞ্চলের সর্বনিম্ন প্রশাসনিক একক।
              গ্রাম চৌকিদারি আইনের ১৮৭০ এর অধীনে ইউনিয়ন পরিষদের সৃষ্টি হয়।
              প্রাথমিক পর্যায়ে এর ভূমিকা নিরাপত্তামূলক কর্মকাণ্ডে সীমাবদ্ধ
              থাকলেও পরবর্তী কালে এটিই স্থানীয় সরকারের প্রাথমিক ইউনিটের
              ভিত্তিরুপে গড়ে উঠে।
            </Marquee>
          </div>
          <div className="sidebarTitle mb-3 defaltColor">
            <h4>জরুরি হটলাইন</h4>
          </div>{" "}
          <div className="column block">
            <img width="100%" src={suport} alt="" />
          </div>{" "}
        </div>
      ) : (
        <div className=" pt-3 col-md-3 services">
          <div className={`sidebarTitle mb-3 defaultColor`}>
            <h4>উপদেষ্টা ও তত্ত্বাবধানে</h4>
          </div>{" "}
          <p className="sidebaruser text-center">
            <img width="70%" alt="" src={dc} />
          </p>{" "}
          <div className="contactInfo text-center">
            <span>
              <b>জনাব মোঃ সাবেত আলী </b>
            </span>{" "}
            <br />{" "}
            <span>
              <b>জেলা প্রশাসক ও জেলা ম্যাজিস্ট্রেট</b>
            </span>{" "}
            <br />
          </div>{" "}
          <div className="sidebarTitle mb-3 defaltColor">
            <h4>পরিকল্পনা ও বাস্তবায়নে</h4>
          </div>{" "}
          <p className="sidebaruser text-center">
            <img width="70%" alt="" src={uno} />
          </p>{" "}
          <div className="contactInfo text-center">
            <span>
              <b> সোহাগ চন্দ্র সাহা</b>
            </span>{" "}
            <br />{" "}
            <span>
              <b>অতিরিক্ত জেলা প্রশাসক (রাজস্ব) দিনাজপুর</b>
            </span>{" "}
            <br />{" "}
            <span>
              <b>প্রাক্তন উপজেলা নির্বাহী অফিসার তেঁতুলিয়া</b>
            </span>{" "}
            <br />
          </div>{" "}
          <div className="sidebarTitle mb-3 defaltColor">
            <h4>জরুরি হটলাইন</h4>
          </div>{" "}
          <div className="column block">
            <img width="100%" src={suport} alt="" />
          </div>{" "}
        </div>
      )}
    </>
  );
};

export default RightSidebar;
