/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from "react";
import { Button, Card } from "antd";
import {
  useCallipnMutation,
  useCheckPaymentMutation,
} from "@/redux/api/payment/paymentApi";
import { Link, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import FailedContact from "./FailedContact";
import { TIpnResposne } from "@/types";
const succes = "/pay-success.png";

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

const PaymentSuccessPage: React.FC = () => {
  const [ipnResponse, setIpnResponse] = useState<TIpnResposne>();
  const [failedPage, setFailedPage] = useState(false);
  const [showDetails, SetShowDetails] = useState(false);
  const [sonodId, SetSonodId] = useState("");
  const [paymentData, setPaymentData] = useState<TPaymentData | null>(null);
  const [callIpn, { isLoading: chckingIpn }] = useCallipnMutation();
  const [checkPayment, { isLoading }] = useCheckPaymentMutation();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const transId = params.get("transId") || "";

  const [count, setCount] = useState(10);
  const [hasCalledApi, setHasCalledApi] = useState(false);
  const VITE_BASE_DOC_URL = import.meta.env.VITE_BASE_DOC_URL;



  const fetchPaymentDetails = useCallback(async () => {
    if (!transId) {
      console.error("Transaction ID is missing from the URL.");
      return;
    }

    try {
      const response: any = await checkPayment({ trnx_id: transId }).unwrap();
      SetSonodId(response.data.myserver.sonodId);

      if (response.data.myserver.status !== "Paid") {
        if (response.data.akpay.msg_code === "1020") {
          SetShowDetails(false);
          setPaymentData(response?.data?.akpay);

          // Ensure paymentData is updated before calling callIpn
          const updatedPaymentData = response?.data?.akpay;
          setPaymentData(updatedPaymentData);

          const res = await callIpn({ data: updatedPaymentData }).unwrap();
          if (res.status_code === 200) {
            SetShowDetails(true);
          }
        } else {
          setFailedPage(true);
        }
      } else {
        SetShowDetails(true);
        console.log({ response });
        setIpnResponse(response);
      }
    } catch (error) {
      setFailedPage(true);
      console.error("Error fetching payment details:", error);
    }
  }, [transId, checkPayment, callIpn]);

  useEffect(() => {
    if (!transId) {
      console.error("Transaction ID not found. Skipping countdown.");
      return;
    }

    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!hasCalledApi) {
      setHasCalledApi(true);
      fetchPaymentDetails();
    }
  }, [count, transId, hasCalledApi, fetchPaymentDetails]);

  console.log(ipnResponse);

  return (
    <div className="container">
      {failedPage && <FailedContact sonodId={sonodId} transId={transId} />}

      {!failedPage && (
        <>
          {!showDetails && paymentData?.msg_code !== "1020" && (
            <div
              style={{ height: "50vh" }}
              className="d-flex justify-content-center align-items-center"
            >
              <Card
                className="text-center p-3 shadow"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#f5f5f5",
                  maxWidth: "400px",
                  width: "100%",
                }}
              >
                <div>
                  {count > 0 && (
                    <p className="text-center">{count} সেকেন্ড অপেক্ষা করুন</p>
                  )}
                  <h1
                    style={{
                      fontSize: "3rem",
                      fontWeight: "bold",
                      color: count > 0 ? "#1890ff" : "#ff4d4f",
                    }}
                  >
                    {count > 0 ? count : ""}
                  </h1>
                </div>
                {isLoading && (
                  <div>
                    <Spinner />
                    <p>
                      অনুগ্রহ করে অপেক্ষা করুন, আপনার পেমেন্টটি যাচাই করা হচ্ছে।
                    </p>
                  </div>
                )}
              </Card>
            </div>
          )}

          {showDetails && (
            <div>
              <div className="col-sm-6 my-5 py-5 text-center w-100">
                <h2 style={{ color: "#0fad00" }}>Success</h2>
                <img width={150} height={"auto"} src={succes} alt="Success" />
                <div className="my-3">
                  <h3>জনাব,</h3>
                  <p
                    style={{ fontSize: "20px", color: "#5C5C5C" }}
                    className="mb-0"
                  >
                    আপনার আবেদন ও পেমেন্ট সফলভাবে গৃহীত হয়েছে।
                  </p>
                  <p style={{ fontSize: "20px", color: "#5C5C5C" }}>
                    আবেদন কপি ও পেমেন্ট রশিদ প্রিন্ট করে সংরক্ষণ করুন
                  </p>
                </div>
                <div className="d-flex gap-3 justify-content-center">
                  <Link to="/" className="btn btn-danger">
                    Back to Home
                  </Link>
                  {ipnResponse?.data.myserver.sonod_type !== "holdingtax" && (
                    <a
                      href={`${VITE_BASE_DOC_URL}/applicant/copy/download/${sonodId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success"
                    >
                      Applicant Copy
                    </a>
                  )}
                  <a
                    href={
                      ipnResponse?.data.myserver.sonod_type === "holdingtax"
                        ? `${VITE_BASE_DOC_URL}/holding/tax/invoice/${sonodId}`
                        : `${VITE_BASE_DOC_URL}/sonod/invoice/download/${sonodId}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success"
                  >
                    Invoice
                  </a>
                </div>
              </div>
            </div>
          )}

          {!showDetails && paymentData?.msg_code === "1020" && (
            <div
              style={{ height: "50vh" }}
              className="d-flex justify-content-center align-items-center"
            >
              <Card
                className="text-center p-3 shadow border-danger"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#f5f5f5",
                  maxWidth: "400px",
                  width: "100%",
                }}
              >
                <h3 className="fw-bold text-danger">Payment Failed</h3>
                <p className="">
                  আপনার পেমেন্ট টি সঠিক ভাবে যাচাই হয়নি, দয়া করে অপেক্ষা করুন।
                  ধন্যবাদ
                </p>

                <Button
                  loading={chckingIpn}
                  danger
                  className="bg-danger text-white"
                  size="large"
                  key="recall"
                >
                  পেমেন্টটি আবার যাচাই করা হচ্ছে।
                </Button>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
