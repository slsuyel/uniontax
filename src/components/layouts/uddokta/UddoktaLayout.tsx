import { Layout, Menu, Button, Dropdown, Space } from "antd";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { useUnionInfoQuery } from "@/redux/api/user/userApi";
import Loader from "@/components/reusable/Loader";
import { setUnionData } from "@/redux/features/union/unionSlice";
import { useEffect, useState } from "react";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const { Sider, Content, Header, Footer } = Layout;

const UddoktaLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const theme = false;
  const unionName = useAppSelector((state) => state.informations.unionName);
  const [scrollY, setScrollY] = useState(0); // Track scroll position for header styling

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page after logout
  };

  // Define the dropdown menu items
  const userMenuItems = [
    // {
    //   key: "profile",
    //   label: <Link to="/uddokta/profile">Profile</Link>,
    //   icon: <UserOutlined />,
    // },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

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
          <h5 className=" fw-semibold text-white mb-0">উদ্যোক্তা ড্যাশবোর্ড</h5>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["new-application"]}
          items={sidebarItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "fixed",
            width: "85%",
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
            padding: "0 24px",
          }}
        >
          <Space>
            <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
              <Button
                type="text"
                style={{ color: "white", fontSize: "16px" }}
                icon={<UserOutlined />}
              >
                User
              </Button>
            </Dropdown>
            <Button
              type="primary"
              danger
              onClick={handleLogout}
              icon={<LogoutOutlined />}
            >
              Logout
            </Button>
          </Space>
        </Header>

        <Content style={{ margin: "24px 16px 0", marginTop: "64px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer className={`${!theme ? "dark border-top" : ""}`}>
          <footer>
            <div className="float-right d-none d-sm-inline">Version 2.0.0 </div>
            <strong>Copyright © 2024-2025 সফটওয়েব সিস্টেম সল্যুশন</strong>
            {""} || All rights reserved.
          </footer>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default UddoktaLayout;
