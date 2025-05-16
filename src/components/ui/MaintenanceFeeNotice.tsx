"use client"

import { useEffect, useState } from "react"
import { Modal, Button, message, Spin } from "antd"
import axios from "axios"

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

interface User {
  maintance_fee_type: string
  maintance_fee: string
}

interface MaintenanceFeeNoticeProps {
  isMaintenanceNotice: boolean
  onClose: () => void
  setIsMaintenanceNotice: (value: boolean) => void
  user: User
}

const MaintenanceFeeNotice = ({
  isMaintenanceNotice,
  onClose,
  setIsMaintenanceNotice,
  user,
}: MaintenanceFeeNoticeProps) => {
  const [loading, setLoading] = useState(false)
  const [executing, setExecuting] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const [retry, setRetry] = useState(false)

  const query = new URLSearchParams(window.location.search)
  const paymentID = query.get("paymentID")

  useEffect(() => {
    if (paymentID) {
      executePayment(paymentID)
    }
  }, [paymentID])

  useEffect(() => {
    if (executing && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [executing, countdown])

  const executePayment = async (id: string) => {
    setExecuting(true)
    try {
      const token = localStorage.getItem("token")

      const res = await axios.post(
        `${BASE_API_URL}/maintance-fee/execute`,
        { paymentID: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      const status = res.data?.data?.maintance_fee?.status

      if (status === "paid") {
        message.success("রক্ষণাবেক্ষণ ফি সফলভাবে প্রদান করা হয়েছে!")
        setIsMaintenanceNotice(false)
      } else {
        setRetry(true)
        message.warning("পেমেন্ট সম্পন্ন হয়নি। দয়া করে আবার চেষ্টা করুন।")
      }
    } catch (err) {
      setRetry(true)
      message.error("পেমেন্ট যাচাইয়ে সমস্যা হয়েছে।")
    } finally {
      setExecuting(false)
      setCountdown(10)
    }
  }

  const handlePayMaintenance = async () => {
    try {
      setLoading(true)
      const s_uri = window.location.href
      const token = localStorage.getItem("token")

      const response = await axios.post(
        `${BASE_API_URL}/user/maintance-fees`,
        { s_uri },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      if (response.data?.data?.payment_url) {
        window.location.href = response.data.data.payment_url
        return
      }

      if (response.data?.data?.status === "Pending") {
        message.success("পেমেন্ট গেটওয়েতে চলেছেন।")
        setIsMaintenanceNotice(false)
      } else {
        message.error(response.data?.data?.message || "পেমেন্টে সমস্যা হয়েছে।")
      }
    } catch (error) {
      message.error("পেমেন্টে সমস্যা হয়েছে।")
      console.error("Payment error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={
        <div className="text-danger fw-bold fs-4">
          ⚠️ জরুরি নোটিশ: রক্ষণাবেক্ষণ ফি বাকি রয়েছে
        </div>
      }
      open={isMaintenanceNotice}
      footer={null}
      centered
      closable={true}
      onCancel={onClose}
    >
      <div className="p-3">
        {executing ? (
          <div className="text-center">
            <Spin size="large" />
            <p className="mt-3 fw-semibold fs-5 text-primary">
              পেমেন্ট যাচাই চলছে... {countdown} সেকেন্ড অপেক্ষা করুন
            </p>
          </div>
        ) : retry ? (
          <div className="alert alert-warning">
            পেমেন্ট ব্যর্থ হয়েছে বা অসম্পূর্ণ। দয়া করে আবার চেষ্টা করুন।
            <div className="text-end mt-3">
              <Button type="primary" onClick={() => executePayment(paymentID!)}>
                আবার যাচাই করুন
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="alert alert-danger border border-danger rounded mb-4 fs-5">
              <p className="fw-bold">প্রিয় ব্যবহারকারী,</p>
              <p>
                আপনার ব্যবহৃত সিস্টেমটির{" "}
                {user.maintance_fee_type === "monthly" ? "মাসিক" : "বার্ষিক"} রক্ষণাবেক্ষণ ফি এখনো
                পরিশোধ হয়নি।
              </p>
              <p className="text-danger fw-semibold">
                ➤ মোট পরিশোধযোগ্য ফি: {user.maintance_fee} টাকা (
                {user.maintance_fee_type === "monthly" ? "মাসিক" : "বার্ষিক"})
              </p>
              <p>
                ফি পরিশোধ না করলে আপনার সিস্টেম অ্যাক্সেস সাময়িকভাবে সীমিত বা বন্ধ হয়ে যেতে পারে।
              </p>
              <p className="fw-semibold">➤ এখনই ফি পরিশোধ করে সেবা চালু রাখুন।</p>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Button onClick={onClose} className="btn btn-outline-secondary fs-6">
                পরে পরিশোধ করব
              </Button>
              <Button
                type="primary"
                loading={loading}
                onClick={handlePayMaintenance}
                className="btn btn-danger fs-6 fw-semibold"
              >
                এখনই পরিশোধ করুন
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default MaintenanceFeeNotice
