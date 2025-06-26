/* eslint-disable @typescript-eslint/no-explicit-any */
// components/tender/ValidateCommitteeModal.tsx
import { useNavigate } from "react-router-dom"; 
import { Modal, Form, Input, Button, message } from "antd";
import { TTender } from "./TenderList";
import { useCommitteeValidationMutation } from "@/redux/api/tender/tenderApi";

interface Props {
    open: boolean;
    onClose: () => void;
    loading: boolean;
    selectedTender: TTender | null;
}

const ValidateCommitteeModal = ({
    open,
    onClose,
    loading,
    selectedTender,
}: Props) => {
    const [form] = Form.useForm();
const navigate = useNavigate();
    const token = localStorage.getItem(`token`)
    const [committeeValidation, { isLoading }] = useCommitteeValidationMutation()

    const handleSubmit = async (values: any) => {
        const data = {
            tender_list_id: selectedTender?.id,
            ...values,
        };

        try {
            const res = await committeeValidation({ data, token }).unwrap();
            if (res?.data?.status === "partial" || res?.data?.status === "success") {


                message.success("কমিটি যাচাই সম্পন্ন হয়েছে");
                       // ✅ Navigate to TenderDropList page
                navigate(`/dashboard/tender/drop/list/${selectedTender?.id}`);

            } else {
                message.error("কমিটি যাচাই ব্যর্থ হয়েছে");
            }

            onClose();
            form.resetFields();



        } catch (error) {
            message.error("সার্ভার ত্রুটি হয়েছে। দয়া করে আবার চেষ্টা করুন।");
        }
    };

    return (
        <Modal
            title="মূল্যায়ন কমিটি তৈরি করুন"
            open={open}
            onCancel={onClose}
            footer={null}
            width="60%"

            destroyOnClose
        >
            <Form
                name="validateComeit"
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="row mx-auto"
            // initialValues={{
            //     "tender_list_id": 1,
            //     "commette1phone": "01909756552",
            //     "commette1pass": "3530867",
            //     "commette2phone": "01796949749",
            //     "commette2pass": "2994149",
            //     "commette3phone": "01722597565",
            //     "commette3pass": "1260106"
            // }}
            >
                {/* ১নং কমিটি */}
                <fieldset className="border p-3 mb-4 col-12 m-3 row mx-auto rounded">
                    <legend className="fw-bold col-12 px-2">১নং মূল্যায়ন কমিটি</legend>
                    <Form.Item
                        className="col-6"
                        label="মোবাইল"
                        name="commette1phone"
                        rules={[{ required: true, message: "মোবাইল নম্বর দিন" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className="col-6"
                        label="পাসওয়ার্ড"
                        name="commette1pass"
                        rules={[{ required: true, message: "পাসওয়ার্ড দিন" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </fieldset>

                {/* ২নং কমিটি */}
                <fieldset className="border p-3 mb-4 col-12 m-3 row mx-auto rounded">
                    <legend className="fw-bold col-12 px-2">২নং মূল্যায়ন কমিটি</legend>
                    <Form.Item
                        className="col-6"
                        label="মোবাইল"
                        name="commette2phone"
                        rules={[{ required: true, message: "মোবাইল নম্বর দিন" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className="col-6"
                        label="পাসওয়ার্ড"
                        name="commette2pass"
                        rules={[{ required: true, message: "পাসওয়ার্ড দিন" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </fieldset>

                {/* ৩নং কমিটি */}
                <fieldset className="border p-3 mb-4 col-12 m-3 row mx-auto rounded">
                    <legend className="fw-bold col-12 px-2">৩নং মূল্যায়ন কমিটি</legend>
                    <Form.Item
                        className="col-6"
                        label="মোবাইল"
                        name="commette3phone"
                        rules={[{ required: true, message: "মোবাইল নম্বর দিন" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className="col-6"
                        label="পাসওয়ার্ড"
                        name="commette3pass"
                        rules={[{ required: true, message: "পাসওয়ার্ড দিন" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </fieldset>

                <Form.Item className="col-md-6">
                    <Button
                        loading={loading || isLoading}
                        disabled={loading || isLoading}
                        type="primary"
                        htmlType="submit"
                        block
                    >
                        কমিটি সংরক্ষণ করুন
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ValidateCommitteeModal;
