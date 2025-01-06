import { useState } from "react";
import { Link } from "react-router-dom";
import { TApplicantData } from "@/types";
import { useSonodActionMutation } from "@/redux/api/sonod/sonodApi";
import { message, Dropdown, Menu, Button } from "antd";
import SingleSonodViewModal from "@/pages/dashboard/SonodManagement/SingleSonodViewModal";

interface SonodActionBtnProps {
  sonodName: string | undefined;
  item: TApplicantData;
  condition: string | undefined;
}

const SonodActionBtn = ({
  sonodName,
  item,
  condition,
}: SonodActionBtnProps) => {
  const token = localStorage.getItem("token");
  const [sonodAction, { isLoading }] = useSonodActionMutation();
  const [view, setView] = useState(false);
  const [viewEn, setViewEn] = useState(false);

  const handleView = () => {
    setView(true);
  };
  const handleViewEn = () => {
    setViewEn(true);
    setView(true);
  };

  const handleCancel = () => {
    setView(false);
  };

  const handleApproved = async () => {
    try {
      const response = await sonodAction({ id: item.id, token }).unwrap();
      console.log("Success:", response.data.message);
      message.success(` ${response.data.message}`);
    } catch (err) {
      console.error("Error:", err);
      message.error("কিছু সমস্যা হয়েছে");
    }
  };

  const menu = (
    <Menu>
      <Menu.Item className="border my-1 border-info" key="edit">
        <Link
          className="text-decoration-none"
          to={`/dashboard/sonod/${sonodName}/action/edit/${item.id}`}
        >
          এডিট করুন
        </Link>
      </Menu.Item>
      <Menu.Item className="border my-1 border-success" key="receipt">
        <Link
          className="text-decoration-none text-success "
          to={`https://api.uniontax.gov.bd/applicant/copy/download/${item.id}`}
          target="_blank"
        >
          প্রাপ্তী স্বীকারপত্র
        </Link>
      </Menu.Item>
      <Menu.Item
        className="border my-1 border-info"
        key="view"
        onClick={handleView}
      >
        আবেদনপত্র দেখুন
      </Menu.Item>
      {item.hasEnData !== 0 && (
        <Menu.Item
          className="border my-1 border-info"
          key="view_en"
          onClick={handleViewEn}
        >
          ইংরেজি আবেদনপত্র দেখুন
        </Menu.Item>
      )}

      {condition !== "cancel" && condition !== "approved" && (
        <Menu.Item
          className="border text-success border-warning my-1"
          key="approve"
          onClick={handleApproved}
        >
          {isLoading ? "অপেক্ষা করুন" : "অনুমোদন"}
        </Menu.Item>
      )}
      <Menu.Item className="border my-1 border-success" key="invoice">
        <Link
          className="text-decoration-none"
          to={`https://api.uniontax.gov.bd/sonod/invoice/download/${item.id}`}
          target="_blank"
        >
          রশিদ প্রিন্ট
        </Link>
      </Menu.Item>
      {condition === "new" && (
        <Menu.Item className="border my-1" key="cancel">
          <Button type="link" danger>
            বাতিল করুন
          </Button>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <>
      <div className="d-flex justify-content-center flex-wrap gap-2">
        {condition !== "cancel" && condition !== "approved" && (
          <button
            className="border border-warning btn btn-sm btn-success"
            key="approve"
            onClick={handleApproved}
          >
            {isLoading ? "অপেক্ষা করুন" : "অনুমোদন"}
          </button>
        )}
        <Dropdown overlay={menu} placement="bottomLeft" arrow>
          <Button type="primary">Actions</Button>
        </Dropdown>

        {/* {condition === "approved" && (
          <>
            <Link className="text-decoration-none"
              target="_blank"
              to={`https://api.uniontax.gov.bd/sonod/download/${item.id}`}
              className="btn btn-success btn-sm mr-1"
            >
              বাংলা সনদ
            </Link>
            {item.hasEnData === 1 && (
              <Link className="text-decoration-none"
                target="_blank"
                to={`https://api.uniontax.gov.bd/sonod/download/${item.id}?en=true`}
                className="btn btn-success btn-sm mr-1"
              >
                ইংরেজি সনদ
              </Link>
            )}
          </>
        )} */}
      </div>

      {view && (
        <SingleSonodViewModal
          onCancel={handleCancel}
          visible={view}
          key={0}
          en={viewEn}
          id={item.id}
          from="dashboard"
        />
      )}
    </>
  );
};

export default SonodActionBtn;
