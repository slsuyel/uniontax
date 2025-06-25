// components/tender/CommitteeDetailsModal.tsx
import { Modal, Button } from "antd";
import { TTender } from "./TenderList";

interface Props {
    open: boolean;
    onClose: () => void;
    selectedTender: TTender | null;
}

const CommitteeDetailsModal = ({ open, onClose, selectedTender }: Props) => {
    return (
        <Modal
            title="মূল্যায়ন কমিটির বিবরণ"
            open={open}
            onCancel={onClose}
            footer={[
                <Button key="close" onClick={onClose}>
                    বন্ধ করুন
                </Button>,
            ]}
            width={"60%"}
            destroyOnClose
        >
            {selectedTender ? (
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
                            {[1, 2, 3].map((i) => {
                                const name = selectedTender[`committe${i}name` as keyof TTender] as string | null;
                                const position = selectedTender[`committe${i}position` as keyof TTender] as string | null;
                                const phone = selectedTender[`commette${i}phone` as keyof TTender] as string | null;

                                return (
                                    <tr key={i}>
                                        <td className="text-center fw-bold">{i}</td>
                                        <td>{name || "N/A"}</td>
                                        <td>{position || "N/A"}</td>
                                        <td>{phone || "N/A"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-muted">কমিটি তথ্য পাওয়া যায়নি।</p>
            )}
        </Modal>
    );
};

export default CommitteeDetailsModal;
