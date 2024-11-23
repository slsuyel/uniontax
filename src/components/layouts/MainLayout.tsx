import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import ScrollToTop from "@/utils/ScrollToTop";
import TopHeader from "../ui/TopHeader";
import { GoToTop } from "go-to-top-react";

const MainLayout = () => {
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
