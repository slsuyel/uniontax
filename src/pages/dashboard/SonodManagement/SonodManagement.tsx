/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
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

const SonodManagement = () => {
  const { sonodName, condition } = useParams();
  const token = localStorage.getItem("token");
  const { data, isLoading } = useAllSonodQuery({
    sonodName: sonodName,
    stutus: condition || "Pending",
    token,
  });

  const services = useAllServices();

  const { s_name, condition_bn } = checkNameCondition(
    services,
    sonodName,
    condition
  );
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [dataSource] = useState([
    {
      key: "1",
      sonodNumber: "77349852200016",
      name: "মোঃ রুহুল আমিন",
      fatherOrHusbandName: "মোঃ আব্দুল বারেক",
      villageOrWard: "চতুরাডাঙ্গী সুতিপাড়া",
      applicationDate: "2023-05-26 6:33 pm",
      feeStatus: "পরিশোধিত",
    },
    {
      key: "2",
      sonodNumber: "77349852200017",
      name: "মোঃ আব্দুল করিম",
      fatherOrHusbandName: "মোঃ মোহাম্মদ আলী",
      villageOrWard: "কমলাপুর বাজার",
      applicationDate: "2023-06-10 4:45 pm",
      feeStatus: "অপরিশোধিত",
    },
  ]);

  const handleSearch = (values: any) => {
    const searchText = values.searchText;
    if (searchText) {
      console.log("সনদ নাম্বার:", searchText);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  const allSonod: TApplicantData[] = data.data.sonods.data;

  console.log(allSonod);

  return (
    <div>
      <Breadcrumbs page={s_name} current={condition_bn} />

      <Form
        layout="inline"
        onFinish={handleSearch}
        className="my-2 ps-2 py-4 rounded-1 bg-white"
      >
        <Form.Item name="searchText">
          <Input style={{ height: 36 }} placeholder="সনদ নাম্বার" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="btn_main border-1 py-3"
          >
            খুঁজুন
          </Button>
        </Form.Item>
      </Form>
      <hr />
      {isMobile ? (
        <Card title="সনদ নাম্বার দিয়ে খুঁজুন" className="sonodCard">
          <div className="sonodCardBody">
            {dataSource.map((item) => (
              <Card key={item.key} style={{ marginBottom: 16 }}>
                <p>
                  <strong>সনদ নাম্বার:</strong> {item.sonodNumber}
                </p>
                <p>
                  <strong>নাম:</strong> {item.name}
                </p>
                <p>
                  <strong>পিতার/স্বামীর নাম:</strong> {item.fatherOrHusbandName}
                </p>
                <p>
                  <strong>গ্রাম/মহল্লা:</strong> {item.villageOrWard}
                </p>
                <p>
                  <strong>আবেদনের তারিখ:</strong> {item.applicationDate}
                </p>

                <SonodActionBtn
                  condition={condition}
                  item={item}
                  sonodName={sonodName}
                />
                <p
                  className={`mt-2 fs-6 text-white text-center py-2 ${
                    item.feeStatus == "পরিশোধিত" ? "bg-success" : "bg-danger"
                  }`}
                >
                  <strong>ফি:</strong> {item.feeStatus}
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
                      item.payment_status == "Paid" ? "bg-success" : "bg-danger"
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
    </div>
  );
};

export default SonodManagement;
