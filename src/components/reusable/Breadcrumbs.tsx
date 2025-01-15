// import { Link } from 'react-router-dom';
// import { Breadcrumb } from 'antd';
// import { HomeOutlined } from '@ant-design/icons';

// interface BreadcrumbProps {
//   current?: string;
//   page?: string;
// }

// const Breadcrumbs = ({ page, current }: BreadcrumbProps) => {
//   return (
//     <div className="breadcrumbs-area mb-4">
//       <h3>
//         {page && ` ${page} ||`} {current}
//       </h3>
//       <Breadcrumb separator=">">
//         <Breadcrumb.Item>
//           <Link to="/dashboard">
//             <HomeOutlined />
//           </Link>
//         </Breadcrumb.Item>
//         {current && <Breadcrumb.Item>{current}</Breadcrumb.Item>}
//       </Breadcrumb>
//       <br />
//     </div>
//   );
// };

// export default Breadcrumbs;
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

interface BreadcrumbProps {
  current?: string;
  page?: string;
  className?: string;
}

const Breadcrumbs = ({
  page,
  current,
  className = " mb-4",
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
      <h3 className="defaltTextColor">
        {page && ` ${page} ||`} {current}
      </h3>
      <Breadcrumb items={breadcrumbItems} separator=">" />
    </div>
  );
};

export default Breadcrumbs;
