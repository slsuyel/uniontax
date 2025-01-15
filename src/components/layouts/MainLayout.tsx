// import { Outlet, useNavigate } from "react-router-dom";
// import Header from "../ui/Header";
// import Footer from "../ui/Footer";
// import ScrollToTop from "@/utils/ScrollToTop";
// import TopHeader from "../ui/TopHeader";
// import { GoToTop } from "go-to-top-react";
// import { useEffect, useState } from "react";

// import { useUnionInfoQuery } from "@/redux/api/user/userApi";
// import Loader from "../reusable/Loader";

// import { setUnionData } from "@/redux/features/union/unionSlice";
// import { useAppDispatch } from "@/redux/features/hooks";

// const MainLayout = () => {
//   const token = localStorage.getItem("token");
//   const dispatch = useAppDispatch();
//   const [unionName, setUnionName] = useState("uniontax");
//   const navigate = useNavigate();
//   const { data, isLoading } = useUnionInfoQuery(
//     { unionName, token },
//     {
//       skip: !unionName,
//     }
//   );

//   // const { data, isLoading } = useUnionInfoQuery(unionName, {
//   //   skip: !unionName,
//   // });

//   useEffect(() => {
//     const hostname = window.location.hostname;
//     const union = hostname.split(".")[0];
//     if (union !== "localhost") {
//       setUnionName(union);
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (data?.data) {
//       dispatch(
//         setUnionData({
//           unionInfo: data.data.uniouninfos,
//           sonodList: data.data.sonod_name_lists,
//         })
//       );
//     }
//   }, [data, dispatch]);

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <ScrollToTop>
//       <TopHeader />
//       <Header />
//       <Outlet />
//       <Footer />
//       <GoToTop />
//     </ScrollToTop>
//   );
// };

// export default MainLayout;

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
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";

const MainLayout = () => {
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const [unionName, setUnionName] = useState("uniontax");
  const [defaultColor, setDefaultColor] = useState("green");
  const navigate = useNavigate();

  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
  const { data, isLoading } = useUnionInfoQuery(
    { unionName, token },
    {
      skip: !unionName || !!unionInfo,
    }
  );

  useEffect(() => {
    const hostname = window.location.hostname;
    const union = hostname.split(".")[0];
    if (union !== "localhost") {
      setUnionName(union);
    }
  }, [navigate]);

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
      <GoToTop />
    </ScrollToTop>
  );
};

export default MainLayout;
