import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, message, Modal } from "antd";
import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import { useRenewPreviousHoldingMutation } from "@/redux/api/sonod/sonodApi";
import { useAppSelector } from "@/redux/features/hooks";

const HoldingTax = () => {
  const user = useAppSelector((state: RootState) => state.user.user)
  console.log(user.unioun);
  const token = localStorage.getItem('token')
  const [renewPreviousHolding, { isLoading }] = useRenewPreviousHoldingMutation()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const wards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const res = await renewPreviousHolding({ token,union:user.unioun }).unwrap();
      if (res.isError) {
        setIsModalVisible(false);
        message.error("কিছু সমস্যা হয়েছে, দয়া করে আবার চেষ্টা করুন।");
      } else {
        message.success("পূর্বের হোল্ডিং ট্যাক্স সফলভাবে রিনিউ করা হয়েছে।");
        setIsModalVisible(false);
      }
    } catch (error) {
      console.log("Error:", error);
      message.error("কিছু সমস্যা হয়েছে, দয়া করে আবার চেষ্টা করুন।");
    }

  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="card p-3 border-0">
      <Breadcrumbs current="হোল্ডিং ট্যাক্স" />
      <Card>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <div className="row">
              <div className="align-item-center d-flex justify-content-between">
                <div className="align-item-center d-flex gap-1">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={showModal}
                  >
                    পূর্বের হোল্ডিং ট্যাক্স রিনিউ করুন
                  </button>

                  <Link className="btn btn-sm btn-success" to={`/dashboard/holding/import/`}>Import</Link>
                </div>
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
      {/* Confirmation Modal */}
      <Modal
        title="নিশ্চিত করুন"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="হ্যাঁ"
        cancelText="না"
        loading={isLoading}
      >
        <p className=" border-top p-2">আপনি কি পূর্বের হোল্ডিং ট্যাক্স রিনিউ করতে চান?</p>
      </Modal>
    </div>
  );
};

export default HoldingTax;
