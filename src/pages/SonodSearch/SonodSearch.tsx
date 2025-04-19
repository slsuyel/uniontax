/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import RightSidebar from "../Home/RightSidebar";
import { useSonodSearchMutation } from "@/redux/api/user/userApi";
import SearchTimeline from "@/components/ui/SearchTimeline";
import { message } from "antd";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { RootState } from "@/redux/features/store"
import { useAppSelector } from "@/redux/features/hooks"


const SonodSearch = () => {
  const [sonodType, setSonodType] = useState("");
  const [sonodNo, setSonodNo] = useState("");
  const [sonodSearch, { data, isLoading }] = useSonodSearchMutation();
    const sonodInfo = useAppSelector((state: RootState) => state.union.sonodList)


  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();

    if (!sonodNo || !sonodType) {
      message.warning("সনদ নম্বর লিখুন ও সনদের ধরন নির্বাচন করুন");
      return;
    }

    // Update the URL with query parameters
    navigate(
      `?sonodType=${encodeURIComponent(sonodType)}&sonodNo=${encodeURIComponent(sonodNo)}`
    );

    try {
      const res = await sonodSearch({ sonodType, sonodNo }).unwrap();
      if (res.isError) {
        message.error(res.data.message ? "সনদ পাওয়া যায়নি" : "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন");
      }
    } catch (error: any) {
      message.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন");
    }
  };

  // Load from URL on mount
  useEffect(() => {
    const urlSonodType = searchParams.get("sonodType");
    const urlSonodNo = searchParams.get("sonodNo");

    if (urlSonodType && urlSonodNo) {
      setSonodType(urlSonodType);
      setSonodNo(urlSonodNo);
      sonodSearch({ sonodType: urlSonodType, sonodNo: urlSonodNo });
    }
  }, []);

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
              <option value="">চিহ্নিত করুন</option>
              {sonodInfo.map((service, index) => (
                    <option key={index}  value={service.bnname} >{service.bnname}</option>
                  ))}
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
