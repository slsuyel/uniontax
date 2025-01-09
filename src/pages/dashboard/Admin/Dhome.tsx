import { useDbMetricsQuery } from "@/redux/api/user/userApi";
// import MonthlyCart from "./MonthlyCart";
import Summary from "./Summary";
// import SummaryChart from "./SummaryChart";
import Loader from "@/components/reusable/Loader";
import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
import Breadcrumbs from "@/components/reusable/Breadcrumbs";

const Dhome = () => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const token = localStorage.getItem(`token`);
  const { data, isLoading } = useDbMetricsQuery({ token });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="card p-3 border-0">
      <Breadcrumbs
        current={`${user?.dashboard_title}`}
        page={`${user?.designation}`}
      />
      {/* <div className="row mx-auto my-2 ">
        <SummaryChart />
        <MonthlyCart />
      </div> */}
      <Summary data={data?.data} />
    </div>
  );
};

export default Dhome;
