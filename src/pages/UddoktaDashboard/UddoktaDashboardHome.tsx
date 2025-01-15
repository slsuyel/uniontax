import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

const UddoktaDashboardHome = () => {
  const navigate = useNavigate();
  const sonodInfo = useAppSelector((state: RootState) => state.union.sonodList);
  const last_sonod = useAppSelector(
    (state: RootState) => state.informations.lastApplicationSonodName
  );
  const informations = useAppSelector(
    (state: RootState) => state.informations.data
  );
  const handleService = (service: string) => {
    if (last_sonod && informations && last_sonod !== service) {
      Modal.confirm({
        title: `আপনি ইতোপূর্বে ${informations?.fullNameBN} এর জন্যে একটি ${last_sonod} এর আবেদন করার চেষ্টা করেছেন।`,
        content: ` অনুগ্রহ করে আবেদনটি সম্পন্য করে নতুন আবেদনের চেষ্টা করুন। `,
        okText: "OK",
        cancelButtonProps: { style: { display: "none" } },
        onOk() {
          navigate(`/uddokta/application/${last_sonod}`);
        },
      });
    } else {
      navigate(`/uddokta/application/${service}`);
    }
  };

  return (
    <div className="container mx-auto">
      {sonodInfo.map((service, index) => (
        <button
          onClick={() => handleService(service.bnname)}
          key={index}
          className="col-lg-2 col-md-3 col-sm-4 col-6 my-3 text-center border-0 bg-transparent"
        >
          <div className="serviceBox py-2">
            <div className="serviceLogo">
              <img loading="lazy" src={service.icon} alt="" width={60} />
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
