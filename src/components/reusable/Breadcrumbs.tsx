import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

interface BreadcrumbProps {
  current?: string;
  page?: string;
  className?: string;
  defaltTextColor?: string;
}

const Breadcrumbs = ({
  page,
  current,
  className = " mb-4",
  defaltTextColor = "defaltTextColor",
}: BreadcrumbProps) => {
  // Construct the breadcrumb items
  const breadcrumbItems = [
    {
      title: (
        <Link to="/dashboard">
          <HomeOutlined />
        </Link>
      ),
      key: "home",
    },
    ...(page
      ? [
          {
            title: page,
            key: "page",
          },
        ]
      : []),
    ...(current
      ? [
          {
            title: current,
            key: "current",
          },
        ]
      : []),
  ];

  return (
    <div className={`breadcrumbs-area ${className}`}>
      <h3 className={defaltTextColor}>
        {page && ` ${page} ||`} {current}
      </h3>
      <Breadcrumb items={breadcrumbItems} separator=">" />
    </div>
  );
};

export default Breadcrumbs;
