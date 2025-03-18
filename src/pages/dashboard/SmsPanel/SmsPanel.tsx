import { usePurchaseSmsMutation } from '@/redux/api/sms/smsApi';
import { Form, Input, Button, Spin, message } from 'antd';
import Breadcrumbs from '@/components/reusable/Breadcrumbs';

const SmsPanel = () => {
    const token = localStorage.getItem('token');
    const [purchaseSms, { isLoading }] = usePurchaseSmsMutation();
    const [form] = Form.useForm();
    const onFinish = async (values: { sms_amount: number; mobile: string }) => {
        try {
            const data = {
                ...values,
                c_uri: "http://your-callback-url.com",
                f_uri: "http://your-success-url.com",
                s_uri: "http://your-cancel-url.com",
            };
            const result = await purchaseSms({ data, token }).unwrap();
            if (result?.error) throw new Error(result.error);
            form.resetFields();
            message.success("SMS purchase successful!");
        } catch (error) {
            message.error("Failed to purchase SMS");
        }
    };

    return (
        <div className="card p-3 border-0">
            <Breadcrumbs current="Sms Panel" />
            <div className="card shadow-sm p-3">
                <h5 className="mb-3">Purchase SMS</h5>
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
                            {isLoading ? <Spin size="small" /> : 'Purchase SMS'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default SmsPanel;