import RightSidebar from "../Home/RightSidebar";
import { Link } from "react-router-dom";
import { useAllHoldingFrontendQuery } from "@/redux/api/sonod/sonodApi";
import { ChangeEvent,  useEffect, useState } from "react";
import { THolding } from "../dashboard/holding/HoldingShow";
import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
import { TDistrict, TDivision, TUnion, TUpazila } from "@/types";
import { Pagination, Alert } from "antd";
import Loader from "@/components/reusable/Loader";

const Holding = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUnion, setSelectedUnion] = useState<TUnion | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<TDivision | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<TDistrict | null>(null);
  const [selectedUpazila, setSelectedUpazila] = useState<TUpazila | null>(null);
  const [divisions, setDivisions] = useState<TDivision[]>([]);
  const [districts, setDistricts] = useState<TDistrict[]>([]);
  const [upazilas, setUpazilas] = useState<TUpazila[]>([]);
  const [unions, setUnions] = useState<TUnion[]>([]);
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWord, setSelectedWord] = useState("1");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const smallUnion = `${selectedUnion?.name}`.replace(/\s+/g, "").toLowerCase();

  const { data, isLoading, isFetching, isError } = useAllHoldingFrontendQuery(
    {
      word: selectedWord,
      search: submittedSearchTerm,
      page: currentPage,
      unioun:
        unionInfo && unionInfo.short_name_e == "uniontax"
          ? smallUnion
          : unionInfo && unionInfo.short_name_e,
    },
    {
      skip: !submittedSearchTerm,
    }
  );

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    fetch("/divisions.json")
      .then((res) => res.json())
      .then((data: TDivision[]) => {
        setDivisions(data);
      })
      .catch((error) => console.error("Error fetching divisions data:", error));
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      fetch("/districts.json")
        .then((response) => response.json())
        .then((data: TDistrict[]) => {
          const filteredDistricts = data.filter(
            (d) => d?.division_id === selectedDivision.id
          );
          setDistricts(filteredDistricts);
        })
        .catch((error) => console.error("Error fetching districts data:", error));
    }
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch("/upazilas.json")
        .then((response) => response.json())
        .then((data: TUpazila[]) => {
          const filteredUpazilas = data.filter(
            (upazila) => upazila.district_id === selectedDistrict.id
          );
          setUpazilas(filteredUpazilas);
        })
        .catch((error) => console.error("Error fetching upazilas data:", error));
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedUpazila) {
      fetch("/unions.json")
        .then((response) => response.json())
        .then((data: TUnion[]) => {
          const filteredUnions = data.filter(
            (union) => union.upazilla_id === selectedUpazila.id
          );
          setUnions(filteredUnions);
        })
        .catch((error) => console.error("Error fetching unions data:", error));
    }
  }, [selectedUpazila]);

  const handleDivisionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const division = divisions.find((d) => d?.id === event.target.value);
    setSelectedDivision(division || null);
    setSelectedDistrict(null);
    setSelectedUpazila(null);
    setCurrentPage(1); // Reset to the first page
  };

  const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const district = districts.find((d) => d?.id === event.target.value);
    setSelectedDistrict(district || null);
    setSelectedUpazila(null);
    setCurrentPage(1); // Reset to the first page
  };

  const handleUpazilaChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const upazila = upazilas.find((u) => u?.id === event.target.value);
    setSelectedUpazila(upazila || null);
    setCurrentPage(1); // Reset to the first page
  };

  const handleUnionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const union = unions.find((u) => u?.id === event.target.value);
    setSelectedUnion(union || null);
    setCurrentPage(1); // Reset to the first page
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page
    setSubmittedSearchTerm(searchTerm); // Trigger API call
  };

  const handleWordChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedWord(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  const holdings = data?.data?.data || [];
  const totalItems = data?.data?.total || 0;
  const lastPage = data?.data?.last_page || 1; // Use last_page from the API



  // Conditionally render the Pagination component
  const showPagination = totalItems > pageSize && holdings.length > 0;

  return (
    <div className="row mx-auto container my-3">
      <div className="mainBody col-md-9 mt-3">
        <div className="card">
          {unionInfo && unionInfo.short_name_e !== "uniontax" ? (
            ""
          ) : (
            <>
              <form>
                <div className="row mx-auto mb-4">
                  <div className="col-md-3">
                    <label htmlFor="division">বিভাগ নির্বাচন করুন</label>
                    <select
                      required
                      id="division"
                      className="form-control"
                      value={selectedDivision?.id || ""}
                      onChange={handleDivisionChange}
                    >
                      <option value="">বিভাগ নির্বাচন করুন</option>
                      {divisions?.map((d) => (
                        <option key={d?.id} value={d?.id}>
                          {d?.bn_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="district">জেলা নির্বাচন করুন</label>
                    <select
                      required
                      id="district"
                      className="form-control"
                      value={selectedDistrict?.id || ""}
                      onChange={handleDistrictChange}
                    >
                      <option value="">জেলা নির্বাচন করুন</option>
                      {districts?.map((d) => (
                        <option key={d?.id} value={d?.id}>
                          {d?.bn_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="upazila">উপজেলা নির্বাচন করুন</label>
                    <select
                      required
                      id="upazila"
                      className="form-control"
                      value={selectedUpazila?.id || ""}
                      onChange={handleUpazilaChange}
                    >
                      <option value="">উপজেলা নির্বাচন করুন</option>
                      {upazilas?.map((u) => (
                        <option key={u?.id} value={u?.id}>
                          {u?.bn_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="union">ইউনিয়ন নির্বাচন করুন</label>
                    <select
                      required
                      id="union"
                      className="form-control"
                      value={selectedUnion?.id || ""}
                      onChange={handleUnionChange}
                    >
                      <option value="">ইউনিয়ন নির্বাচন করুন</option>
                      {unions?.map((u) => (
                        <option key={u?.id} value={u?.id}>
                          {u?.bn_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
            </>
          )}

          <div className="card-header">
            <form
              onSubmit={handleSearch}
              className="d-flex gap-4 my-4 align-items-center"
            >
              <div className="form-group mt-0 w-25">
                <select
                  className="form-select"
                  value={selectedWord}
                  onChange={handleWordChange}
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
                  disabled={isFetching}
                  className="btn btn-info text-center"
                  style={{ fontSize: "20px", padding: "5px 23px" }}
                >
                  {isFetching ? "অপেক্ষা করুন" : "খুঁজুন"}
                </button>
              </div>
            </form>
          </div>
          <div className="card-body">
            {isError ? (
              <Alert message="Error fetching data" type="error" />
            ) : isLoading || isFetching ? (
              <><Loader /></>
            ) : (
              <>
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
                            <Link
                              to={`/holding/list/view/${item.id}`}
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

                {/* Conditionally render Pagination */}
                {showPagination && (
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={lastPage*pageSize}
                    onChange={handlePageChange}
                    showSizeChanger
                    onShowSizeChange={handlePageChange}
                    pageSizeOptions={[10, 20, 50, 100]}
                    style={{ marginTop: 20, textAlign: "center" }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Holding;