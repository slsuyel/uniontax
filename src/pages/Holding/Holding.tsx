
import RightSidebar from '../Home/RightSidebar';
import { Link } from 'react-router-dom';
import { useAllHoldingFrontendQuery } from '@/redux/api/sonod/sonodApi';
import { useState } from 'react';
import { THolding } from '../dashboard/holding/HoldingShow';
import { useAppSelector } from '@/redux/features/hooks';
import { RootState } from '@/redux/features/store';

const Holding = () => {
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWord, setSelectedWord] = useState("1");
  const [triggerSearch, setTriggerSearch] = useState(false);


  console.log(unionInfo?.short_name_e);
  const { data, isLoading } = useAllHoldingFrontendQuery({
    word: selectedWord,
    search: searchTerm,
    page: currentPage,
    unioun: unionInfo?.short_name_e

  }, {
    skip: !triggerSearch,
  });





  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setTriggerSearch(true); // Trigger API call
  };

  const holdings = data?.data?.data || [];

  return (
    <div className="row mx-auto container my-3">
      <div className="mainBody col-md-9 mt-3">
        <div className="card">
          <div className="card-header">
            <form onSubmit={handleSearch} className="d-flex gap-4 my-4 align-items-center">
              <div className="form-group mt-0 w-25">
                <select
                  className="form-select"
                  value={selectedWord}
                  onChange={(e) => setSelectedWord(e.target.value)}
                >
                  {[...Array(9).keys()].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mt-0 w-50">
                <input
                  type="text"
                  id="userdata"
                  placeholder="এখানে আপনার হোল্ডিং নং/নাম/জাতীয় পরিচয় পত্র নম্বর/মোবাইল নম্বর (যে কোন একটি তথ্য) এন্ট্রি করুন"
                  className="form-control"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : holdings.length > 0 ? (
                  holdings.map((item: THolding) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.maliker_name}</td>
                      <td>{item.nid_no}</td>
                      <td>{item.mobile_no}</td>
                      <td>
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
      <RightSidebar />
    </div>
  );
};

export default Holding;
