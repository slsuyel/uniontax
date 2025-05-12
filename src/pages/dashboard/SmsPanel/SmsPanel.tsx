"use client"

import { useState, useEffect } from "react"
import { useAllSmsQuery, usePurchaseSmsMutation } from "@/redux/api/sms/smsApi"
import { Form, Input, Button, Spin, message, Modal } from "antd"
import Breadcrumbs from "@/components/reusable/Breadcrumbs"
import Loader from "@/components/reusable/Loader"

export interface TSMS {
  data: Data
  isError: boolean
  error: null
  status_code: number
}

export interface Data {
  current_page: number
  data: Datum[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  next_page_url: null
  path: string
  per_page: number
  prev_page_url: null
  to: number
  total: number
}

export interface Datum {
  id: number
  union_name: string
  mobile: string
  trx_id: string
  amount: string
  sms_amount: number
  payment_status: string
  status: string
  created_at: Date
  updated_at: Date
}

const SmsPanel = () => {
  const token = localStorage.getItem("token")
  const [purchaseSms, { isLoading }] = usePurchaseSmsMutation()
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { data, isLoading: getting, refetch } = useAllSmsQuery({ token })
  const [verifyingPayment, setVerifyingPayment] = useState(false)

  // Check for paymentID in URL when component mounts
  useEffect(() => {
    const checkPaymentStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const paymentID = urlParams.get("paymentID")
      const status = urlParams.get("status")
      const apiUrl = import.meta.env.VITE_BASE_API_URL

      // Only proceed with verification if paymentID exists and status is "success"
      if (paymentID && status === "success") {
        try {
          setVerifyingPayment(true)
          const response = await fetch(`${apiUrl}/global/sms-purchase-success`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ paymentID }),
          })

          const result = await response.json()

          if (response.ok) {
            message.success("Payment verified successfully!")
            // Remove the query parameter from URL without refreshing the page
            const newUrl = window.location.pathname
            window.history.replaceState({}, document.title, newUrl)
            // Refresh the SMS data
            refetch()
          } else {
            message.error(result.message || "Failed to verify payment")
          }
        } catch (error) {
          message.error("Error verifying payment")
          console.error("Payment verification error:", error)
        } finally {
          setVerifyingPayment(false)
        }
      } else if (paymentID && status === "cancel") {
        // If payment was canceled, just clean up the URL and show a message
        message.info("Payment was canceled")
        const newUrl = window.location.pathname
        window.history.replaceState({}, document.title, newUrl)
      } else if (paymentID) {
        // For any other status with paymentID, just clean up the URL
        const newUrl = window.location.pathname
        window.history.replaceState({}, document.title, newUrl)
      }
    }

    checkPaymentStatus()
  }, [token, refetch])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = async (values: { sms_amount: number; mobile: string }) => {
    try {
      const data = {
        ...values,
        c_uri: window.location.href,
        f_uri: window.location.href,
        s_uri: window.location.href,
      }
      const result = await purchaseSms({ data, token }).unwrap()
      if (result?.error) throw new Error(result.error)
      form.resetFields()
      console.log(result)
      window.location.href = result.data.payment_url
      message.success("SMS purchase successful!")
      setIsModalVisible(false)
    } catch (error) {
      message.error("Failed to purchase SMS")
    }
  }

  if (getting || verifyingPayment) {
    return <Loader />
  }

  return (
    <div className="card p-3 border-0">
      <Breadcrumbs current="Sms Panel" />
      <div className="d-flex justify-content-end">
        <Button type="primary" onClick={showModal}>
          SMS কিনুন
        </Button>
      </div>

      {/* Bootstrap Table to show SMS data */}
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>তারিখ</th>
            <th>মোবাইল নাম্বার</th>
            <th>ট্রানজেকশন আইডি</th>
            <th>টাকার পরিমাণ</th>
            <th>এসএমএস পরিমাণ</th>
            <th>পেমেন্ট স্ট্যাটাস</th>
            <th>স্ট্যাটাস</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.data.map((item: Datum) => (
            <tr key={item.id}>
              <td>{new Date(item.updated_at).toLocaleString()}</td>
              <td>{item.mobile}</td>
              <td>{item.trx_id}</td>
              <td>{item.amount}</td>
              <td>{item.sms_amount}</td>
              <td className="text-capitalize">{item.payment_status}</td>
              <td className="text-capitalize">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for SMS Purchase */}
      <Modal title="Purchase SMS" open={isModalVisible} onCancel={handleCancel} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item label="SMS Amount" name="sms_amount" rules={[{ required: true, message: "Enter SMS amount" }]}>
            <Input type="number" placeholder="SMS amount" />
          </Form.Item>
          <Form.Item
            label="Mobile Number"
            name="mobile"
            rules={[
              { required: true, message: "Enter mobile number" },
              { pattern: /^01[3-9]\d{8}$/, message: "Invalid BD mobile number" },
            ]}
          >
            <Input placeholder="Mobile number" />
          </Form.Item>
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" disabled={isLoading}>
              {isLoading ? <Spin size="small" /> : "SMS কিনুন"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default SmsPanel
