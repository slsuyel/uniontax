import { Modal, Form, Input, InputNumber, Button, message } from "antd";
import { useState } from "react";
import { useUpdatePermitDetailsMutation } from "@/redux/api/tender/tenderApi";

interface UpdatePermitDetailsModalProps {
  open: boolean;
  onClose: () => void;
  tenderId: number | null;
  initialData: any; // TTender এ থেকে যাবে
  onUpdated: () => void;
}

const UpdatePermitDetailsModal = ({ open, onClose, tenderId, initialData, onUpdated }: UpdatePermitDetailsModalProps) => {
  const [form] = Form.useForm();
  const [updatePermitDetails, { isLoading }] = useUpdatePermitDetailsMutation();
  const token = localStorage.getItem("token") || "";

  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    if (!tenderId) {
      message.error("Invalid tender ID");
      return;
    }
    setLoading(true);
    try {
      // RTK Query দিয়ে কল করো (বা নিচের fetch দিয়ে পারো)
      const res = await updatePermitDetails({
        id: tenderId,
        data: values,
        token,
      }).unwrap();

      if (res?.data?.status === "success") {
        message.success(res?.data?.message || "কার্যাদেশ তথ্য সফলভাবে আপডেট হয়েছে");
        onUpdated();
        onClose();
      } else {
        message.error(res?.data?.message || "আপডেট ব্যর্থ হয়েছে");
      }
    } catch (err) {
      console.error(err);
      message.error("আপডেট করতে সমস্যা হয়েছে");
    }
    setLoading(false);
  };

  return (
    <Modal title="কার্যাদেশ তথ্য আপডেট করুন" open={open} onCancel={onClose} footer={null} destroyOnClose width="60%">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          bankName: initialData?.bankName || "",
          bankCheck: initialData?.bankCheck || "",
          daysOfDepositeAmount: initialData?.daysOfDepositeAmount || 0,
          permitDetials: initialData?.permit_detials_modify || "",
        }}
        onFinish={handleFinish}
      >
        <Form.Item name="bankName" label="ব্যাংকের নাম" rules={[{ required: false, max: 255 }]}>
          <Input placeholder="ব্যাংকের নাম লিখুন" />
        </Form.Item>

        <Form.Item name="bankCheck" label="ব্যাংক চেকের বিবরণ" rules={[{ required: false, max: 255 }]}>
          <Input placeholder="ব্যাংক চেকের বিবরণ লিখুন" />
        </Form.Item>

        <Form.Item name="daysOfDepositeAmount" label="ডিপোজিটের জন্য দিন সংখ্যা" rules={[{ type: "number", min: 0 }]}>
          <InputNumber style={{ width: "100%" }} min={0} placeholder="দিন সংখ্যা লিখুন" />
        </Form.Item>

        <Form.Item name="permitDetials" label="কার্যাদেশের বিবরণ" rules={[{ required: false, max: 1000 }]}>
          <Input.TextArea rows={6} placeholder="কার্যাদেশের বিস্তারিত লিখুন" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading || isLoading}>
            আপডেট করুন
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatePermitDetailsModal;
