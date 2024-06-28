import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

interface BreadcrumbProps {
  paths: { name?: string; link?: string }[];
  current?: string;
}

const Breadcrumbs = ({ paths, current }: BreadcrumbProps) => {
  const breadcrumbItems = [
    {
      title: (
        <Link to="/dashboard">
          <HomeOutlined />
        </Link>
      ),
    },
    ...paths.map((path, index) => ({
      title:
        index === paths.length - 1 ? (
          <span>{path.name}</span>
        ) : (
          <Link to={path.link || '/dashboard'}>{path.name}</Link>
        ),
    })),
    {
      title: current,
    },
  ];

  return (
    <div className="breadcrumbs-area mb-4">
      <h3>
        {paths[0].name && '||'} {current}
      </h3>
      <Breadcrumb items={breadcrumbItems} separator=">" />
      <br />
    </div>
  );
};

export default Breadcrumbs;
