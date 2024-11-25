import { Outlet, useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import ScrollToTop from "@/utils/ScrollToTop";
import TopHeader from "../ui/TopHeader";
import { GoToTop } from "go-to-top-react";
import { useEffect } from "react";
import { message } from "antd";

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hostname = window.location.hostname;
    const union = hostname.split(".")[0];
    if (union !== "localhost") {
      // Handle union-specific logic

      console.log(union);
      message.success(`apni akhon ${union} e`);
    }
  }, [navigate]);

  return (
    <ScrollToTop>
      <TopHeader />
      <Header />
      <Outlet />
      <Footer />
      <GoToTop />
    </ScrollToTop>
  );
};

export default MainLayout;
