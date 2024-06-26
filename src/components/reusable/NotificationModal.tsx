import { Button, Modal } from 'antd';

type ModalProps = {
  notice: boolean;
  setNotice: (value: boolean) => void;
};

const NotificationModal = ({ notice, setNotice }: ModalProps) => {
  const handleOk = () => {
    setNotice(false);
  };
  const handleCancel = () => {
    setNotice(false);
  };

  return (
    <Modal
      title="Notification"
      open={notice}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          OK
        </Button>,
      ]}
    >
      <p className="description">
        This is a description of the notice listing.Collaetor mel, semireductus
        condocefio appellatio ast cacometrus apsisto articulatus de caseus.{' '}
      </p>

      <div className="notice">
        <div className="notice-content">
          <p>
            <b>May 2, 2018</b>
          </p>
          <span>
            <p>This is notice two.</p>
          </span>
        </div>
      </div>

      <div className="notice">
        <div className="notice-content">
          <p>May 2, 2018</p>
          <span>
            <p>This is notice two.</p>
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationModal;
