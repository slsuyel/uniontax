/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { TKhatFee, TTradeKhat } from "@/pages/ApplicationForm/tradeLicenseForm";
import { useTradeInfoQuery } from "@/redux/api/user/userApi";
import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
import { Form, Select, Button, Modal } from "antd";
import { TApplicantData } from "@/types";
import { useTradeKhatUpdateMutation } from "@/redux/api/sonod/sonodApi";

const { Option } = Select;



type TradeKhatEditModalProps = {
    sonod?: TApplicantData;
    isVisible: boolean;
    onClose: () => void;
};

/*    "applicant_type_of_businessKhat": "112", // its initial value will be id, 
        "applicant_type_of_businessKhatAmount": "0", */

const TradeKhatEditModal = ({ sonod, isVisible, onClose }: TradeKhatEditModalProps) => {
    const [tradeKhatUpdate,{isLoading:updating}] = useTradeKhatUpdateMutation()
    const [khatFees, setKhatFees] = useState<TKhatFee[]>([]);
    const [selectedKhatFee, setSelectedKhatFee] = useState<any>(null);

    const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
    const { data, isLoading } = useTradeInfoQuery(
        { unionName: unionInfo?.short_name_e },
        {
            skip: !unionInfo?.short_name_e,
        }
    );

    // Handle change in the business category dropdown
    const handleBusinessCategoryChange = (value: string) => {
        console.log("Selected business category ID:", value);
        const selectedCategory = data?.data?.find((d: TTradeKhat) => d.khat_id === value);
        
        setKhatFees(selectedCategory?.khat_fees || []);
        setSelectedKhatFee(selectedCategory);
    };

    // Handle change in the khat fee dropdown
    const handleKhatFeeChange = (value: string) => {
        console.log("Selected Khat Fee Amount:", value);
        // Add any additional logic here if necessary
    };

    const handleFormSubmit = async (values: any) => {
        try {
            const payload = {
                applicant_type_of_businessKhat: Number(values.businessCategory),
                applicant_type_of_businessKhatAmount: Number(values.investmentType),
            };

            const res = await tradeKhatUpdate({
                id: sonod?.id,
                data: payload,
                token: localStorage.getItem("token"),
            }).unwrap();

            console.log("Response from update:", res);
        } catch (error) {
            console.error("Error during update:", error);
        }
    };

    return (
        <Modal
            title="ব্যবসা খাত এডিট করুনঃ"
            open={isVisible}
            onCancel={onClose}
            footer={null}
            width={600}

            
        >
            <Form onFinish={handleFormSubmit} initialValues={{
                businessCategory: sonod?.applicant_type_of_businessKhat || "112",
                investmentType: sonod?.applicant_type_of_businessKhatAmount || "0"
            }}>

                <div>
                    <Form.Item
                        label="ব্যবসা, বৃত্তি, পেশা, বা শিল্প প্রতিষ্ঠানের শ্রেণী"
                        name="businessCategory"
                        rules={[{ required: true, message: "ব্যবসা, বৃত্তি, পেশা, বা শিল্প প্রতিষ্ঠানের শ্রেণী" }]}
                    >
                        <Select
                            showSearch
                            style={{ height: 40, width: "100%" }}
                            placeholder="Select"
                            onChange={handleBusinessCategoryChange}
                            value={sonod?.applicant_type_of_businessKhat}
                        >
                            {!isLoading &&
                                data?.data?.map((category: TTradeKhat) => (
                                    <Option key={category.khat_id} value={category.khat_id}>
                                        {category.name}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                </div>

                {selectedKhatFee?.has_child && (
                    <Form.Item
                        label="মূলধন/ব্যবসার ধরন"
                        name="investmentType"
                        rules={[{ required: true, message: "মূলধন/ব্যবসার ধরন" }]}
                    >
                        <Select
                            showSearch
                            style={{ height: 40, width: "100%" }}
                            placeholder="Select"
                            onChange={handleKhatFeeChange}
                        >
                            {khatFees.map((khat) => (
                                <Option
                                    key={khat.applicant_type_of_businessKhatAmount}
                                    value={khat.applicant_type_of_businessKhatAmount}
                                >
                                    {khat.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}

                <div>
                    <Button loading={updating} disabled={updating} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default TradeKhatEditModal;
