import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import Loader from "@/components/reusable/Loader";
import { useSonodFeesQuery } from "@/redux/api/sonod/sonodApi";

interface TSonodFee {
  sonod_fees_id: number;
  sonodnamelist_id: number;
  service_id: string;
  bnname: string;
  template: string;
  unioun: string;
  fees: string;
}


const SonodFee = () => {
  // Fetch the sonod information from the state
  const token = localStorage.getItem('token');
  const { data, isLoading } = useSonodFeesQuery({ token });

  if (isLoading) {
    return <Loader />;
  }


  const allsonod: TSonodFee[] = data?.data;

  const dataSource = allsonod.map((d, index) => ({
    key: index + 1,
    bnname: d.bnname,
    fees: d.fees,
  }));

  return (
    <div className="container">
      <Breadcrumbs current="সনদ ফি" />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>বাংলা নাম</th>
            <th>ফি</th>
          </tr>
        </thead>
        <tbody>
          {dataSource.map((item) => (
            <tr key={item.key}>
              <td>{item.key}</td>
              <td>{item.bnname}</td>
              <td>{item.fees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SonodFee;
