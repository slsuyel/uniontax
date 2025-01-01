import {
  useCallipnMutation,
  useCheckPaymentMutation,
  useFailedPaymentQuery,
} from "@/redux/api/payment/paymentApi";

import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
import { TPaymentFailed } from "@/types/global";
import { Button, Modal } from "antd";
import { SetStateAction, useState } from "react";
import { Spinner } from "react-bootstrap";
interface TPaymentData {
  secure_token: string;
  msg_code: string;
  msg_det: string;
  req_timestamp: string;
  basic_Info: {
    mer_reg_id: string;
    ipn_info: string;
    redirect_to: string;
    dgtl_sign: string;
    ord_desc: string;
    remarks: string;
  };
  cust_info: {
    cust_id: string;
    cust_name: string;
    cust_mobo_no: string;
    cust_email: string;
    cust_mail_addr: string;
  };
  scroll_no: string | null;
  trnx_info: {
    trnx_amt: string;
    trnx_id: string;
    mer_trnx_id: string;
    curr: string;
    pi_trnx_id: string;
    pi_charge: string;
    ekpay_charge: string;
    pi_discount: string;
    discount: string;
    promo_discount: string;
    total_ser_chrg: string;
    total_pabl_amt: string;
  };
  pi_det_info: {
    pay_timestamp: string;
    pi_name: string;
    pi_type: string;
    pi_number: string;
    pi_gateway: string;
    card_holder_name: string | null;
  };
}

const PaymentFailed = () => {
  const [callIpn, { isLoading: chckingIpn }] = useCallipnMutation();
  const [paymentData, setPaymentData] = useState<TPaymentData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingTrxId, setLoadingTrxId] = useState<string | null>(null);
  const sonodInfo = useAppSelector((state: RootState) => state.union.sonodList);
  const [checkPayment] = useCheckPaymentMutation();
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const token = localStorage.getItem(`token`);

  const [triggerSearch, setTriggerSearch] = useState(false);
  const { data, isLoading, isFetching, refetch } = useFailedPaymentQuery(
    triggerSearch
      ? { token, sonod_type: selectedService, date: selectedDate }
      : null
  );

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSelectedService(e.target.value);
  };

  const handleSearch = () => {
    setTriggerSearch(true);
    refetch();
  };

  const failedResult: TPaymentFailed[] = data?.data;

  const handleCheckPayment = async (trx: string) => {
    setLoadingTrxId(trx);
    try {
      const res = await checkPayment({ trnx_id: trx }).unwrap();
      console.log(res.data.akpay);
      setPaymentData(res.data.akpay);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error checking payment:", error);
    } finally {
      setLoadingTrxId(null);
    }
  };

  const handleRecallCheckPayment = async () => {
    const res = await callIpn({ data: paymentData }).unwrap();
    if (res.status_code == 200) {
      refetch();
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card p-3 border-0">
      <div className=" mt-5">
        <h4>পেমেন্ট Failed তালিকাঃ</h4>
        <div className="row ">
          <div className="form-group col-md-3 my-1">
            <select
              id="sonod"
              required
              className="form-control"
              onChange={handleChange}
              value={selectedService}
            >
              <option value="">চিহ্নিত করুন</option>
              <option value="all">সকল</option>
              <option value="holdingtax">হোল্ডিং ট্যাক্স</option>
              {sonodInfo.map((d) => (
                <option key={d.id} value={d.bnname}>
                  {d.bnname}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-3 my-1">
            <input
              className="form-control"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="form-group col-md-3 my-1">
            <button
              className="btn_main"
              onClick={handleSearch}
              disabled={!selectedDate || !selectedService}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="my-4">
        <h2>Payment Failed Records</h2>
        <div className="table-responsive d-none d-md-block">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Sonod ID</th>
                <th>Union</th>
                <th>Transaction ID</th>
                <th>Sonod Type</th>
                <th>Date</th>
                <th>Method</th>
                <th>Maliker Name</th>
                <th>Gram</th>
                <th>Mobile No</th>
                <th>Holding No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading || isFetching ? (
                <tr>
                  <td colSpan={14} className="text-center">
                    <Spinner />
                  </td>
                </tr>
              ) : failedResult?.length > 0 ? (
                failedResult.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.sonodId}</td>
                    <td>{item.union}</td>
                    <td>{item.trxId}</td>
                    <td>{item.sonod_type}</td>
                    <td>{item.date}</td>
                    <td>{item.method}</td>

                    {item?.holding_tax ? (
                      <>
                        <td>{item?.holding_tax?.maliker_name}</td>
                        <td>{item?.holding_tax?.gramer_name}</td>
                        <td>{item?.holding_tax?.mobile_no}</td>
                        <td>{item?.holding_tax?.holding_no}</td>
                      </>
                    ) : (
                      <>
                        <td>{item.sonods?.applicant_name}</td>
                        <td>{item.sonods?.applicant_present_village}</td>
                        <td>{item.sonods?.applicant_mobile}</td>
                        <td>{item.sonods?.applicant_holding_tax_number}</td>
                      </>
                    )}

                    <td>
                      <Button
                        disabled={loadingTrxId !== null}
                        loading={loadingTrxId === item.trxId}
                        onClick={() => handleCheckPayment(item.trxId)}
                        className="btn btn-sm btn-primary"
                      >
                        {" "}
                        চেক পেমেন্ট
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={14} className="text-center">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Card View for Mobile */}
        <div className="card-view d-block d-md-none">
          {isLoading || isFetching ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : failedResult?.length > 0 ? (
            failedResult.map((item) => (
              <div key={item.id} className="card mb-3">
                <div className="card-body">
                  <p>
                    <strong>ID:</strong> {item.id}
                  </p>
                  <p>
                    <strong>Sonod ID:</strong> {item.sonodId}
                  </p>
                  <p>
                    <strong>Union:</strong> {item.union}
                  </p>
                  <p>
                    <strong>Transaction ID:</strong> {item.trxId}
                  </p>
                  <p>
                    <strong>Sonod Type:</strong> {item.sonod_type}
                  </p>
                  <p>
                    <strong>Date:</strong> {item.date}
                  </p>
                  <p>
                    <strong>Method:</strong> {item.method}
                  </p>
                  {item?.holding_tax ? (
                    <>
                      <p>
                        <strong>Maliker Name:</strong>{" "}
                        {item.holding_tax.maliker_name}
                      </p>
                      <p>
                        <strong>Gram:</strong> {item.holding_tax.gramer_name}
                      </p>
                      <p>
                        <strong>Mobile No:</strong> {item.holding_tax.mobile_no}
                      </p>
                      <p>
                        <strong>Holding No:</strong>{" "}
                        {item.holding_tax.holding_no}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>Maliker Name:</strong>{" "}
                        {item.sonods?.applicant_name}
                      </p>
                      <p>
                        <strong>Gram:</strong>{" "}
                        {item.sonods?.applicant_present_village}
                      </p>
                      <p>
                        <strong>Mobile No:</strong>{" "}
                        {item.sonods?.applicant_mobile}
                      </p>
                      <p>
                        <strong>Holding No:</strong>{" "}
                        {item.sonods?.applicant_holding_tax_number}
                      </p>
                    </>
                  )}

                  <td>
                    <Button
                      disabled={loadingTrxId !== null}
                      loading={loadingTrxId === item.trxId}
                      onClick={() => handleCheckPayment(item.trxId)}
                      className="btn btn-sm btn-primary"
                    >
                      {" "}
                      চেক পেমেন্ট
                    </Button>
                  </td>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">No records found.</div>
          )}
        </div>
      </div>

      <Modal
        // loading={}
        title="Payment Details"
        open={isModalOpen}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" type="primary" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
      >
        <div>
          {paymentData?.msg_det}

          <div className=" mt-3">
            {paymentData?.msg_code == "1020" && (
              <Button
                loading={chckingIpn}
                type="primary"
                key="recall"
                onClick={handleRecallCheckPayment}
              >
                Recall Payment
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentFailed;
