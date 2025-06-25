/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from '@/components/reusable/Loader';
import { useGetSingleTenderQuery } from '@/redux/api/tender/tenderApi';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Import Ant Design components
import { Card, Descriptions, Tag, Button, Space, Alert } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

// A helper function to format date and time
const formatDateTime = (isoString: any) => {
    if (!isoString) return 'N/A';
    try {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    } catch (error) {
        return 'Invalid Date';
    }
};

// A helper function to determine the color for the status tag
const getStatusTag = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'proccesing': // Note: 'proccesing' in your JSON, assuming it's a typo for 'processing'
        case 'processing':
            return <Tag color="blue">Processing</Tag>;
        case 'completed':
            return <Tag color="green">Completed</Tag>;
        case 'cancelled':
            return <Tag color="red">Cancelled</Tag>;
        default:
            return <Tag>{status}</Tag>;
    }
};

const SingleTender = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError, } = useGetSingleTenderQuery(id);
    const VITE_BASE_DOC_URL = import.meta.env.VITE_BASE_DOC_URL;

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return (
            <div className="container mx-auto py-5">
                <Alert
                    message="Error"
                    description={"Failed to load tender details."}
                    type="error"
                    showIcon
                />
            </div>
        );
    }

    // Assuming the actual tender object is nested under `data.data`
    const tender = data?.data;

    if (!tender) {
        return (
            <div className="container mx-auto py-5">
                <Alert message="Tender not found." type="warning" showIcon />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-4">
            <Card
                title={
                    <div>
                        <h4 className="mb-0">{tender.tender_name}</h4>
                        <small className="text-muted">{tender?.description}</small>
                    </div>
                }

                extra={
                    <Space>
                        {getStatusTag(tender.status)}
                        <Button
                            icon={<ArrowLeftOutlined />}
                            onClick={() => navigate(-1)} // Go back to the previous page
                        >
                            Back
                        </Button>
                    </Space>
                }
                style={{ width: '100%' }}
            >
                {/* Main Details Section */}
                <Descriptions title="দরপত্রের বিবরণ (Tender Details)" bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                    <Descriptions.Item label="দরপত্রের ধরণ (Tender Type)">{tender.tender_type}</Descriptions.Item>
                    <Descriptions.Item label="স্মারক নং (Memorial No)">{tender.memorial_no}</Descriptions.Item>
                    <Descriptions.Item label="ইউনিয়নের নাম (Union Name)">{tender.union_name}</Descriptions.Item>
                    <Descriptions.Item label="ওয়ার্ড নং (Word No)">{tender.tender_word_no}</Descriptions.Item>
                    <Descriptions.Item label="সরকারি মূল্য (Govt. Price)">৳{tender.govt_price || 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label="ফরমের মূল্য (Form Price)">৳{tender.form_price || 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label="বর্ণনা (Description)" span={2}>{tender.description}</Descriptions.Item>
                </Descriptions>

                {/* Dates Section */}
                <Descriptions title="গুরুত্বপূর্ণ তারিখ (Important Dates)" bordered className="mt-4" column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                    <Descriptions.Item label="বিজ্ঞপ্তির তারিখ (Notice Date)">{formatDateTime(tender.noticeDate)}</Descriptions.Item>
                    <Descriptions.Item label="দরপত্র খোলার তারিখ (Tender Opening Date)">{formatDateTime(tender.tender_open)}</Descriptions.Item>
                    <Descriptions.Item label="ফরম কেনার শেষ তারিখ (Form Buy Last Date)">{formatDateTime(tender.form_buy_last_date)}</Descriptions.Item>
                    <Descriptions.Item label="দরপত্র দাখিলের শেষ সময় (Tender End Date)">{formatDateTime(tender.tender_end)}</Descriptions.Item>
                </Descriptions>

                {/* Rules & Regulations Section */}
                <div className="mt-4">
                    <h5 className="mb-3">শর্তাবলী (Terms and Conditions)</h5>
                    <Card>
                        {/* 
                          Using dangerouslySetInnerHTML because the 'tender_roles' field contains raw HTML.
                          Ensure the source of this HTML is trusted to prevent XSS attacks.
                        */}
                        <div dangerouslySetInnerHTML={{ __html: tender.tender_roles }} />
                    </Card>
                </div>

                {/* Action Buttons Section */}
                <div className="text-center mt-4 pt-3">
                    <div className="text-center">
                        <a target="_blank" href={`${VITE_BASE_DOC_URL}/api/pdf/tenders/${tender.tender_id}`} className="btn btn-danger mt-3">বিজ্ঞপ্তি ডাউনলোড করুন</a>


                        <Link to={`/schedule-tenders/${tender.tender_id}`} className="btn btn-info ms-2 mt-3">ইজারা দাখিল করার জন্য ক্লিক করুন</Link>

                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SingleTender;