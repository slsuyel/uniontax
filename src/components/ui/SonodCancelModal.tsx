/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSonodActionMutation } from "@/redux/api/sonod/sonodApi";
import { Input, message } from "antd";
import { Modal } from "antd";
import { useState } from "react";

interface SonodCancelModalProps {
  setSonodCancelModal: (value: boolean) => void;
  sonodCancelModal: boolean;
  item: any;
}

const SonodCancelModal: React.FC<SonodCancelModalProps> = ({
  setSonodCancelModal,
  sonodCancelModal,
  item,
}) => {
  const token = localStorage.getItem("token");
  const [sonodAction, { isLoading }] = useSonodActionMutation();
  const [cancel_reason, setCancel_reason] = useState<string | null>();

  const handleOk = async () => {
    const response = await sonodAction({
      id: item.id,
      cancel_reason,
      token,
      cancel: "cancel",
    }).unwrap();

    if (response.data.message) {
      message.success("সনদটি সফলভাবে বাতিল করা হয়েছে।");
      hideModal();
    }
  };

  const hideModal = () => {
    setSonodCancelModal(false);
  };

  return (
    <>
      <Modal
        maskClosable={false}
        width={"70%"}
        title=""
        open={sonodCancelModal}
        onOk={handleOk}
        onCancel={hideModal}
        okText="ওকে"
        cancelText="না"
        okButtonProps={{ loading: isLoading }}
      >
        <div>
          <div>
            <h5>সনদ বাতিলের কারন</h5>
          </div>
          <div>
            {" "}
            <Input.TextArea
              rows={8}
              cols={40}
              value={cancel_reason || ""}
              onChange={(e) => setCancel_reason(e.target.value)}
              placeholder="Enter text here..."
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SonodCancelModal;
