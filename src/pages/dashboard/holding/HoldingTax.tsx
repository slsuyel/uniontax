import { Link } from "react-router-dom";
import { Card, Button } from 'antd';
import Breadcrumbs from "@/components/reusable/Breadcrumbs";

const HoldingTax = () => {
  const wards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // const wards_bn = ['১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  return (
    <div>
      <Breadcrumbs current="হোল্ডিং ট্যাক্স" />
      <Card>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <div className="row">
              <div className="col-md-12">
                <h5 className="card-title">হোল্ডিং ট্যাক্স</h5>
              </div>
              {wards.map((ward) => (
                <div key={ward} className="col-md-2 col-sm-3 my-4 col-4">
                  <Link to={`/dashboard/holding/tax/list/${ward}`}>
                    <Button type="primary" size="large">
                      {`${ward} নং ওয়ার্ড`}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HoldingTax;
