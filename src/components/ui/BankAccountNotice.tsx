/* eslint-disable @typescript-eslint/no-explicit-any */

import BankAccountTab from "@/pages/auth/tabs/BankAccountTab";
import { Modal } from "antd";

interface BankAccountNoticeProps {
    isBankNotice: boolean;
    onClose: () => void;
   setIsBankNotice: (value: boolean) => void; 
}

const BankAccountNotice = ({ isBankNotice, onClose,setIsBankNotice }: BankAccountNoticeProps) => {
    return (
        <Modal
            title="ইউনিয়ন পরিষদের ব্যাংক একাউন্টের তথ্য যোগ করুন"
            open={isBankNotice}
            footer={null}
            centered
            closable={true}
            onCancel={onClose}
        >
            <BankAccountTab setIsBankNotice={setIsBankNotice} />
        </Modal>
    );
};

export default BankAccountNotice;
