/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState } from "react";
import { Form, Input, Button, Card, Pagination } from "antd";
import { Link, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import useAllServices from "@/hooks/useAllServices";
import { checkNameCondition } from "@/utils/checkNameCondition";
import SonodActionBtn from "@/components/reusable/SonodActionBtn";
import { useAllSonodQuery } from "@/redux/api/sonod/sonodApi";
import Loader from "@/components/reusable/Loader";
import { TApplicantData } from "@/types/global";
import { Spinner } from "react-bootstrap";

const SonodManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sonod_Id, setSonod_Id] = useState("");
  const [searchSonodId, setSearchSonodId] = useState("");
  const { sonodName, condition } = useParams();
  const token = localStorage.getItem("token");
  const { data, isLoading, isFetching, refetch } = useAllSonodQuery({
    sonodName: sonodName,
    stutus: condition || "Pending",
    sondId: searchSonodId,
    token,
    page: currentPage,
  });

  const services = useAllServices();
  const totalPages: number = data?.data?.sonods?.last_page || 0;
  const { s_name, condition_bn } = checkNameCondition(
    services,
    sonodName,
    condition
  );
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleSearch = () => {
    setSearchSonodId(sonod_Id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSonod_Id(value);

    if (value === "") {
      setSearchSonodId("");
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const allSonod: TApplicantData[] = data?.data.sonods.data || [];

  // console.log(allSonod);

  return (
    <div className="card p-3 border-0">
      <Breadcrumbs page={s_name} current={condition_bn} />
      <div className="align-items-baseline d-flex justify-content-between">
        <Form layout="inline" className="my-2 ps-2  rounded-1 bg-white">
          <Form.Item className=" my-1">
            <Input
              allowClear
              style={{ height: 36 }}
              placeholder="সনদ নাম্বার"
              value={sonod_Id}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item className=" my-1">
            <Button
              onClick={handleSearch}
              type="primary"
              htmlType="submit"
              className=" border-1 py-3"
            >
              {isFetching ? "অপেক্ষা করুন" : "খুঁজুন"}
            </Button>
          </Form.Item>
        </Form>
        <div>
          <button
            disabled={isFetching}
            onClick={() => refetch()}
            className="btn btn-info text-white"
          >
            {isFetching ? "অপেক্ষা করুন" : "Reload"}
          </button>
        </div>
      </div>
      <hr />

      {isFetching ? (
        <div className="d-flex justify-content-center my-5 s">
          {" "}
          <Spinner />
        </div>
      ) : (
        <>
          {isMobile ? (
            <Card title="সনদ নাম্বার দিয়ে খুঁজুন" className="sonodCard">
              <div className="sonodCardBody">
                {allSonod.map((item) => (
                  <Card key={item.id} style={{ marginBottom: 16 }}>
                    <p>
                      <strong>সনদ নাম্বার:</strong> {item.sonod_Id}
                    </p>
                    <p>
                      <strong>নাম:</strong> {item.applicant_name}
                    </p>
                    <p>
                      <strong>পিতার/স্বামীর নাম:</strong>{" "}
                      {item.applicant_father_name}
                    </p>
                    <p>
                      <strong>গ্রাম/মহল্লা:</strong>{" "}
                      {item.applicant_present_word_number}
                    </p>
                    <p>
                      <strong>আবেদনের তারিখ:</strong> {item.created_at}
                    </p>
                    {condition === "approved" && (
                      <td>
                        <Link
                          target="_blank"
                          to={`https://api.uniontax.gov.bd/sonod/download/${item.id}`}
                          className="btn btn-success btn-sm me-1"
                        >
                          বাংলা সনদ
                        </Link>
                        {item.hasEnData === 1 && (
                          <Link
                            target="_blank"
                            to={`https://api.uniontax.gov.bd/sonod/download/${item.id}?en=true`}
                            className="btn btn-success btn-sm mr-1"
                          >
                            ইংরেজি সনদ
                          </Link>
                        )}
                      </td>
                    )}
                    <SonodActionBtn
                      condition={condition}
                      item={item}
                      sonodName={sonodName}
                    />
                    <p
                      className={`mt-2 fs-6 text-white text-center py-2 ${
                        item.payment_status === "Paid"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      <strong>ফি:</strong> {item.payment_status}
                    </p>
                  </Card>
                ))}
              </div>
            </Card>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr className="text-center">
                    <th scope="col">সনদ নাম্বার</th>
                    <th scope="col">নাম</th>
                    <th scope="col">পিতার/স্বামীর নাম</th>
                    <th scope="col">গ্রাম/মহল্লা/ওয়ার্ড নং</th>
                    <th scope="col">আবেদনের তারিখ</th>
                    <th scope="col">ফি</th>
                    {condition === "approved" && <th scope="col">সনদ</th>}
                    <th scope="col">কার্যক্রম</th>
                  </tr>
                </thead>
                <tbody>
                  {allSonod.map((item) => (
                    <tr key={item.id} className="text-center">
                      <td>{item.sonod_Id}</td>
                      <td>{item.applicant_name}</td>
                      <td>{item.applicant_father_name}</td>
                      <td>{item.applicant_present_word_number}</td>
                      <td>{new Date(item.created_at).toLocaleString()}</td>
                      <td>
                        <span
                          className={`d-block font-monospace fs-6 p-1 rounded text-white ${
                            item.payment_status === "Paid"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {" "}
                          {item.payment_status}
                        </span>
                      </td>
                      {condition === "approved" && (
                        <td>
                          <Link
                            target="_blank"
                            to={`https://api.uniontax.gov.bd/sonod/download/${item.id}`}
                            className="btn btn-success btn-sm me-1"
                          >
                            বাংলা সনদ
                          </Link>
                          {item.hasEnData === 1 && (
                            <Link
                              target="_blank"
                              to={`https://api.uniontax.gov.bd/sonod/download/${item.id}?en=true`}
                              className="btn btn-success btn-sm mr-1"
                            >
                              ইংরেজি সনদ
                            </Link>
                          )}
                        </td>
                      )}
                      <td>
                        <SonodActionBtn
                          condition={condition}
                          item={item}
                          sonodName={sonodName}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      <div className="d-flex justify-content-center mt-4">
        <Pagination
          current={currentPage}
          total={totalPages * 10} // Ant Design Pagination uses total items, not pages
          pageSize={10} // Assuming 10 items per page
          onChange={handlePageChange}
          showSizeChanger={false} // Hide the page size changer
        />
      </div>
    </div>
  );
};

export default SonodManagement;
