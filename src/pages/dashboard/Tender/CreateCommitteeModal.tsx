/* eslint-disable @typescript-eslint/no-explicit-any */
// components/tender/CreateCommitteeModal.tsx
import { Modal, Button, Form, Input } from "antd";
import { TTender } from "./TenderList";

interface Props {
    open: boolean;
    onClose: () => void;
    onFinish: (values: any) => void;
    loading: boolean;
    selectedTender: TTender | null;
    form: any;
}

const CreateCommitteeModal = ({
    open,
    onClose,
    onFinish,
    loading,
    form,
}: Props) => {
    return (
        <Modal
            title="মূল্যায়ন কমিটি তৈরি করুন"
            open={open}
            onCancel={onClose}
            footer={null}
            width={"60%"}
            destroyOnClose
        >
            <Form
                initialValues={{
                    committe1name: "",
                    committe1position: "",
                    commette1phone: "",
                    committe2name: "",
                    committe2position: "",
                    commette2phone: "",
                    committe3name: "",
                    committe3position: "",
                    commette3phone: "",
                }}
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="row mx-auto"
            >
                {[1, 2, 3].map((i) => (
                    <fieldset
                        key={i}
                        className="border p-3 mb-4 col-12 m-3 row mx-auto rounded"
                    >
                        <legend className="fw-bold col-12 px-2">{i}নং মূল্যায়ন কমিটি </legend>
                        <Form.Item
                            className="col-4"
                            label=" নাম"
                            name={`committe${i}name`}
                            rules={[{ required: true, message: "নাম দিন" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            className="col-4"
                            label=" পদবি"
                            name={`committe${i}position`}
                            rules={[{ required: true, message: "পদবি দিন" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            className="col-4"
                            label=" মোবাইল"
                            name={`commette${i}phone`}
                            rules={[{ required: true, message: "মোবাইল নম্বর দিন" }]}
                        >
                            <Input />
                        </Form.Item>
                    </fieldset>
                ))}

                <Form.Item className="col-md-6">
                    <Button loading={loading} disabled={loading} type="primary" htmlType="submit" block>
                        Save Committee
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateCommitteeModal;
