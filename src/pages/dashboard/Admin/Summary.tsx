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
      <div className="border-0 card h-100 mb-2 py-3 shadow hover-effect">
        <div className="card-body d-flex align-items-center justify-content-around">
          <img
            src={icon}
            alt={title}
            style={{ width: "80px", height: "80px" }} // Adjust size as needed
          />
          <div className="text-end">
            <h5 className="card-title fw-bold mb-2">{title}</h5>
            <p className="card-text fs-4 mb-0 text-primary fw-bold">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Summary = () => {
  const summaryItems = [
    { icon: allApplications, title: "মোট আবেদন", value: 15299 },
    { icon: newApplications, title: "নতুন আবেদন", value: 1126 },
    { icon: approvedApplications, title: "ইস্যুকৃত সনদ", value: 26 },
    { icon: canceledApplications, title: "বাতিলকৃত আবেদন", value: 500 },
    { icon: totalFees, title: "মোট আদায়কৃত ফি পরিমাণ", value: 396 },
  ];

  return (
    <div className="row mx-auto p-3">
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
