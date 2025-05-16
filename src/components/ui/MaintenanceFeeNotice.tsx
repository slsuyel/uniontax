"use client"

import { useState } from "react"
import { Modal, Button, message } from "antd"
import axios from "axios"

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

interface MaintenanceFeeNoticeProps {
  isMaintenanceNotice: boolean
  onClose: () => void
  setIsMaintenanceNotice: (value: boolean) => void
}

const MaintenanceFeeNotice = ({
  isMaintenanceNotice,
  onClose,
  setIsMaintenanceNotice,
}: MaintenanceFeeNoticeProps) => {
  const [loading, setLoading] = useState(false)

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

      // Nested payment_url চেক করছ
      if (response.data?.data?.payment_url) {
        window.location.href = response.data.data.payment_url
        return
      }

      console.log("Payment response:", response.data)

      if (response.data?.data?.status === "Pending") {
        message.success("রক্ষণাবেক্ষণ ফি সফলভাবে শুরু হয়েছে। পেমেন্ট গেটওয়েতে চলে যাচ্ছেন।")
        setIsMaintenanceNotice(false)
      } else {
        message.error(response.data?.data?.message || "পেমেন্ট প্রক্রিয়াকরণে সমস্যা হয়েছে")
      }
    } catch (error) {
      message.error("পেমেন্ট প্রক্রিয়াকরণে সমস্যা হয়েছে")
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
        <div className="alert alert-danger border border-danger rounded mb-4 fs-5">
          <p className="fw-bold">প্রিয় ব্যবহারকারী,</p>
          <p>
            আপনার ব্যবহৃত সিস্টেমটির বার্ষিক রক্ষণাবেক্ষণ ফি এখনো পরিশোধ হয়নি। সেবা চালু রাখতে অনুগ্রহ করে এখনই ফি পরিশোধ করুন।
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
      </div>
    </Modal>
  )
}

export default MaintenanceFeeNotice
