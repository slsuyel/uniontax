import { Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../admin/Navbar";

const { Sider, Content, Header } = Layout;

const UddoktaLayout = () => {
  const theme = false;

  const sidebarItems = [
    {
      key: "dashboard",
      label: "ড্যাশবোর্ড",
    },
    {
      key: "make-payment",
      label: "পেমেন্ট করুন",
    },
    {
      key: "new-application",
      label: "নতুন আবেদন",
    },

    {
      key: "settings",
      label: "সেটিংস",
    },
  ];

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
      </Layout>
    </Layout>
  );
};

export default UddoktaLayout;
