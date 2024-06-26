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
            <h5 className="card-title fw-bold fs-2">{title}</h5>
            <p className="card-text fs-2 mb-0">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Summary = () => {
  const summaryItems = [
    { icon: 'fa-solid fa-users', title: 'Total Registrations', value: 15299 },
    { icon: 'fa-solid fa-user-graduate', title: 'Total Students', value: 1126 },
    { icon: 'fa-solid fa-chalkboard-user', title: 'Total Refuges', value: 26 },
    { icon: 'fa-solid fa-people-roof', title: 'Others', value: 500 },
    { icon: 'fa-solid fa-user-plus', title: 'Pending Request', value: 396 },
    {
      icon: 'fa-solid fa-hand-holding-usd',
      title: 'Scholarships Given',
      value: 2996,
    },
    { icon: 'fa-solid fa-donate', title: 'Total Given amount', value: 120 },
    { icon: 'fa-solid fa-user-plus', title: 'Given This month', value: 25 },
    {
      icon: 'fa-solid fa-exclamation-circle',
      title: 'Pending this month',
      value: 80,
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
