import { RootState } from "@/redux/features/store";
import { useAppSelector } from "@/redux/features/hooks";

import icon2 from "../../assets/icons/trade.png";
import { useNavigate } from "react-router-dom";
import { message, Modal } from "antd";
import { useState } from "react";
import SearchBox from "../reusable/SearchBox";

const ServiceBox = () => {
  const [noUnion, setNoUnion] = useState(false);
  const sonodInfo = useAppSelector((state: RootState) => state.union.sonodList);
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);

  const navigate = useNavigate();

  const handleService = (service: string) => {
    console.log(unionInfo?.short_name_e);

    if (unionInfo?.short_name_e === "uniontax") {
      message.warning("অনুগ্রহ করে আপনার ইউনিয়ন নির্বাচন করুন");
      setNoUnion(true);
      return;
    }
    navigate(`/application/${service}`);
  };

  return (
    <div className="row mx-auto services pt-3">
      <div className="col-md-12">
        <h6 className="defaltColor  position-relative ps-3 py-2 serviceTitle text-white">
          সেবাসমূহ
        </h6>
      </div>
      {sonodInfo.map((service, index) => (
        <button
          onClick={() => handleService(service.bnname)}
          key={index}
          className="col-lg-2 col-md-3 col-sm-4 col-6 my-3 text-center border-0 bg-transparent"
        >
          <div className="serviceBox py-2">
            <div className="serviceLogo">
              <img src={icon2} alt="" width={60} />
            </div>
            <div className="serviceTitle defaltTextColor mt-2">
              <h6> {service.bnname.slice(0, 20)}</h6>
            </div>
          </div>
        </button>
      ))}

      <div className="col-md-12">
        <h6 className="defaltColor  position-relative ps-3 py-2 serviceTitle text-white">
          ক্যাশলেস ইউনিয়ন পরিষদ সেবা
        </h6>

        <p>
          ইউনিয়ন পরিষদ হল বাংলাদেশে পল্লী অঞ্চলের সর্বনিম্ন প্রশাসনিক একক। গ্রাম
          চৌকিদারি আইনের ১৮৭০ এর অধীনে ইউনিয়ন পরিষদের সৃষ্টি হয়। প্রাথমিক
          পর্যায়ে এর ভূমিকা নিরাপত্তামূলক কর্মকাণ্ডে সীমাবদ্ধ থাকলেও পরবর্তী
          কালে এটিই স্থানীয় সরকারের প্রাথমিক ইউনিটের ভিত্তিরুপে গড়ে উঠে।
          বর্তমানে ইউনিয়ন পরিষদ থেকে ট্রেড লাইসেন্স, চারিত্রিক সনদপত্র, ভূমিহীন
          সনদপত্র, ওয়ারিশান সনদপত্র, অবিবাহিত সনদপত্র, প্রত্যয়নপত্র, অস্বচ্ছল
          প্রত্যয়নপত্র, নাগরিক সনদপত্র, উত্তরাধিকার সনদপত্র ইত্যাদি সেবা প্রদান
          করা হয়। বহুল প্রচলিত এই সকল সেবাকে জনবান্ধব করার জন্য একটি ডিজিটাল
          প্লাটফর্ম অত্যাবশ্যকীয় হয়ে পড়ে। সে লক্ষ্যে ইউনিয়ন পরিষদ থেকে প্রদত্ত
          সেবাসমূহকে জনগণের কাছে স্বল্প খরচে, স্বল্প সময়ে এবং হয়রানিমুক্তভাবে
          প্রদান নিশ্চিত করার জন্য একটি এ্যাপ্লিকেশন থেকে সকল সেবা প্রদানের
          নিমিত্ত গত ২০১৯-২০ অর্থ-বছরে সম্ভব্যতা যাচাইয়ের মাধ্যমে
          www.uniontax.gov.bd নামক একটি অনলাইন সিস্টেম কার্যক্রম চালু করা হয়।
          সম্ভব্যতা যাচাইয়ের জন্য জিজ্ঞসাবাদের মাধ্যমকে সামনে রেখে প্রথমে একটি
          ইউনিয়নের সকল ওয়ার্ডের কিছু সংখ্যক মানুষকে দৈব চয়ন ভিত্তিতে চিহ্নিত করে
          ইউনিয়ন পরিষদ প্রদত্ত সেবাসমূহকে ডিজিটালাইজ করার সম্ভবনা যাচাই করা হয়।
          এই পদ্ধতিতে প্রাপ্ত তথ্যের আলোকে “ইউনিয়ন পরিষদ ডিজিটাল সেবা” নামক
          অনলাইন সফটওয়্যারটি তৈরী করা হয় এবং পরবর্তীতে ২০২০-২০২১ অর্থ বছরে ৩নং
          তেঁতুলিয়া ইউনিয়ন পরিষদে পাইলটিং হিসেবে চালু করার পর সকল ইউনিয়নে
          বাস্তবায়ন করা হলে আশাব্যঞ্জক সাড়া পাওয়া যায় এবং গত ০৫/১০/২০২১ তারিখে
          রংপুর বিভাগের মাননীয় বিভাগীয় কমিশনার জনাব মো: আব্দুল ওয়াহাব ভূঞা মহোদয়
          www.uniontax.gov.bd অনলাইন সিস্টেমটির শুভ উদ্বোধন করেন।
        </p>
      </div>

      <Modal
        className="w-100 container mx-auto"
        open={noUnion}
        onCancel={() => setNoUnion(false)}
        footer={null}
        animation="fade-down"
      >
        <div style={{ zIndex: 999 }} className=" py-3">
          <h3 className="">ইউনিয়ন নির্বাচন করুন </h3>
          <SearchBox />
        </div>
      </Modal>
    </div>
  );
};

export default ServiceBox;
