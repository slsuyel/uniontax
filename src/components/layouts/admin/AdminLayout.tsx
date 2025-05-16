"use client"

import { Layout } from "antd"
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import ScrollToTop from "@/utils/ScrollToTop"
import { useAppSelector } from "@/redux/features/hooks"
import type { RootState } from "@/redux/features/store"
import AdminNotice from "@/components/ui/AdminNotice"
import BankAccountNotice from "@/components/ui/BankAccountNotice"
import MaintenanceFeeNotice from "@/components/ui/MaintenanceFeeNotice"
import axios from "axios"
import { message } from "antd"

const { Header, Content, Footer } = Layout
const UserLayout = () => {
  const user = useAppSelector((state: RootState) => state.user.user)
  const theme = false
  const [isNoticeVisible, setIsNoticeVisible] = useState(false)
  const [isBankNotice, setIsBankNotice] = useState(false)
  const [isMaintenanceNotice, setIsMaintenanceNotice] = useState(false)
  const [loadingExecute, setLoadingExecute] = useState(false)

  // URL থেকে paymentID, status ইত্যাদি নেওয়া
  const getPaymentIDFromURL = () => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      return urlParams.get("paymentID")
    }
    return null
  }

  // Execute API কল করার ফাংশন
  const executePayment = async (paymentID: string) => {
    try {
      setLoadingExecute(true)
      const token = localStorage.getItem("token")
      const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

      const response = await axios.post(
        `${BASE_API_URL}/maintance-fee/execute`,
        { paymentID },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      if (response.data.success) {
        message.success("পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।")
        setIsMaintenanceNotice(false)
      } else {
        message.error(response.data.message || "পেমেন্ট সম্পন্ন করতে সমস্যা হয়েছে।")
        // প্রয়োজন হলে maintenance notice দেখানো যেতে পারে
        setIsMaintenanceNotice(true)
      }
    } catch (error) {
      message.error("পেমেন্ট সম্পন্ন করতে সমস্যা হয়েছে।")
      setIsMaintenanceNotice(true)
      console.error("Execute payment error:", error)
    } finally {
      setLoadingExecute(false)
    }
  }

  useEffect(() => {
    if (user && user?.is_popup) {
      setIsNoticeVisible(true)
    }

    if (user && !user?.has_bank_account) {
      setIsBankNotice(true)
    } else {
      setIsBankNotice(false)
    }

    // Maintenance fee notice এর লজিক (যদি পেমেন্ট হয়নি)
    if (user && !user?.has_paid_maintance_fee) {
      setIsMaintenanceNotice(true)
    } else {
      setIsMaintenanceNotice(false)
    }

    // ইউআরএল থেকে paymentID চেক করে execute API কল করা
    const paymentID = getPaymentIDFromURL()
    if (paymentID) {
      executePayment(paymentID)
    }
  }, [user])

  const handleCloseNotice = () => {
    setIsNoticeVisible(false)
  }

  const handleBankClose = () => {
    setIsBankNotice(false)
  }

  const handleMaintenanceClose = () => {
    setIsMaintenanceNotice(false)
  }

  return (
    <ScrollToTop>
      <Layout>
        <Sidebar user={user} />
        <Layout>
          <Header
            className="antd-db-header-nv"
            style={{
              display: "flex",
              alignItems: "center",
              position: "fixed",
              zIndex: 1000,
              backgroundColor: !theme ? "#007575" : "white",
              backdropFilter: "none",
              transition: "background-color 0.3s, backdrop-filter 0.3s",
            }}
          >
            <div style={{ marginLeft: "auto" }}>
              <Navbar />
            </div>
          </Header>
          <Content style={{ margin: "24px 0px 0" }} className={`${!theme ? "dark " : ""}`}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                marginTop: "50px",
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer className={`${!theme ? "dark border-top" : ""}`}>
            <footer>
              <div className="float-right d-none d-sm-inline">Version 2.0.0</div>
              <strong>
                Copyright © {new Date().getFullYear()}-{new Date().getFullYear() + 1} সফটওয়েব সিস্টেম সল্যুশন
              </strong>
              || All rights reserved.
            </footer>
          </Footer>
        </Layout>
      </Layout>

      {/* Admin Notice Modal */}
      <AdminNotice isVisible={isNoticeVisible} onClose={handleCloseNotice} user={user} />
      <BankAccountNotice isBankNotice={isBankNotice} onClose={handleBankClose} setIsBankNotice={setIsBankNotice} />
      <MaintenanceFeeNotice
        isMaintenanceNotice={isMaintenanceNotice}
        onClose={handleMaintenanceClose}
        setIsMaintenanceNotice={setIsMaintenanceNotice}
      />
    </ScrollToTop>
  )
}

export default UserLayout
