import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import Loader from "@/components/reusable/Loader";
import { useAllHoldingQuery } from "@/redux/api/sonod/sonodApi";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

export interface THolding {
  id: number;
  holding_no: number;
  maliker_name: string;
  nid_no: string;
  mobile_no: string;
}

const HoldingShow = () => {
  const token = localStorage.getItem("token");
  const { word } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useAllHoldingQuery({
    word,
    token,
    search: searchTerm,
    page: currentPage,
  });

  if (isLoading) {
    return <Loader />;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const holdings = data?.data?.data || [];

  return (
    <div className="card p-3 border-0">
      <Breadcrumbs current="হোল্ডিং ট্যাক্স" />
      <div className="col-12 row mx-auto">
        <div className="">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h3>হোল্ডিং ট্যাক্স</h3>
              <div>
                <Link
                  to="/holding/tax/bokeya/list?word=1&union=test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success"
                >
                  বকেয়া রিপোর্ট
                </Link>{" "}
                <Link
                  to={`/dashboard/holding/list/add/${word}`}
                  className="btn btn-info"
                >
                  হোল্ডিং ট্যাক্স যোগ করুন
                </Link>
              </div>
            </div>
            <form
              onSubmit={handleSearch}
              className="d-flex gap-4 my-4 align-items-center"
            >
              <div className="form-group mt-0 w-50">
                <div className="d-flex">
                  <input
                    type="text"
                    id="userdata"
                    placeholder="এখানে আপনার হোল্ডিং নং/নাম/জাতীয় পরিচয় পত্র নম্বর/মোবাইল নম্বর (যে কোন একটি তথ্য) এন্ট্রি করুন"
                    className="form-control"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group text-center mt-0">
                <button
                  type="submit"
                  className="btn btn-info text-center"
                  style={{ fontSize: "20px", padding: "5px 23px" }}
                >
                  খুঁজুন
                </button>
              </div>
            </form>
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>হোল্ডিং নাম্বার</th>
                  <th>নাম</th>
                  <th>এন আইডি নাম্বার</th>
                  <th>মোবাইল নাম্বার</th>
                  <th>আরও তথ্য</th>
                </tr>
              </thead>
              <tbody>
                {holdings.length > 0 ? (
                  holdings.map((item: THolding) => (
                    <tr key={item.id}>
                      <td>{item.holding_no}</td>
                      <td>{item.maliker_name}</td>
                      <td>{item.nid_no}</td>
                      <td>{item.mobile_no}</td>
                      <td>
                        {/* /holding/edit/${item.id} */}
                        <Link
                          to={`/dashboard/holding/list/edit/:${item.id}`}
                          className="btn btn-success"
                        >
                          এডিট
                        </Link>{" "}
                        <Link
                          to={`/dashboard/holding/list/view/${item.id}`}
                          className="btn btn-info"
                        >
                          দেখুন
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">
                      কোন ডেটা পাওয়া যায়নি
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoldingShow;
