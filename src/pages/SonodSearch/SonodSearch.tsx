/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import RightSidebar from "../Home/RightSidebar";
import { useSonodSearchMutation } from "@/redux/api/user/userApi";
import SearchTimeline from "@/components/ui/SearchTimeline";
import { message } from "antd";

const SonodSearch = () => {
  const [sonodType, setSonodType] = useState("");
  const [sonodNo, setSonodNo] = useState("");
  const [sonodSearch, { data, isLoading }] = useSonodSearchMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!sonodNo || !sonodType) {
      message.warning("সনদ নম্বর লিখুন ও সনদের ধরন নির্বাচন করুন");
      return;
    }
    try {
      const res = await sonodSearch({ sonodType, sonodNo }).unwrap();
      if (res.isError) {
        message.error(res.error.errMsg);
      }
    } catch (error: any) {
      message.error("একটি সমস্যা হয়েছে। আবার চেষ্টা  করুন");
    }
  };

  return (
    <div className="row mx-auto my-3 container">
      <div className="mainBody col-md-9">
        <form onSubmit={handleSubmit}>
          <div className="form-group my-2">
            <label className="defaltTextColor">সনদের ধরন নির্বাচন করুন</label>
            <select
              id="sonod"
              className="form-control"
              value={sonodType}
              onChange={(e) => setSonodType(e.target.value)}
            >
              <option>চিহ্নিত করুন</option>
              <option value="নাগরিকত্ব সনদ">নাগরিকত্ব সনদ</option>
              <option value="ট্রেড লাইসেন্স">ট্রেড লাইসেন্স</option>
              <option value="ওয়ারিশান সনদ">ওয়ারিশান সনদ</option>
              <option value="উত্তরাধিকারী সনদ">উত্তরাধিকারী সনদ</option>
              <option value="বিবিধ প্রত্যয়নপত্র">বিবিধ প্রত্যয়নপত্র</option>
              <option value="চারিত্রিক সনদ">চারিত্রিক সনদ</option>
              <option value="ভূমিহীন সনদ">ভূমিহীন সনদ</option>
              <option value="পারিবারিক সনদ">পারিবারিক সনদ</option>
              <option value="অবিবাহিত সনদ">অবিবাহিত সনদ</option>
              <option value="পুনঃ বিবাহ না হওয়া সনদ">
                পুনঃ বিবাহ না হওয়া সনদ
              </option>
              <option value="বার্ষিক আয়ের প্রত্যয়ন">
                বার্ষিক আয়ের প্রত্যয়ন
              </option>
              <option value="একই নামের প্রত্যয়ন">একই নামের প্রত্যয়ন</option>
              <option value="প্রতিবন্ধী সনদপত্র">প্রতিবন্ধী সনদপত্র</option>
              <option value="অনাপত্তি সনদপত্র">অনাপত্তি সনদপত্র</option>
              <option value="আর্থিক অস্বচ্ছলতার সনদপত্র">
                আর্থিক অস্বচ্ছলতার সনদপত্র
              </option>
            </select>
          </div>
          <div className="form-group my-2">
            <label className="defaltTextColor">ইস্যুকৃত সনদ নম্বর লিখুন</label>
            <input
              type="text"
              id="sonodNo"
              className="form-control"
              value={sonodNo}
              onChange={(e) => setSonodNo(e.target.value)}
            />
          </div>
          <div className="form-group text-center">
            <button disabled={isLoading} className="btn_main mt-2">
              {isLoading ? "Searching ..." : "Search"}
            </button>
          </div>
        </form>

        {data && !data.isError ? <SearchTimeline data={data} /> : null}
      </div>
      <RightSidebar />
    </div>
  );
};

export default SonodSearch;
