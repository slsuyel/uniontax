import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  current: string;
}

const Breadcrumbs = ({ items, current }: BreadcrumbsProps) => {
  return (
    <div className="banner mx-auto container">
      <div className="banner-content">
        <h1 className="banner-title">Student Application Form</h1>
        <p className="banner-links">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <Link to={item.path} className="banner-link">
                {item.name}
              </Link>
              {index < items.length - 1 && (
                <span className="banner-divider">/</span>
              )}
            </React.Fragment>
          ))}
          <span className="banner-divider">/</span>
          <span className="banner-current">{current}</span>
        </p>
      </div>
    </div>
  );
};

export default Breadcrumbs;
