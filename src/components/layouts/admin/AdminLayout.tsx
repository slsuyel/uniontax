import { Layout } from "antd";

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ScrollToTop from "@/utils/ScrollToTop";
// import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
// import { useUnionInfoQuery } from "@/redux/api/user/userApi";
// import { setUnionData } from "@/redux/features/union/unionSlice";
// import Loader from "@/components/reusable/Loader";
// import { RootState } from "@/redux/features/store";

const { Header, Content, Footer } = Layout;

const UserLayout = () => {
  // const userInfo = useAppSelector((state: RootState) => state.user.user);
  // const token = localStorage.getItem("token");
  // const dispatch = useAppDispatch();
  // const [unionName, setUnionName] = useState(userInfo?.unioun);
  // const navigate = useNavigate();
  const theme = false;
  const [scrollY, setScrollY] = useState(0);
  // const { data, isLoading } = useUnionInfoQuery(
  //   { unionName, token },
  //   {
  //     skip: !unionName,
  //   }
  // );
  // useEffect(() => {
  //   const hostname = window.location.hostname;
  //   const union = hostname.split(".")[0];
  //   if (union !== "localhost") {
  //     setUnionName(union);
  //   }
  // }, [navigate]);

  // useEffect(() => {
  //   if (data?.data) {
  //     dispatch(
  //       setUnionData({
  //         unionInfo: data.data.uniouninfos,
  //         sonodList: data.data.sonod_name_lists,
  //       })
  //     );
  //   }
  // }, [data, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // if (isLoading) {
  //   return <Loader />;
  // }
  // console.log(userInfo);
  return (
    <ScrollToTop>
      <Layout>
        <Sidebar />
        <Layout>
          <Header
            className="antd-db-header-nv"
            style={{
              // padding: "5px",
              display: "flex",
              alignItems: "center",
              position: "fixed",
              zIndex: 1000,
              backgroundColor: !theme
                ? scrollY > 0
                  ? "#017575"
                  : "#007575"
                : scrollY > 0
                ? "#fffcfc8a"
                : "white",
              backdropFilter: scrollY > 0 ? "blur(4px)" : "none",
              transition: "background-color 0.3s, backdrop-filter 0.3s",
            }}
          >
            <div style={{ marginLeft: "auto" }}>
              {" "}
              {/* Push Navbar to the right */}
              <Navbar />
            </div>
          </Header>
          <Content
            style={{ margin: "24px 0px 0" }}
            className={`${!theme ? "dark " : ""}`}
          >
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
              <div className="float-right d-none d-sm-inline">
                Version 2.0.0{" "}
              </div>
              <strong>Copyright © 2024-2025 সফটওয়েব সিস্টেম সল্যুশন</strong>
              {""} || All rights reserved.
            </footer>
          </Footer>
        </Layout>
      </Layout>{" "}
    </ScrollToTop>
  );
};

export default UserLayout;
