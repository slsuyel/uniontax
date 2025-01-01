import MonthlyCart from "./MonthlyCart";
import Summary from "./Summary";
import SummaryChart from "./SummaryChart";

const Dhome = () => {
  return (
    <div className="card p-2 border-0">
      <div className="row mx-auto my-2 ">
        <SummaryChart />
        <MonthlyCart />
      </div>
      <Summary />
    </div>
  );
};

export default Dhome;
