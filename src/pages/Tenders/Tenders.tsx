import { Link } from "react-router-dom";
import RightSidebar from "../Home/RightSidebar";
import { useGetTendersQuery } from "@/redux/api/tender/tenderApi";
import { TTender } from "../dashboard/Tender/TenderList";
import Loader from "@/components/reusable/Loader";

const Tenders = () => {

  const { data: tenders, isLoading } = useGetTendersQuery({ status: '', token: '' })

  if (isLoading) {
    return <Loader />
  }

  console.log(tenders);


  const allTenders: TTender[] = tenders?.data || []


  return (
    <div className=" row mx-auto container my-3">




      <div className="mainBody col-md-9 ">
        <h4 className="text-center">ইজারা</h4>{" "}
        <table className="table">
          <thead>
            <tr>
              <th>প্রকাশের তারিখ </th> <th>বিষয় </th> <th>দেখুন </th>
            </tr>
          </thead>{" "}
          <tbody>

            {
              allTenders?.map((t: TTender) => <tr>
                <td>{t.noticeDate}</td>{" "}
                <td>
                  {t.description}
                </td>{" "}
                <td>
                  <Link
                    to={`/tender/${t.id}`}
                    className="border-1 btn-sm btn_main fs-6 px-3 py-1 text-decoration-none"
                  >
                    দেখুন
                  </Link>
                </td>
              </tr>)
            }




          </tbody>
        </table>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Tenders;
