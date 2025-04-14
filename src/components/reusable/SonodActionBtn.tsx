import { useState } from "react";
import { Link } from "react-router-dom";
import { TApplicantData } from "@/types";
import { useSonodActionMutation } from "@/redux/api/sonod/sonodApi";
import { message, Dropdown, Menu, Button, Modal, Input } from "antd";
import SingleSonodViewModal from "@/pages/dashboard/SonodManagement/SingleSonodViewModal";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
import { updatePendingCount } from "@/redux/features/union/unionSlice";
import SonodCancelModal from "../ui/SonodCancelModal";





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
  const dispatch = useAppDispatch();
  const sonodInfo = useAppSelector((state: RootState) => state.union.sonodList);

  const user = useAppSelector((state: RootState) => state.user.user);
  const token = localStorage.getItem("token");
  const [sonodAction, { isLoading }] = useSonodActionMutation();
  const [bibidoTextModal, setBibidoTextModal] = useState(false);

  const [view, setView] = useState(false);
  const [viewEn, setViewEn] = useState(false);
  const [sonodCancelModal, setSonodCancelModal] = useState<boolean>(false);
  const [textareaValue, setTextareaValue] = useState(item?.prottoyon);

  const VITE_BASE_DOC_URL = import.meta.env.VITE_BASE_DOC_URL;


  const [textareaValueEn, setTextareaValueEn] = useState(
    item?.english_prottoyon
  );

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
      (sonodName === "বিবিধ প্রত্যয়নপত্র" ||
        sonodName === "অনাপত্তি সনদপত্র") &&
      user?.position == "Secretary"
    ) {
      setBibidoTextModal(true);
    } else {
      Modal.confirm({
        title: "আপনি কি নিশ্চিত?",
        content: "আপনি কি আবেদনটি অনুমোদন করতে চান?",
        okText: "হ্যাঁ",
        cancelText: "না",
        onOk: async () => {
          try {
            // Perform the sonodAction
            const response = await sonodAction({ id: item.id, token }).unwrap();
            // console.log("Success:", response.data.message);
            message.success(` ${response.data.message}`);
            const sonodItem = sonodInfo.find(
              (sonod) =>
                sonod.bnname === sonodName || sonod.enname === sonodName
            );

            if (sonodItem) {
              const newPendingCount = (sonodItem.pendingCount || 0) - 1;
              dispatch(
                updatePendingCount({
                  id: sonodItem.id,
                  pendingCount: newPendingCount,
                })
              );
            }
          } catch (err) {
            console.error("Error:", err);
            message.error("কিছু সমস্যা হয়েছে");
          }
        },
        onCancel: () => {
          console.log("Action canceled");
        },
      });
    }
  };

  const handleCancelSonod = () => {
    setSonodCancelModal(true);
  };

  console.log(user?.position == "position");

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
      {item.hasEnData == 1 && (
        <Menu.Item className="border my-1 border-info" key="edit">
          <Link
            className="text-decoration-none"
            to={`/dashboard/sonod/${sonodName}/action/edit-english/${item.id}`}
          >
            ইংরেজি সনদ এডিট করুন
          </Link>
        </Menu.Item>
      )}

      <Menu.Item className="border my-1 border-success" key="receipt">
        <Link
          className="text-decoration-none text-success "
          to={`${VITE_BASE_DOC_URL}/applicant/copy/download/${item.id}`}
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

      {(user?.position === "Secretary" && condition === "cancel") ||
      (condition !== "cancel" && condition !== "approved") ? (
        <Menu.Item
          className="border text-success border-warning my-1"
          key="approve"
          onClick={handleApproved}
        >
          {isLoading ? "অপেক্ষা করুন" : "অনুমোদন"}
        </Menu.Item>
      ) : null}

      <Menu.Item className="border my-1 border-success" key="invoice">
        <Link
          className="text-decoration-none"
          to={`${VITE_BASE_DOC_URL}/sonod/invoice/download/${item.id}`}
          target="_blank"
        >
          রশিদ প্রিন্ট
        </Link>
      </Menu.Item>
      {condition === "Pending" && (
        <Menu.Item className="border my-1 border-danger" key="cancel">
          <button onClick={handleCancelSonod} className="border-0">
            বাতিল করুন
          </button>
        </Menu.Item>
      )}
    </Menu>
  );
  // console.log(item.hasEnData);
  return (
    <>
      <div className="d-flex justify-content-center flex-wrap gap-2">
        {(user?.position === "Secretary" ||
          (condition !== "cancel" && condition !== "approved")) && (
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
                value={textareaValue || ""}
                onChange={(e) => setTextareaValue(e.target.value)}
                placeholder="Enter text here..."
                style={{ width: "100%" }}
              />
            </div>
          </div>
          {item?.hasEnData == 1 && (
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
                  value={textareaValueEn || ""}
                  onChange={(e) => setTextareaValueEn(e.target.value)}
                  placeholder="Enter text here..."
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          )}
        </Modal>
      }

      {sonodCancelModal && (
        <SonodCancelModal
          item={item}
          setSonodCancelModal={setSonodCancelModal}
          sonodCancelModal={sonodCancelModal}
        />
      )}
    </>
  );
};

export default SonodActionBtn;
