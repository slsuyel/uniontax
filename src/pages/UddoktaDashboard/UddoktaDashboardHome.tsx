import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";

const UddoktaDashboardHome = () => {
  const sonodInfo = useAppSelector((state: RootState) => state.union.sonodList);
  console.log(sonodInfo);
  return (
    <div className=" container mx-auto">
      {sonodInfo.map((service, index) => (
        <button
          key={index}
          className="col-lg-2 col-md-3 col-sm-4 col-6 my-3 text-center border-0 bg-transparent"
        >
          <div className="serviceBox py-2">
            <div className="serviceLogo">
              <img src={service.icon} alt="" width={60} />
            </div>
            <div className="serviceTitle defaltTextColor mt-2">
              <h6> {service.bnname.slice(0, 20)}</h6>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default UddoktaDashboardHome;
