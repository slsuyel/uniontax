import { useState } from "react";
import { Link } from "react-router-dom";
import { TApplicantData } from "@/types";
import { useSonodActionMutation } from "@/redux/api/sonod/sonodApi";
import { message, Dropdown, Menu, Button, Modal, Input } from "antd";
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
  const [bibidoTextModal, setBibidoTextModal] = useState(false);

  const [view, setView] = useState(false);
  const [viewEn, setViewEn] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [textareaValueEn, setTextareaValueEn] = useState("");

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

  const handleOk = async () => {
    const response = await sonodAction({
      id: item.id,
      sec_prottoyon: textareaValue,
      sec_prottoyon_en: textareaValueEn,
      token,
    }).unwrap();
    if (response.data.message) {
      message.success("সনদটি সফলভাবে অনুমোদন করা হয়েছে।");
      hideModal();
    }
  };
  const hideModal = () => {
    setBibidoTextModal(false);
  };
  const handleApproved = async () => {
    if (
      sonodName === "বিবিধ প্রত্যয়নপত্র" ||
      sonodName === "অনাপত্তি সনদপত্র"
    ) {
      setBibidoTextModal(true);
    } else
      Modal.confirm({
        title: "আপনি কি নিশ্চিত?",
        content: "আপনি কি আবেদনটি অনুমোদন করতে চান?",
        okText: "হ্যাঁ",
        cancelText: "না",
        onOk: async () => {
          try {
            const response = await sonodAction({ id: item.id, token }).unwrap();
            console.log("Success:", response.data.message);
            message.success(` ${response.data.message}`);
          } catch (err) {
            console.error("Error:", err);
            message.error("কিছু সমস্যা হয়েছে");
          }
        },
        onCancel: () => {
          console.log("Action canceled");
        },
      });
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
  console.log(item.prottoyon);
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

      {
        <Modal
          maskClosable={false}
          width={"70%"}
          title=""
          open={bibidoTextModal}
          onOk={handleOk}
          onCancel={hideModal}
          okText="ওকে"
          cancelText="না"
          okButtonProps={{ loading: isLoading }}
        >
          <div>
            <div>
              <h5>আবেদনকৃত প্রত্যয়নের বিবরণ (বাংলা সনদ)</h5>
              <p>{item?.prottoyon}</p>
            </div>
            <div>
              {" "}
              <h5>প্রত্যয়ন প্রদানের বিবরণ (বাংলা সনদ)</h5>
              <Input.TextArea
                rows={8}
                cols={40}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                placeholder="Enter text here..."
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="mt-4">
            <div>
              <h5>আবেদনকৃত প্রত্যয়নের বিবরণ (ইংরেজি সনদ)</h5>
              <p>{item?.english_prottoyon}</p>
            </div>
            <div>
              {" "}
              <h5>প্রত্যয়ন প্রদানের বিবরণ (ইংরেজি সনদ)</h5>
              <Input.TextArea
                rows={8}
                cols={40}
                value={textareaValueEn}
                onChange={(e) => setTextareaValueEn(e.target.value)}
                placeholder="Enter text here..."
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </Modal>
      }
    </>
  );
};

export default SonodActionBtn;
