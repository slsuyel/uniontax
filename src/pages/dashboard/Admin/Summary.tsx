const SummaryItem = ({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: number;
}) => {
  return (
    <div className="col-md-3 my-1 font_amazon">
      <div className="border-0 card hov-card mb-2 py-3 shadow-sm">
        <div className="card-body d-flex align-item-center justify-content-around">
          <i className={`p-3 rounded-circle my-auto ${icon} fs-1`}></i>
          <div className="text-end">
            <h5 className="card-title fw-bold ">{title}</h5>
            <p className="card-text fs-4 mb-0">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Summary = () => {
  const summaryItems = [
    { icon: 'fa-solid fa-file-contract', title: 'মোট আবেদন', value: 15299 },
    { icon: 'fa-solid fa-file-pen', title: 'নতুন আবেদন', value: 1126 },
    { icon: 'fa-solid fa-file-circle-check', title: 'ইস্যুকৃত সনদ', value: 26 },
    { icon: 'fa-solid fa-file-excel', title: 'বাতিলকৃত আবেদন', value: 500 },
    {
      icon: 'fa-solid fa-bangladeshi-taka-sign',
      title: 'মোট আদায়কৃত ফি পরিমাণ',
      value: 396,
    },
  ];

  return (
    <div className="row mx-auto ">
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
