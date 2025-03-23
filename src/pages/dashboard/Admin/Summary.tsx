/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import allApplications from "/images/all-application.png";
import approvedApplications from "/images/approved-application.png";
import canceledApplications from "/images/cancel-application.png";
import newApplications from "/images/new-application.png";
import totalFees from "/images/total-fees.png";

const SummaryItem = ({
  icon,
  title,
  value,
}: {
  icon: string; // This will now be the image source
  title: string;
  value: number;
}) => {
  return (
    <div className="col-md-3 my-2">
      <div className="border-0 card h-100 mb-2 py-2 shadow hover-effect">
        <div className="card-body d-flex align-items-center justify-content-around">
          <img  
            src={icon}
            alt={title}
            style={{ width: "80px", height: "80px" }} 
          />
          <div className="text-end">
            <h5 className="card-title fw-bold mb-2 fs-6 text-secondary">
              {title}
            </h5>
            <p className="card-text fs-4 mb-0  fw-bold">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Summary = ({ data }: any) => {
  const summaryItems = [
    { icon: allApplications, title: "মোট আবেদন", value: data?.totalSonod },
    { icon: newApplications, title: "নতুন আবেদন", value: data?.pendingSonod },
    {
      icon: approvedApplications,
      title: "ইস্যুকৃত সনদ",
      value: data?.approvedSonod,
    },
    {
      icon: canceledApplications,
      title: "বাতিলকৃত আবেদন",
      value: data?.cancelSonod,
    },
    {
      icon: totalFees,
      title: "মোট আদায়কৃত ফি'র পরিমাণ",
      value: (data?.totalRevenue).toFixed(2),
    },
    {
      icon: "/images/sms.webp",
      title: "SMS Balance",
      value: (data?.sms_balance),
    },
  ];

  return (
    <div className="row  ">
      {summaryItems.map((item, index) => (
        <SummaryItem
          key={index}
          icon={item.icon}
          title={item.title}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default Summary;
