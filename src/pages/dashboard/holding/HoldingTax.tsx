import { Link } from "react-router-dom";
import { Card } from "antd";
import Breadcrumbs from "@/components/reusable/Breadcrumbs";

const HoldingTax = () => {
  const wards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="card p-3 border-0">
      <Breadcrumbs current="হোল্ডিং ট্যাক্স" />
      <Card>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <div className="row">
              <div className="align-item-center d-flex justify-content-between">
                <h5 className="card-title">হোল্ডিং ট্যাক্স</h5>
                <Link className="btn btn-sm btn-success" to={`/dashboard/holding/import/`}>Import</Link>
              </div>
              {wards.map((ward) => (
                <div key={ward} className="col-md-2 col-sm-3 my-4 col-4">
                  <Link
                    className="align-item-center btn btn-primary w-100 text-white fs-4 "
                    to={`/dashboard/holding/tax/list/${ward}`}
                  >
                    <img
                      alt="holding"
                      className=""
                      src="https://cdn-icons-png.flaticon.com/512/11008/11008490.png"
                      width={50}
                      height={50}
                    />
                    <span className=" d-flex justify-content-center text-center text-nowrap">
                      {" "}
                      {`${ward} নং ওয়ার্ড`}
                    </span>
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
