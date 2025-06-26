import { useParams } from 'react-router-dom';
import {
  useGetSingleTenderQuery,
  useSelectTenderMutation,
  useLazyGetAllApplicationsQuery
} from '@/redux/api/tender/tenderApi';
import { message } from "antd";
import { useState, useEffect } from 'react';

const TenderDropList = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleTenderQuery(id);
  const [selectTender, { isLoading: selecting }] = useSelectTenderMutation();
  const [trigger, { isFetching }] = useLazyGetAllApplicationsQuery();

  const [dropList, setDropList] = useState([]);

  // ✅ প্রাথমিকভাবে data থেকে তালিকা সেট বা status=Completed হলে selected লোড
  useEffect(() => {
 
    let SelectedStatus = '';
    if (data?.data?.status === "Completed") {
         SelectedStatus = 'Selected';
    }
      trigger({ tender_id: id, status: SelectedStatus })
        .unwrap()
        .then((res) => {
          setDropList(res.data || res);
        })
        .catch(() => {
          message.error("নির্বাচিত তালিকা লোড করতে ব্যর্থ হয়েছে");
        });



  }, [data]);

  // ✅ নির্বাচন ফাংশন
  const handleSelect = async () => {
    try {
      const res = await selectTender(id).unwrap();

      if (res.status_code === 200) {
        message.success("নির্বাচন সফল হয়েছে");

        const selected = await trigger({ tender_id: id, status: "Selected" }).unwrap();
        setDropList(selected.data || selected);
      } else {
        message.error(res.data?.message || "নির্বাচন ব্যর্থ হয়েছে");
      }
    } catch (err: any) {
      alert('নির্বাচনে সমস্যা হয়েছে');
    }
  };

  if (isLoading) return <p>লোড হচ্ছে...</p>;
  if (error) return <p>ডাটা লোড করতে সমস্যা হয়েছে।</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">নির্বাচিত তালিকা</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>দরপত্র নম্বর</th>
            <th>নাম</th>
            <th>পিতার নাম</th>
            <th>ঠিকানা</th>
            <th>মোবাইল</th>
            <th>দরের পরিমাণ</th>
            <th>কথায়</th>
            <th>জামানতের পরিমাণ</th>
            <th>Files</th>
          </tr>
        </thead>
        <tbody>
          {dropList.length > 0 ? (
            dropList.map((item:any, index) => (
              <tr key={index}>
                <td>{item.dorId}</td>
                <td>{item.applicant_orgName}</td>
                <td>{item.applicant_org_fatherName}</td>
                <td>{`${item.vill}, ${item.postoffice}, ${item.thana}, ${item.distric}`}</td>
                <td>{item.mobile}</td>
                <td>{item.DorAmount}</td>
                <td>{item.DorAmountText}</td>
                <td>{item.depositAmount}</td>
                <td>
                  {item.bank_draft_image ? (
                    <a href={item.bank_draft_image} target="_blank" rel="noreferrer">
                      দেখুন
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center">তথ্য পাওয়া যায়নি</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ নির্বাচন বাটন শুধু তখনই দেখাও যখন status !== Completed */}
      {data?.status !== "Completed" && (
        <div className="text-center mt-4">
          <button
            className="btn btn-success"
            onClick={handleSelect}
            disabled={selecting || isFetching}
          >
            {selecting ? 'নির্বাচন হচ্ছে...' : 'এই বাটন ক্লিক করে নির্বাচন করুন'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TenderDropList;
