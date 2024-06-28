import MonthlyCart from './MonthlyCart';
import Summary from './Summary';
import SummaryChart from './SummaryChart';

const Dhome = () => {
  return (
    <div>
      <div className="row mx-auto my-2 ">
        <SummaryChart />
        <MonthlyCart />
      </div>
      <Summary />
    </div>
  );
};

export default Dhome;
