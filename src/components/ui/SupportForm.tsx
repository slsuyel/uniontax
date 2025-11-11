/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import 'bootstrap/dist/css/bootstrap.min.css';
import useAllServices from "@/hooks/useAllServices";
import { useCreateSupportMutation } from "@/redux/api/supports/supportsApi";

const { TextArea } = Input;
const { Option } = Select;

type FormData = {
    name: string;
    email: string;
    phone: string;
    sonod_name: string;
    sonod_id: string;
    type: "edit" | "complain" | "feedback" | "other";
    description: string;
};

const initialData: FormData = {
    name: "",
    email: "",
    phone: "",
    sonod_name: "নাগরিকত্ব সনদ",
    sonod_id: "",
    type: "edit",
    description: ""
};

const SupportForm: React.FC = () => {
    const services = useAllServices();
    const [createSupport, { isLoading }] = useCreateSupportMutation()
    const [form] = Form.useForm();
    const [submittedData, setSubmittedData] = useState<any | null>(null);

    const onFinish = async (values: FormData) => {
        try {
            const res = await createSupport({ data: values }).unwrap();

            if (res.isError) {
                message.error(res.data?.message || "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।");
            } else {
                setSubmittedData(res.data.data);
                message.success("আপনার অনুরোধ সফলভাবে জমা হয়েছে।");
            }
        } catch (err: any) {
            message.error(err?.data?.message || "সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        }
    };

    const handleNewRequest = () => {
        form.resetFields();
        setSubmittedData(null);
    };

    if (submittedData) {
        return (
            <div className="container my-5 text-center card p-4">
                <h3 className="mb-4">ধন্যবাদ!</h3>
                <p>আপনার অনুরোধ সফলভাবে জমা হয়েছে।</p>
                <p><strong>সাপোর্ট আইডি:</strong> {submittedData.support_id}</p>
                <div><Button type="primary" onClick={handleNewRequest}>
                    নতুন অনুরোধ
                </Button></div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h3 className="mb-4">সহযোগিতা ফর্ম </h3>
            <Form className=" card p-3"
                form={form}
                layout="vertical"
                initialValues={initialData}
                onFinish={onFinish}
            >
                <div className="row">
                    <div className="col-md-6">
                        <Form.Item className="mb-2" label="নাম" name="name" rules={[{ required: true }]}>
                            <Input style={{ height: 40 }} placeholder="নাম লিখুন" />
                        </Form.Item>
                    </div>

                    <div className="col-md-6">
                        <Form.Item className="mb-2" label="ইমেল" name="email" rules={[{ required: true, type: 'email' }]}>
                            <Input style={{ height: 40 }} placeholder="ইমেল লিখুন" />
                        </Form.Item>
                    </div>

                    <div className="col-md-6">
                        <Form.Item className="mb-2" label="ফোন" name="phone" rules={[{ required: true }]}>
                            <Input style={{ height: 40 }} placeholder="ফোন লিখুন" />
                        </Form.Item>
                    </div>

                    <div className="col-md-6">
                        <Form.Item className="mb-2" label="সনদের নাম" name="sonod_name" rules={[{ required: true }]}>
                            <Select style={{ height: 40 }}>
                                {services.map((s) => <Option key={s.link} value={s.title}>{s.title}</Option>)}
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="col-md-6">
                        <Form.Item className="mb-2" label="সনদ আইডি/আবেদন আইডি" name="sonod_id" rules={[{ required: true }]}>
                            <Input style={{ height: 40 }} placeholder="সনদ আইডি/আবেদন আইডি লিখুন" />
                        </Form.Item>
                    </div>

                    <div className="col-md-6">
                        <Form.Item className="mb-2" label="কি ধরণের সহযোগিতা চান" name="type" rules={[{ required: true }]}>
                            <Select style={{ height: 40 }}>
                                <Option value="edit">সনদ এডিট</Option>
                                <Option value="complain">অভিযোগ</Option>
                                <Option value="feedback">মতামত/ফিডব্যাক</Option>
                                <Option value="other">অন্যান্য</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="col-12">
                        <Form.Item className="mb-2" label="বিস্তারিত লিখে দিন" name="description">
                            <TextArea rows={4} placeholder="বিস্তারিত লিখে দিন" />
                        </Form.Item>
                    </div>
                </div>

                <Form.Item className="mb-2">
                    <Button disabled={isLoading} loading={isLoading} type="primary" htmlType="submit">
                        সাবমিট করুন
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SupportForm;
