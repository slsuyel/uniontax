/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBikeRegistrationsListQuery } from "@/redux/api/sonod/sonodApi";
import { useState } from "react";
import { Table, Modal, Button, Descriptions, Image, Select } from "antd";
import Breadcrumbs from "@/components/reusable/Breadcrumbs";

const AutoBike = () => {
    const VITE_BASE_DOC_URL = import.meta.env.VITE_BASE_DOC_URL;
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    const token = localStorage.getItem("token");

    const { data, isLoading, refetch } = useBikeRegistrationsListQuery({
        token,
        page,
        per_page: perPage,
    });

    const [selected, setSelected] = useState<any>(null);
    const [open, setOpen] = useState(false);

    const handleView = (record: any) => {
        setSelected(record);
        setOpen(true);
    };

    const handlePerPageChange = (value: number) => {
        setPerPage(value);
        setPage(1);
        setTimeout(() => refetch(), 100);
    };

    const columns = [
        {
            title: "ক্রম",
            dataIndex: "id",
            key: "id",
            render: (_: any, __: any, index: number) => (page - 1) * perPage + index + 1,
        },
        {
            title: "আবেদনকারীর নাম",
            dataIndex: "applicant_name_bn",
            key: "applicant_name_bn",
        },
        {
            title: "মোবাইল",
            dataIndex: "applicant_mobile",
            key: "applicant_mobile",
            render: (text: string) => (
                <a href={`tel:${text}`} className="text-decoration-none">
                    {text}
                </a>
            ),
        },
        {
            title: "বাইক ক্রয়ের তারিখ",
            dataIndex: "auto_bike_purchase_date",
            key: "auto_bike_purchase_date",
        },
        {
            title: "স্ট্যাটাস",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "একশন",
            key: "action",
            render: (_: any, record: any) => (
                <Button type="primary" onClick={() => handleView(record)}>
                    View Details
                </Button>
            ),
        },
    ];

    const tableData = data?.data?.data?.data || [];

    return (
        <div className="card p-3 border-0">
            <Breadcrumbs current="অটো/বাইক নিবন্ধন তালিকা" />
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                    <span>প্রতি পৃষ্ঠায়:</span>
                    <Select
                        value={perPage}
                        style={{ width: 100 }}
                        onChange={handlePerPageChange}
                        options={[
                            { value: 10, label: "10" },
                            { value: 15, label: "15" },
                            { value: 20, label: "20" },
                            { value: 50, label: "50" },
                        ]}
                    />
                </div>
                <div className="d-flex align-items-center gap-2">
                    <div>
                        <a href={`${VITE_BASE_DOC_URL}/auto/bike/applicant/report/download?token=${token}`} target="_blank" className=" btn btn-info btn-sm">PDF তালিকা ডাউনলোড </a>
                    </div>
                    <div>
                        <a href={`${VITE_BASE_DOC_URL}/auto/bike/applicant/report/excel/download?token=${token}`} target="_blank" className=" btn btn-primary btn-sm"> Exel তালিকা ডাউনলোড </a>
                    </div>
                </div>
            </div>

            <Table
                loading={isLoading}
                columns={columns}
                dataSource={tableData}
                rowKey="id"
                pagination={{
                    current: page,
                    pageSize: perPage,
                    total: data?.data?.data?.total,
                    onChange: (p) => setPage(p),
                }}
                bordered
            />

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={[
                    <Button key="close" onClick={() => setOpen(false)}>
                        বন্ধ করুন
                    </Button>,
                ]}
                title="অটো/বাইক নিবন্ধন বিস্তারিত"
                width={800}
            >
                {selected && (
                    <Descriptions bordered size="small" column={2}>
                        <Descriptions.Item label="আবেদনকারীর নাম (বাংলা)">
                            {selected.applicant_name_bn}
                        </Descriptions.Item>
                        <Descriptions.Item label="আবেদনকারীর নাম (ইংরেজি)">
                            {selected.applicant_name_en}
                        </Descriptions.Item>
                        <Descriptions.Item label="পিতার নাম">
                            {selected.applicant_father_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="মাতার নাম">
                            {selected.applicant_mother_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="মোবাইল নম্বর">
                            <a href={`tel:${selected.applicant_mobile}`}>
                                {selected.applicant_mobile}
                            </a>
                        </Descriptions.Item>
                        <Descriptions.Item label="ধর্ম">{selected.applicant_religion}</Descriptions.Item>
                        <Descriptions.Item label="ব্লাড গ্রুপ">{selected.blood_group}</Descriptions.Item>
                        <Descriptions.Item label="পেশা">{selected.profession}</Descriptions.Item>
                        <Descriptions.Item label="ক্রয়ের তারিখ">
                            {selected.auto_bike_purchase_date}
                        </Descriptions.Item>
                        <Descriptions.Item label="সরবরাহকারী">
                            {selected.auto_bike_supplier_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="ঠিকানা" span={2}>
                            {selected.auto_bike_supplier_address}
                        </Descriptions.Item>
                        <Descriptions.Item label="ছবি" span={2}>
                            <Image width={120} src={selected.passport_photo} />
                        </Descriptions.Item>
                        <Descriptions.Item label="এনআইডি কপি" span={2}>
                            <Image width={120} src={selected.national_id_copy} />
                        </Descriptions.Item>
                        <Descriptions.Item label="রসিদ" span={2}>
                            <Image width={120} src={selected.auto_bike_receipt} />
                        </Descriptions.Item>
                        <Descriptions.Item label="স্ট্যাটাস">{selected.status}</Descriptions.Item>
                        <Descriptions.Item label="তারিখ">
                            {new Date(selected.created_at).toLocaleString()}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

export default AutoBike;
