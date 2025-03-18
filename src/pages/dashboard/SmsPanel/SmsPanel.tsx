import { useState } from 'react';
import { useAllSmsQuery, usePurchaseSmsMutation } from '@/redux/api/sms/smsApi';
import { Form, Input, Button, Spin, message, Modal } from 'antd';
import Breadcrumbs from '@/components/reusable/Breadcrumbs';
import Loader from '@/components/reusable/Loader';

export interface TSMS {
    data:        Data;
    isError:     boolean;
    error:       null;
    status_code: number;
}

export interface Data {
    current_page:   number;
    data:           Datum[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    next_page_url:  null;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}

export interface Datum {
    id:             number;
    union_name:     string;
    mobile:         string;
    trx_id:         string;
    amount:         string;
    sms_amount:     number;
    payment_status: string;
    status:         string;
    created_at:     Date;
    updated_at:     Date;
}

const SmsPanel = () => {
    const token = localStorage.getItem('token');
    const [purchaseSms, { isLoading }] = usePurchaseSmsMutation();
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
    const { data, isLoading: getting } = useAllSmsQuery({ token });

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values: { sms_amount: number; mobile: string }) => {
        try {
            const data = {
                ...values,
                c_uri:  window.location.href,
                f_uri:  window.location.href,
                s_uri:  window.location.href
            };
            const result = await purchaseSms({ data, token }).unwrap();
            if (result?.error) throw new Error(result.error);
            form.resetFields();
            console.log(result);
            // return
            window.location.href=result.data.payment_url
            message.success("SMS purchase successful!");
            setIsModalVisible(false); // Close the modal after success
        } catch (error) {
            message.error("Failed to purchase SMS");
        }
    };

    if (getting) {
        return <Loader />;
    }

    return (
        <div className="card p-3 border-0">
            <Breadcrumbs current="Sms Panel" />
            <div className="d-flex justify-content-end">
                <Button type="primary" onClick={showModal}>SMS কিনুন</Button>
            </div>

            {/* Bootstrap Table to show SMS data */}
            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>তারিখ</th>
                        <th>মোবাইল নাম্বার</th>
                        <th>ট্রানজেকশন আইডি</th>
                        <th>টাকার পরিমাণ</th>
                        <th>এসএমএস পরিমাণ</th>
                        <th>পেমেন্ট স্ট্যাটাস</th>
                        <th>স্ট্যাটাস</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data.data.map((item: Datum) => (
                        <tr key={item.id}>
                         
                            <td>{new Date(item.updated_at).toLocaleString()}</td>
                            <td>{item.mobile}</td>
                            <td>{item.trx_id}</td>
                            <td>{item.amount}</td>
                            <td>{item.sms_amount}</td>
                            <td className='text-capitalize'>{item.payment_status}</td>
                            <td className='text-capitalize'>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for SMS Purchase */}
            <Modal
                title="Purchase SMS"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
                    <Form.Item label="SMS Amount" name="sms_amount" rules={[{ required: true, message: 'Enter SMS amount' }]}>
                        <Input type="number" placeholder="SMS amount" />
                    </Form.Item>
                    <Form.Item label="Mobile Number" name="mobile"
                        rules={[{ required: true, message: 'Enter mobile number' }, { pattern: /^01[3-9]\d{8}$/, message: 'Invalid BD mobile number' }]}>
                        <Input placeholder="Mobile number" />
                    </Form.Item>
                    <Form.Item className="text-center">
                        <Button type="primary" htmlType="submit" disabled={isLoading}>
                            {isLoading ? <Spin size="small" /> : 'SMS কিনুন'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SmsPanel;

