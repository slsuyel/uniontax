import dc from "../../assets/images/dc_anchagarh.png";
import uno from "../../assets/images/uno-pic2.png";
import suport from "../../assets/images/support.png";
const RightSidebar = () => {
  return (
    <div className=" pt-3 col-md-3 services">
      <div className="sidebarTitle mb-3 defaltColor">
        <h4>উপদেষ্টা ও তত্ত্বাবধানে</h4>
      </div>{" "}
      <p className="sidebaruser text-center">
        <img width="70%" alt="" src={dc} />
      </p>{" "}
      <div className="contactInfo text-center">
        <span>
          <b>জনাব মো: জহুরুল ইসলাম</b>
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
  );
};

export default RightSidebar;
