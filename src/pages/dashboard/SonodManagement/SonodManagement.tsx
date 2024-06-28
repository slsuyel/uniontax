/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Breadcrumbs from '@/components/reusable/Breadcrumbs';
import useAllServices from '@/hooks/useAllServices';
import { checkNameCondition } from '@/utils/checkNameCondition';

const SonodManagement = () => {
  const services = useAllServices();
  const { sonodName, condition } = useParams();
  const { s_name, condition_bn } = checkNameCondition(
    services,
    sonodName,
    condition
  );
  console.log(condition);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [dataSource] = useState([
    {
      key: '1',
      sonodNumber: '77349852200016',
      name: 'মোঃ রুহুল আমিন',
      fatherOrHusbandName: 'মোঃ আব্দুল বারেক',
      villageOrWard: 'চতুরাডাঙ্গী সুতিপাড়া',
      applicationDate: '2023-05-26 6:33 pm',
      feeStatus: 'পরিশোধিত',
    },
    {
      key: '2',
      sonodNumber: '77349852200017',
      name: 'মোঃ আব্দুল করিম',
      fatherOrHusbandName: 'মোঃ মোহাম্মদ আলী',
      villageOrWard: 'কমলাপুর বাজার',
      applicationDate: '2023-06-10 4:45 pm',
      feeStatus: 'পরিশোধিত',
    },
  ]);

  const handleSearch = (values: any) => {
    const searchText = values.searchText;
    if (searchText) {
      console.log('সনদ নাম্বার:', searchText);
    }
  };

  return (
    <div>
      <Breadcrumbs
        paths={[{ name: s_name, link: '' }]}
        current={condition_bn}
      />

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
            {dataSource.map(item => (
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
                <p>
                  <strong>ফি:</strong> {item.feeStatus}
                </p>
                <div
                  className="d-flex justify-content-center flex-wrap gap-2"
                  role="group"
                  aria-label="Actions"
                >
                  <Link
                    to={`/dashboard/sonod/action/edit/${item.key}`}
                    className="btn btn-info btn-sm mr-1"
                  >
                    এডিট করুন
                  </Link>
                  <Link
                    to={`/document/নাগরিকত্ব সনদ/${item.key}`}
                    className="btn btn-success btn-sm mr-1"
                    target="_blank"
                  >
                    প্রাপ্তী স্বীকারপত্র
                  </Link>
                  <button type="button" className="btn btn-info btn-sm mr-1">
                    আবেদনপত্র দেখুন
                  </button>
                  <button type="button" className="btn btn-success btn-sm mr-1">
                    অনুমোদন
                  </button>
                  <Link
                    to={`/invoice/d/${item.key}`}
                    className="btn btn-info btn-sm mr-1"
                    target="_blank"
                  >
                    রশিদ প্রিন্ট
                  </Link>
                  <button type="button" className="btn btn-danger btn-sm mr-1">
                    বাতিল করুন
                  </button>
                </div>
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
              {dataSource.map(item => (
                <tr key={item.key} className="text-center">
                  <td>{item.sonodNumber}</td>
                  <td>{item.name}</td>
                  <td>{item.fatherOrHusbandName}</td>
                  <td>{item.villageOrWard}</td>
                  <td>{item.applicationDate}</td>
                  <td>{item.feeStatus}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Actions"
                    >
                      <Link
                        to={`/dashboard/sonod/action/edit/${item.key}`}
                        className="btn btn-info btn-sm mr-1"
                      >
                        এডিট করুন
                      </Link>
                      <Link
                        to={`/document/নাগরিকত্ব সনদ/${item.key}`}
                        className="btn btn-success btn-sm mr-1"
                        target="_blank"
                      >
                        প্রাপ্তী স্বীকারপত্র
                      </Link>
                      <button
                        type="button"
                        className="btn btn-info btn-sm mr-1"
                      >
                        আবেদনপত্র দেখুন
                      </button>
                      <button
                        type="button"
                        className="btn btn-success btn-sm mr-1"
                      >
                        অনুমোদন
                      </button>
                      <Link
                        to={`/invoice/d/${item.key}`}
                        className="btn btn-info btn-sm mr-1"
                        target="_blank"
                      >
                        রশিদ প্রিন্ট
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm mr-1"
                      >
                        বাতিল করুন
                      </button>
                    </div>
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
