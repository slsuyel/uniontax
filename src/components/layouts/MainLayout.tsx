import { Outlet } from "react-router-dom";
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
// import { RootState } from "@/redux/features/store";
import Chatbot from "../ui/Chatbot";

const MainLayout = () => {
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  const hostname = window.location.hostname;
  let union = hostname.split(".")[0];
  if (union === "localhost" || union === "uniontax" || union === "unionservices" || union === "pouroseba") {
    union = 'root';
  }
  const [unionName] = useState(union);

  const [defaultColor, setDefaultColor] = useState("green");
  // const navigate = useNavigate();

  // const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
  const { data, isLoading } = useUnionInfoQuery(
    { unionName, token },
    // {
    //   skip: unionName =='uniontax',
    // }
  );

  // useEffect(() => {
  //   const hostname = window.location.hostname;
  //   const union = hostname.split(".")[0];
  //   if (union !== "localhost") {
  //     setUnionName(union);
  //   }
  // }, [navigate]);

  useEffect(() => {
    if (data?.data?.uniouninfos?.defaultColor) {
      setDefaultColor(data.data.uniouninfos.defaultColor);
    }
  }, [data]);

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

  useEffect(() => {
    // Update the CSS variable in the :root element
    document.documentElement.style.setProperty("--defaultColor", defaultColor);
  }, [defaultColor]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollToTop>
      <TopHeader />
      <Header />
      <Outlet />
      <Footer />
      <Chatbot />
      <GoToTop />
    </ScrollToTop>
  );
};

export default MainLayout;
