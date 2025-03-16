import { Layout } from "antd";

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ScrollToTop from "@/utils/ScrollToTop";
const { Header, Content, Footer } = Layout;

const UserLayout = () => {
  const theme = false;
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
