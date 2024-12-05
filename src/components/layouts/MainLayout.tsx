import { Outlet, useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import ScrollToTop from "@/utils/ScrollToTop";
import TopHeader from "../ui/TopHeader";
import { GoToTop } from "go-to-top-react";
import { useEffect, useState } from "react";

import { useUnionInfoQuery } from "@/redux/api/user/userApi";
import Loader from "../reusable/Loader";

import { setUnionData } from "@/redux/features/union/unionSlice";
import { useAppDispatch } from "@/redux/features/hooks";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const [unionName, setUnionName] = useState("");
  const navigate = useNavigate();
  const { data, isLoading } = useUnionInfoQuery(unionName, {
    skip: !unionName,
  });

  useEffect(() => {
    const hostname = window.location.hostname;
    const union = hostname.split(".")[0];
    if (union !== "localhost") {
      setUnionName(union);
    }
  }, [navigate]);

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

  // console.log(data.data);

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
