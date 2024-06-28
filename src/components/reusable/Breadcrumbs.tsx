import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

interface BreadcrumbProps {
  paths: { name?: string; link?: string }[];
  current?: string;
}

const Breadcrumbs = ({ paths, current }: BreadcrumbProps) => {
  return (
    <div className="breadcrumbs-area mb-4">
      <h3>
        {paths[0].name} || {current}
      </h3>
      <Breadcrumb separator=">">
        <Breadcrumb.Item>
          <Link to="/dashboard">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        {paths.map((path, index) => (
          <Breadcrumb.Item key={index}>
            {index === paths.length - 1 ? (
              <span>{path.name}</span>
            ) : (
              <Link to={path.link || '/dashboard'}>{path.name}</Link>
            )}
          </Breadcrumb.Item>
        ))}
        <Breadcrumb.Item>{current}</Breadcrumb.Item>
      </Breadcrumb>

      <br />
    </div>
  );
};

export default Breadcrumbs;
