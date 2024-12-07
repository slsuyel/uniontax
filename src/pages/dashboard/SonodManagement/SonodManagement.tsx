/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { useParams } from "react-router-dom";
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
  const [sonod_Id, setSonod_Id] = useState("");
  const [searchSonodId, setSearchSonodId] = useState("");
  const { sonodName, condition } = useParams();
  const token = localStorage.getItem("token");
  const { data, isLoading, isFetching } = useAllSonodQuery({
    sonodName: sonodName,
    stutus: condition || "Pending",
    sondId: searchSonodId,
    token,
  });

  const services = useAllServices();

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

  const allSonod: TApplicantData[] = data?.data.sonods.data || [];

  return (
    <div>
      <Breadcrumbs page={s_name} current={condition_bn} />

      <Form layout="inline" className="my-2 ps-2 py-4 rounded-1 bg-white">
        <Form.Item>
          <Input
            allowClear
            style={{ height: 36 }}
            placeholder="সনদ নাম্বার"
            value={sonod_Id}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            onClick={handleSearch}
            type="primary"
            htmlType="submit"
            className="btn_main border-1 py-3"
          >
            {isFetching ? "অপেক্ষা করুন" : "খুঁজুন"}
          </Button>
        </Form.Item>
      </Form>
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
              <table className="table table-bordered">
                <thead>
                  <tr className="text-center">
                    <th scope="col">সনদ নাম্বার</th>
                    <th scope="col">নাম</th>
                    <th scope="col">পিতার/স্বামীর নাম</th>
                    <th scope="col">গ্রাম/মহল্লা</th>
                    <th scope="col">আবেদনের তারিখ</th>
                    <th scope="col">ফি</th>
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
                      <td>{item.created_at}</td>
                      <td
                        className={` fs-6 text-white ${
                          item.payment_status === "Paid"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {item.payment_status}
                      </td>
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
    </div>
  );
};

export default SonodManagement;
