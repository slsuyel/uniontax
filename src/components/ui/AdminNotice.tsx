/* eslint-disable @typescript-eslint/no-explicit-any */

import { useUpdateUnionMutation } from "@/redux/api/auth/authApi";
import { useAppDispatch } from "@/redux/features/hooks";
import { setUser } from "@/redux/features/user/userSlice";
import { Modal, Button, Form, Input, message } from "antd"

interface AdminNoticeProps {
    isVisible: boolean
    onClose: () => void
    user: any
}

const AdminNotice = ({ isVisible, onClose, user }: AdminNoticeProps) => {
    const dispatch = useAppDispatch()
    const token = localStorage.getItem('token')
    const [updateUnion, { isLoading: updating }] = useUpdateUnionMutation();
    const [form] = Form.useForm()

    const handleSubmit = async (values: any) => {
        console.log("Form Data:", values)
        const res = await updateUnion({ data: values, token }).unwrap()
        console.log(res);
        if (res.status_code === 200) {
            dispatch(setUser({ ...user, is_popup: false }));
            message.success("Phone number updated successfully")
            onClose()
        }
    }

    return (
        <Modal
            title="ইউনিয়ন পরিষদের ফোন নম্বর আপডেট করুন"
            open={isVisible}
            footer={null}
            centered
            closable={false} 
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item className=" mb-1"
                    label="চেয়ারম্যান/প্যানেল চেয়ারম্যান/ প্রশাসক ফোন নম্বর"
                    name="chairman_phone"
                    rules={[{ required: true, message: "ফোন নম্বর আবশ্যক!" }]}
                >
                    <Input placeholder="01909756552" />
                </Form.Item>

                <Form.Item className=" mb-1"
                    label="সচিব ফোন নম্বর"
                    name="secretary_phone"
                    rules={[{ required: true, message: "ফোন নম্বর আবশ্যক!" }]}
                >
                    <Input placeholder="01909756552" />
                </Form.Item>

                <Form.Item className=" mb-1"
                    label="ইউডিসি ফোন নম্বর"
                    name="udc_phone"
                    rules={[{ required: true, message: "ফোন নম্বর আবশ্যক!" }]}
                >
                    <Input placeholder="01909756552" />
                </Form.Item>

                <Form.Item className=" mb-1"
                    label="ব্যবহারকারীর ফোন নম্বর"
                    name="user_phone"
                    rules={[{ required: true, message: "ফোন নম্বর আবশ্যক!" }]}
                >
                    <Input placeholder="01909756552" />
                </Form.Item>

                <Form.Item className=" mb-1">
                    <Button loading={updating} disabled={updating} type="primary" htmlType="submit" block>
                        জমা দিন
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AdminNotice
