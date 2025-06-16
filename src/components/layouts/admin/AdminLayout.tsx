"use client"

import { Layout } from "antd"
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import ScrollToTop from "@/utils/ScrollToTop"
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks"
import type { RootState } from "@/redux/features/store"
import AdminNotice from "@/components/ui/AdminNotice"
import BankAccountNotice from "@/components/ui/BankAccountNotice"
import MaintenanceFeeNotice from "@/components/ui/MaintenanceFeeNotice"
import { useUnionInfoQuery } from "@/redux/api/user/userApi"
import { setUnionData } from "@/redux/features/union/unionSlice"
import Loader from "@/components/reusable/Loader"
import { useNavigate, useLocation } from "react-router-dom";
import { GoToTop } from "go-to-top-react"
// import { useTokenCheck } from "@/components/reusable/useTokenCheck"

const { Header, Content, Footer } = Layout
const UserLayout = () => {
  const user = useAppSelector((state: RootState) => state.user.user)
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const unionName = user?.unioun
  const theme = false
  const [isNoticeVisible, setIsNoticeVisible] = useState(false)
  const [isBankNotice, setIsBankNotice] = useState(false)
  const [isMaintenanceNotice, setIsMaintenanceNotice] = useState(false)
  const { data, isLoading } = useUnionInfoQuery(
    { unionName, token },
  );

  // Handle redirect when user profile steps are incomplete, on path change
  const navigate = useNavigate();
  const location = useLocation();

  // const { refetch } = useTokenCheck(token);

  useEffect(() => {
    const fullPath = location.pathname + location.search + location.hash;


    // if (token && user?.profile_steps !== 10) {
    //   refetch();
    // }

    if (user?.profile_steps === 0 && fullPath !== "/dashboard/union/profile?tab=UnionProfile") {
      import("antd").then(({ Modal }) => {
        Modal.warning({
          title: "প্রোফাইল সম্পূর্ণ করুন",
          content: "আপনার ইউনিয়নের প্রোফাইল সম্পূর্ণ করা আবশ্যক। দয়া করে প্রথমে প্রোফাইল তথ্য পূরণ করুন, তারপর অন্যান্য ফিচার ব্যবহার করুন।",
          okText: "ঠিক আছে, প্রোফাইল সম্পূর্ণ করব",
          onOk: () => {
            navigate("/dashboard/union/profile?tab=UnionProfile");
          },
        });
      });
      return;
    }

    if (user?.profile_steps === 1 && fullPath !== "/dashboard/union/profile?tab=BankAccount") {
      import("antd").then(({ Modal }) => {
        Modal.warning({
          title: "ব্যাংক অ্যাকাউন্ট তথ্য দিন",
          content: "আপনার ইউনিয়নের ব্যাংক অ্যাকাউন্ট তথ্য প্রদান করা আবশ্যক। দয়া করে প্রথমে ব্যাংক অ্যাকাউন্ট তথ্য পূরণ করুন, তারপর অন্যান্য ফিচার ব্যবহার করুন।",
          okText: "ঠিক আছে, ব্যাংক অ্যাকাউন্ট তথ্য দিব",
          onOk: () => {
            navigate("/dashboard/union/profile?tab=BankAccount");
          },
        });
      });
      return;
    }

    if (user?.profile_steps === 2 && fullPath !== "/dashboard/sonod/fee") {
      import("antd").then(({ Modal }) => {
        Modal.warning({
          title: "ফি সেট করুন",
          content: "আপনার ইউনিয়নের সনদের ফি নির্ধারণ করা আবশ্যক। দয়া করে প্রথমে সনদের ফি নির্ধারণ করুন, তারপর অন্যান্য ফিচার ব্যবহার করুন।",
          okText: "ঠিক আছে, ফি নির্ধারণ করব",
          onOk: () => {
            navigate("/dashboard/sonod/fee");
          },
        });
      });
      return;
    }
  }, [location.pathname, location.search, location.hash, user?.profile_steps, navigate, token, dispatch]);





  // Handle notices when user data changes
  useEffect(() => {
    if (user?.profile_steps === 10) {
      if (user?.is_popup) {
        setIsNoticeVisible(true);
      }

      if (!user?.has_bank_account) {
        setIsBankNotice(true);
      } else {
        setIsBankNotice(false);
      }

      // Check for maintenance fee status
      if (!user?.has_paid_maintance_fee) {
        setIsMaintenanceNotice(true);
      } else {
        setIsMaintenanceNotice(false);
      }
    }
  }, [user]);

  useEffect(() => {
    if (data?.data) {
      dispatch(
        setUnionData({
          unionInfo: data.data.uniouninfos,
          sonodList: data.data.sonod_name_lists,
          site_settings: data.data.site_settings,
        })
      );
    }
  }, [data, dispatch]);

  const handleCloseNotice = () => {
    setIsNoticeVisible(false)
  }

  const handleBankClose = () => {
    setIsBankNotice(false)
  }

  const handleMaintenanceClose = () => {

    if (user?.maintance_fee_option == "optional") {
      setIsMaintenanceNotice(false)
    }

    // setIsMaintenanceNotice(false)
  }

  if (isLoading) {
    return <Loader />
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
        user={{
          maintance_fee_type: user?.maintance_fee_type ?? "", // or "yearly"
          maintance_fee: user?.maintance_fee ?? "",
          maintance_fee_option: user?.maintance_fee_option ?? "",
        }}
      />
      <GoToTop />

    </ScrollToTop>
  )
}

export default UserLayout
