/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, message, } from "antd";

import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import { useGetTendersQuery, useUpdateCommitteeMutation } from "@/redux/api/tender/tenderApi"
import { useState } from "react";

import { Link, useParams } from "react-router-dom";
import CreateCommitteeModal from "./CreateCommitteeModal";
import CommitteeDetailsModal from "./CommitteeDetailsModal";
import ValidateCommitteeModal from "./ValidateCommitteeModal";


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
    const [validateModalVisible, setValidateModalVisible] = useState(false);

    const [updateCommittee, { isLoading: updating }] = useUpdateCommitteeMutation()
    const [selectedTender, setSelectedTender] = useState<TTender | null>(null);
    const [form] = Form.useForm();

  const VITE_BASE_DOC_URL = import.meta.env.VITE_BASE_DOC_URL;

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

    const openValidateCommitteeModal = (tender: TTender) => {
        setSelectedTender(tender);
        setValidateModalVisible(true);
    };

    const closeValidateCommitteeModal = () => {
        setValidateModalVisible(false);
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
            console.log("Update response:", res.data.status);
            if (res?.data?.status === "success") {
                refetch()
                message.success(res.data.message || "কমিটি সফলভাবে আপডেট হয়েছে");
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

                                                    {status == 'proccesing' &&
                                                        <button
                                                            onClick={() => openValidateCommitteeModal(tender)}
                                                            type="button"
                                                            className="btn btn-sm btn-outline-info"
                                                            title="মূল্যায়ন করার জন্য ক্লিক দিন"
                                                        >
                                                            <i className="fas fa-edit me-1"></i> মূল্যায়ন করার জন্য ক্লিক দিন
                                                        </button>}



                                                    {status == 'Completed' &&
                                                        <>
                                                            <Link to={`/dashboard/tender/drop/list/${tender.id}`}>
                                                                <button type="button" className="btn btn-sm btn-outline-success" title="দরপত্রের তালিকা দেখুন">
                                                                    <i className="fas fa-list me-1"></i> নির্বাচিত তালিকা দেখুন
                                                                </button>
                                                            </Link>
                                                            <a href={`${VITE_BASE_DOC_URL}/api/pdf/tenders/work/access/${tender.tender_id}`} target="_blank">
                                                                <button type="button" className="btn btn-sm btn-outline-primary" title="নতুন দরপত্র যুক্ত করুন">
                                                                    <i className="fas fa-plus me-1"></i> কার্যাদেশ 
                                                                </button>
                                                            </a>
                                                        </>      
                                                        
                                                        }






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
            <CommitteeDetailsModal
                open={committeeDetailsModalVisible}
                onClose={closeCommitteeDetailsModal}
                selectedTender={selectedTender}
            />


            {/* Modal for CREATING Committee */}
            <CreateCommitteeModal
                open={committeeModalVisible}
                onClose={closeCommitteeModal}
                onFinish={onFinish}
                loading={updating}
                selectedTender={selectedTender}
                form={form}
            />

            <ValidateCommitteeModal
                open={validateModalVisible}
                onClose={closeValidateCommitteeModal}
                selectedTender={selectedTender}
                loading={false}
            />



        </div>
    )
}

export default TenderList;