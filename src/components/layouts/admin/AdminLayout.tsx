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


const { Header, Content, Footer } = Layout
const UserLayout = () => {
  const user = useAppSelector((state: RootState) => state.user.user)
  const theme = false
  const [isNoticeVisible, setIsNoticeVisible] = useState(false)
  const [isBankNotice, setIsBankNotice] = useState(false)


  useEffect(() => {
    if (user && user?.is_popup) {
      setIsNoticeVisible(true)
    }

    if (user && !user?.has_bank_account) {
      setIsBankNotice(true)
    }else{
      setIsBankNotice(false)

    }

  }, [user])

  const handleCloseNotice = () => {
    setIsNoticeVisible(false)
  }
  const handleBankClose = () => {
    setIsBankNotice(false)
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
      <BankAccountNotice isBankNotice={isBankNotice} onClose={handleBankClose} setIsBankNotice={ setIsBankNotice} />
    </ScrollToTop>
  )
}

export default UserLayout

