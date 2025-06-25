
import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import { useGetTendersQuery } from "@/redux/api/tender/tenderApi"
import { useState } from "react"


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
    committe1name: null;
    committe1position: null;
    commette1phone: null;
    commette1pass: null;
    committe2name: null;
    committe2position: null;
    commette2phone: null;
    commette2pass: null;
    committe3name: null;
    committe3position: null;
    commette3phone: null;
    commette3pass: null;
    bankName: null;
    bankCheck: null;
    daysOfDepositeAmount: null;
    permitDetials: null;
    created_at: Date;
    updated_at: Date;
}



const TenderList = () => {

    const token = localStorage.getItem("token") || ""
    const [status] = useState("pending")

    const {
        data: tenders,
        isLoading,
        error,
    } = useGetTendersQuery({
        status,
        token,
    })

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

    if (isLoading) {
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

    console.log(tenders.data);
    const allTenders: TTender[] = tenders?.data || []

    return (
        <div className="card p-3 border-0">
            <Breadcrumbs current="হোল্ডিং ট্যাক্স" />

            <div className="card shadow-none">
                <div className="card-header bg-primary text-white">
                    <h4 className="card-title mb-0">
                        <i className="fas fa-list me-2"></i>
                        ইজারার তালিকা
                    </h4>
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
                                                    <button type="button" className="btn btn-sm btn-outline-primary" title="বিস্তারিত দেখুন">
                                                        <i className="fas fa-eye me-1"></i> বিস্তারিত
                                                    </button>
                                                    <button type="button" className="btn btn-sm btn-outline-success" title="সম্পাদনা করুন">
                                                        <i className="fas fa-edit me-1"></i> সম্পাদনা
                                                    </button>
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
                {tenders && tenders.length > 0 && (
                    <div className="card-footer bg-light">
                        <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">মোট {tenders.length} টি ইজারা পাওয়া গেছে</small>
                            <nav aria-label="Tender pagination">
                                <ul className="pagination pagination-sm mb-0">
                                    <li className="page-item disabled">
                                        <a className="page-link" href="#" tabIndex={-1}>
                                            Previous
                                        </a>
                                    </li>
                                    <li className="page-item active">
                                        <a className="page-link" href="#">
                                            1
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            Next
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default TenderList
