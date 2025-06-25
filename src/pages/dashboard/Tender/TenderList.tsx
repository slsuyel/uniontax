/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button, Form, Input, message, } from "antd";

import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import { useGetTendersQuery, useUpdateCommitteeMutation } from "@/redux/api/tender/tenderApi"
import { useState } from "react";

import { Link, useParams } from "react-router-dom";


export interface TTender {
    id: number;
    union_name: string;
    tender_id: string;
    tender_type: string;
    memorial_no: string;
    tender_name: string;
    description: string;
    tender_word_no: string;
    division: null;
    district: null;
    thana: null;
    union: null;
    govt_price: string;
    form_price: string;
    deposit_percent: null;
    noticeDate: string;
    form_buy_last_date: string;
    tender_start: string;
    tender_end: string;
    tender_open: string;
    tender_roles: string;
    status: string;
    committe1name: string;
    committe1position: string;
    commette1phone: string;
    commette1pass: string;
    committe2name: string;
    committe2position: string;
    commette2phone: string;
    commette2pass: string;
    committe3name: string;
    committe3position: string;
    commette3phone: string;
    commette3pass: string;
    bankName: null;
    bankCheck: null;
    daysOfDepositeAmount: null;
    permitDetials: null;
    created_at: Date;
    is_committee_created: boolean;
    updated_at: Date;
}


const TenderList = () => {
    const { status } = useParams()
    const token = localStorage.getItem("token") || ""
    const [committeeModalVisible, setCommitteeModalVisible] = useState(false);
    const [committeeDetailsModalVisible, setCommitteeDetailsModalVisible] = useState(false);
    const [updateCommittee, { isLoading: updating }] = useUpdateCommitteeMutation()
    const [selectedTender, setSelectedTender] = useState<TTender | null>(null);
    const [form] = Form.useForm();


    const { data: tenders, isLoading, isFetching, error, refetch } = useGetTendersQuery({ status, token })

    // Modal open handler for creating committee
    const openCommitteeModal = (tender: TTender) => {
        setSelectedTender(tender);
        setCommitteeModalVisible(true);
    };

    // Modal close handler for creating committee
    const closeCommitteeModal = () => {
        setCommitteeModalVisible(false);
        form.resetFields();
        setSelectedTender(null);
    };

    // Handlers for viewing committee details
    const openCommitteeDetailsModal = (tender: TTender) => {
        setSelectedTender(tender);
        setCommitteeDetailsModalVisible(true);
    };

    const closeCommitteeDetailsModal = () => {
        setCommitteeDetailsModalVisible(false);
        setSelectedTender(null);
    };

    const onFinish = async (values: any) => {
        if (!selectedTender) return;
        try {
            const res = await updateCommittee({
                id: selectedTender.id,
                data: values,
                token,
            }).unwrap();
            if (res?.status === "success") {
                refetch()
                message.success(res.message || "কমিটি সফলভাবে আপডেট হয়েছে");
            } else {
                message.error("কিছু ভুল হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন।");
            }

            closeCommitteeModal();
        } catch (err) {
            console.error("Update failed", err);
            message.error("কমিটি আপডেট ব্যর্থ হয়েছে");
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        return date.toLocaleDateString("bn-BD", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    if (isLoading || isFetching) {
        return (
            <div className="container mt-4">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Error!</h4>
                    <p>Failed to load tenders. Please try again later.</p>
                </div>
            </div>
        )
    }

    const allTenders: TTender[] = tenders?.data || []

    return (
        <div className="card p-3 border-0">
            <Breadcrumbs current="ইজারার তালিকা" />

            <div className="card shadow-none">

                <div className="d-flex justify-content-start">
                    <Link to="/dashboard/create-tender" className="btn btn-primary btn-sm m-3">
                        <i className="fas fa-plus me-1"></i> নতুন যুক্ত করুন
                    </Link>
                </div>



                <div className="card-body p-0">
                    {allTenders && allTenders.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover mb-0">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col" className="text-center">
                                            #
                                        </th>
                                        <th scope="col">ইজারার ধরণ</th>
                                        <th scope="col">ইজারার শিরোনাম</th>
                                        <th scope="col" className="text-center">
                                            ওয়ার্ড নং
                                        </th>
                                        <th scope="col" className="text-end">
                                            সরকারি মূল্য
                                        </th>
                                        <th scope="col" className="text-center">
                                            শুরু তারিখ
                                        </th>
                                        <th scope="col" className="text-center">
                                            শেষ তারিখ
                                        </th>
                                        <th scope="col" className="text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allTenders.map((tender: TTender, index: number) => (
                                        <tr key={tender.id || index}>
                                            <td className="text-center fw-bold">{index + 1}</td>
                                            <td>
                                                <span className="badge bg-info text-dark">{tender.tender_type || "N/A"}</span>
                                            </td>
                                            <td>
                                                <div className="fw-semibold">{tender.tender_name || "No Title"}</div>
                                            </td>
                                            <td className="text-center">
                                                <span className="badge bg-secondary">{tender.tender_word_no || "N/A"}</span>
                                            </td>
                                            <td className="text-end">
                                                <span className="fw-bold text-success">৳ {tender.govt_price || "0"}</span>
                                            </td>
                                            <td className="text-center">
                                                <small className="text-muted">{formatDate(tender.tender_start)}</small>
                                            </td>
                                            <td className="text-center">
                                                <small className="text-muted">{formatDate(tender.tender_end)}</small>
                                            </td>
                                            <td className="text-center">
                                                <div className="btn-group" role="group">
                                                    <Link target="_blank" to={`/schedule-tenders/${tender.tender_id}`}>
                                                        <button type="button" className="btn btn-sm btn-outline-primary" title="বিস্তারিত দেখুন">
                                                            <i className="fas fa-eye me-1"></i> সিডিউল ফর্ম
                                                        </button>
                                                    </Link>
                                                    {tender.is_committee_created ? (
                                                        <button
                                                            onClick={() => openCommitteeDetailsModal(tender)}
                                                            type="button"
                                                            className="btn btn-sm btn-outline-success"
                                                            title="মূল্যায়ন কমিটি দেখুন">
                                                            <i className="fas fa-users me-1"></i> মূল্যায়ন কমিটি দেখুন
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => openCommitteeModal(tender)}
                                                            type="button"
                                                            className="btn btn-sm btn-outline-info"
                                                            title="মূল্যায়ন কমিটি তৈরী করুন"
                                                        >
                                                            <i className="fas fa-edit me-1"></i> মূল্যায়ন কমিটি তৈরী করুন
                                                        </button>
                                                    )}
                                                    <button type="button" className="btn btn-sm btn-outline-danger" title="মুছুন">
                                                        <i className="fas fa-trash me-1"></i> মুছুন
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <div className="mb-3">
                                <i className="fas fa-inbox fa-3x text-muted"></i>
                            </div>
                            <h5 className="text-muted">কোন ইজারা পাওয়া যায়নি</h5>
                            <p className="text-muted">বর্তমানে কোন pending ইজারা নেই।</p>
                        </div>
                    )}
                </div>
                {/* Pagination and other footer content remains unchanged */}
            </div>

            {/* Modal for VIEWING Committee Details */}
            <Modal
                title="মূল্যায়ন কমিটির বিবরণ"
                open={committeeDetailsModalVisible}
                onCancel={closeCommitteeDetailsModal}
                footer={[
                    <Button key="close" onClick={closeCommitteeDetailsModal}>
                        বন্ধ করুন
                    </Button>,
                ]}
                width={'60%'}
                destroyOnClose
            >
                {selectedTender && (
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-light">
                                <tr>
                                    <th className="text-center">কমিটি নং</th>
                                    <th>নাম</th>
                                    <th>পদবি</th>
                                    <th>মোবাইল</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-center fw-bold">১</td>
                                    <td>{selectedTender.committe1name || 'N/A'}</td>
                                    <td>{selectedTender.committe1position || 'N/A'}</td>
                                    <td>{selectedTender.commette1phone || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td className="text-center fw-bold">২</td>
                                    <td>{selectedTender.committe2name || 'N/A'}</td>
                                    <td>{selectedTender.committe2position || 'N/A'}</td>
                                    <td>{selectedTender.commette2phone || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td className="text-center fw-bold">৩</td>
                                    <td>{selectedTender.committe3name || 'N/A'}</td>
                                    <td>{selectedTender.committe3position || 'N/A'}</td>
                                    <td>{selectedTender.commette3phone || 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </Modal>

            {/* Modal for CREATING Committee */}
            <Modal
                title="মূল্যায়ন কমিটি তৈরি করুন"
                open={committeeModalVisible}
                onCancel={closeCommitteeModal}
                footer={null}
                width={'60%'}
                destroyOnClose
            >
                <Form initialValues={{
                    committe1name: 'ssss',
                    committe1position: 'sdfgsdfg',
                    commette1phone: '01909756552',
                    committe2name: 'sdfg',
                    committe2position: 'sdfg',
                    commette2phone: '01796949749',
                    committe3name: 'dsgf',
                    committe3position: 'sdfg',
                    commette3phone: '01722597565',

                }} form={form} layout="vertical" onFinish={onFinish} className="row mx-auto">
                    {/* Committee member fields remain unchanged */}
                    <fieldset className="border p-3 mb-4 col-12 m-3 row mx-auto rounded ">
                        <legend className="fw-bold col-12 px-2">১নং মূল্যায়ন কমিটি </legend>
                        <Form.Item className=" col-4" label=" নাম" name="committe1name" rules={[{ required: true, message: "ের নাম দিন" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item className=" col-4" label=" পদবি" name="committe1position" rules={[{ required: true, message: "পদবি দিন" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item className=" col-4" label=" মোবাইল" name="commette1phone" rules={[{ required: true, message: "মোবাইল নম্বর দিন" }]}>
                            <Input />
                        </Form.Item>
                    </fieldset>
                    <fieldset className="border p-3 mb-4 col-12 m-3 row mx-auto rounded">
                        <legend className="fw-bold col-12 px-2">২নং মূল্যায়ন কমিটি </legend>
                        <Form.Item className=" col-4" label=" নাম" name="committe2name" rules={[{ required: true, message: "ের নাম দিন" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item className=" col-4" label=" পদবি" name="committe2position" rules={[{ required: true, message: "পদবি দিন" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item className=" col-4" label=" মোবাইল" name="commette2phone" rules={[{ required: true, message: "মোবাইল নম্বর দিন" }]}>
                            <Input />
                        </Form.Item>
                    </fieldset>
                    <fieldset className="border p-3 mb-4 col-12 m-3 row mx-auto rounded">
                        <legend className="fw-bold col-12 px-2">৩নং মূল্যায়ন কমিটি </legend>
                        <Form.Item className=" col-4" label=" নাম" name="committe3name" rules={[{ required: true, message: "ের নাম দিন" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item className=" col-4" label=" পদবি" name="committe3position" rules={[{ required: true, message: "পদবি দিন" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item className=" col-4" label=" মোবাইল" name="commette3phone" rules={[{ required: true, message: "মোবাইল নম্বর দিন" }]}>
                            <Input />
                        </Form.Item>
                    </fieldset>
                    <Form.Item className="col-md-6">
                        <Button loading={updating} disabled={updating} type="primary" htmlType="submit" block>
                            Save Committee
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default TenderList;