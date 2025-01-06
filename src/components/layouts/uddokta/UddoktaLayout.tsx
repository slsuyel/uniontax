import { Layout, Menu } from "antd";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../admin/Navbar";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { useUnionInfoQuery } from "@/redux/api/user/userApi";
import Loader from "@/components/reusable/Loader";
import { setUnionData } from "@/redux/features/union/unionSlice";
import { useEffect } from "react";

const { Sider, Content, Header, Footer } = Layout;

const UddoktaLayout = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const theme = false;
  const unionName = useAppSelector((state) => state.informations.unionName);
  const sidebarItems = [
    {
      key: "new-application",
      label: (
        <Link className="text-decoration-none" to="/uddokta/">
          নতুন আবেদন
        </Link>
      ),
    },
    {
      key: "settings",
      label: (
        <Link className="text-decoration-none" to="/uddokta/settings">
          সেটিংস
        </Link>
      ),
    },
  ];
  const { data, isLoading } = useUnionInfoQuery(
    { unionName, token },
    {
      skip: !unionName,
    }
  );

  useEffect(() => {
    if (data?.data) {
      dispatch(
        setUnionData({
          unionInfo: data.data.uniouninfos,
          sonodList: data.data.sonod_name_lists,
        })
      );
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="dark" breakpoint="lg" collapsedWidth="0">
        <div
          className="border-bottom"
          style={{
            height: "65px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={"https://school-suyel.netlify.app/assets/dblogo-ixqnXm-n.png"}
            alt="Logo"
            width={150}
          />
        </div>
        <Menu
          theme="dark" // Set the theme to "light" or "dark" as needed
          mode="inline"
          defaultSelectedKeys={["dashboard"]} // Set the default selected key
          items={sidebarItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            position: "fixed",
            width: "100%",
            zIndex: 1000,
            backgroundColor: !theme
              ? scrollY > 0
                ? "rgba(0, 0, 0, 0.8)"
                : "#001529"
              : scrollY > 0
              ? "#fffcfc8a"
              : "white",

            backdropFilter: scrollY > 0 ? "blur(4px)" : "none",
            transition: "background-color 0.3s, backdrop-filter 0.3s",
          }}
        >
          <Navbar />
        </Header>

        <Content style={{ margin: "24px 16px 0" }}>
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
            <div className="float-right d-none d-sm-inline">Version 1.0.0 </div>
            <strong>Copyright © 2023-2024 সফটওয়েব সিস্টেম সল্যুশন</strong>
            {""} || All rights reserved.
          </footer>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default UddoktaLayout;
