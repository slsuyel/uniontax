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
        //  SelectedStatus = 'Selected';
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

        const selected = await trigger({ tender_id: id }).unwrap();
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
             <th>অবস্থা</th>
          </tr>
        </thead>
<tbody>
  {dropList.length > 0 ? (
    dropList.map((item: any, index) => {
      const isSelected = item.status === "Selected";
      const cellStyle = isSelected
        ? { backgroundColor: "#198754", color: "white" } // Bootstrap success green
        : { backgroundColor: "#6c757d", color: "white" }; // Bootstrap secondary gray

      return (
        <tr key={index}>
          <td style={cellStyle}>{item.dorId}</td>
          <td style={cellStyle}>{item.applicant_orgName}</td>
          <td style={cellStyle}>{item.applicant_org_fatherName}</td>
          <td style={cellStyle}>{`${item.vill}, ${item.postoffice}, ${item.thana}, ${item.distric}`}</td>
          <td style={cellStyle}>{item.mobile}</td>
          <td style={cellStyle}>{item.DorAmount}</td>
          <td style={cellStyle}>{item.DorAmountText}</td>
          <td style={cellStyle}>{item.depositAmount}</td>
          <td style={cellStyle}>
            {item.bank_draft_image ? (
              <a
                href={item.bank_draft_image}
                target="_blank"
                rel="noreferrer"
                style={isSelected ? { color: "white", textDecoration: "underline" } : { color: "white", textDecoration: "underline" }}
              >
                দেখুন
              </a>
            ) : (
              'N/A'
            )}
          </td>
          <td style={cellStyle}>
            {isSelected ? <strong>নির্বাচিত</strong> : <strong>নির্বাচিত হতে পারে নি</strong>}
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan={10} className="text-center">তথ্য পাওয়া যায়নি</td>
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
