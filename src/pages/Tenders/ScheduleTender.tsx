/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useGetTenderTimeQuery } from "@/redux/api/tender/tenderApi";
import Loader from "@/components/reusable/Loader";
import Countdown from "./CountDown";
import TenderSubmitForm from "./TenderSubmitForm";
import WaitingForSelection from "./WaitingForSelection";
import SelectedList from "./SelectedList";

export interface TTenderResponse {
    message: string;
    status: string;
    dorId: number;
    tender_end_time: string;
    tender_list: {
        id: number;
        union_name: string;
        tender_id: string;
        tender_type: string;
        memorial_no: string;
        tender_name: string;
        description: string;
        tender_word_no: string;
        division: string | null;
        district: string | null;
        thana: string | null;
        union: string | null;
        govt_price: string;
        form_price: string;
        deposit_percent: string | null;
        noticeDate: string;
        form_buy_last_date: string;
        tender_start: string;
        tender_end: string;
        tender_open: string;
        tender_roles: string;
        status: string;
        committe1name: string;
        committe1position: string | null;
        commette1phone: string | null;
        committe2name: string | null;
        committe2position: string | null;
        commette2phone: string | null;
        committe3name: string | null;
        committe3position: string | null;
        commette3phone: string | null;
        bankName: string | null;
        bankCheck: string | null;
        daysOfDepositeAmount: string | null;
        permitDetials: string | null;
        created_at: string;
        updated_at: string;
        is_committee_created: boolean;
    };
    method: string;
}


const ScheduleTender = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetTenderTimeQuery(id as string);

    if (isLoading) {
        return <div className=" py-lg-5"><Loader /></div>;
    }

    const status = data?.data?.status;
    console.log(status);
    return (
        <>
            {status === "pending" && <Countdown data={data?.data} />}
            {status === "active" && <TenderSubmitForm data={data?.data} />}

            {status === "proccesing" && <WaitingForSelection data={data?.data} />}
            {status === "Completed" && <SelectedList data={data?.data} />}
        </>
    );
};

export default ScheduleTender;
