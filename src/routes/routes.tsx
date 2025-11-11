import MainLayout from "@/components/layouts/MainLayout";
import AdminLayout from "@/components/layouts/admin/AdminLayout";
import ErrorPage from "@/components/reusable/ErrorPage";

import About from "@/pages/About/About";
import CitizenCorner from "@/pages/About/CitizenCorner";
import ApplicationForm from "@/pages/ApplicationForm/ApplicationForm";
import Contact from "@/pages/Contact/Contact";
import Holding from "@/pages/Holding/Holding";

import Home from "@/pages/Home/Home";
import Notice from "@/pages/Notice/Notice";
import SonodSearch from "@/pages/SonodSearch/SonodSearch";
import Tenders from "@/pages/Tenders/Tenders";
import Login from "@/pages/auth/Login";
import ResetPassword from "@/pages/auth/ResetPassword";

import AuthProvider from "@/Providers/AuthProvider";
import UddoktaAuthProvider from "@/Providers/UddoktaAuthProvider";
import SonodDetails from "@/pages/About/SonodDetails";
import AutoBikeRegistration from "@/pages/AutoBikeRegistration/AutoBikeRegistration";
import EnglishApplicationForm from "@/pages/EnglishApplicationForm/EnglishApplicationForm";
import SingleHoldingPublic from "@/pages/Holding/SingleHoldingPublic";
import SonodSearchById from "@/pages/SonodSearch/SonodSearchById";
import ScheduleTender from "@/pages/Tenders/ScheduleTender";
import SingleTender from "@/pages/Tenders/SingleTender";
import UnionRegistration from "@/pages/new-area/NewArea";
import PaymentSuccessPage from "@/pages/payment/PaymentSuccessPage";
import { createBrowserRouter } from "react-router-dom";
import UddoktaLayout from "./../components/layouts/uddokta/UddoktaLayout";
import { adminRoutes } from "./adminRoutes";
import { uddoktaRoutes } from "./uddoktaRoutes";
import Supports from "@/pages/Supports/Supports";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/sonod/search",
        element: <SonodSearch />,
      },
      {
        path: "/verification/sonod/:id",
        element: <SonodSearchById />,
      },

      {
        path: "/notice",
        element: <Notice />,
      },
      {
        path: "/tenders",
        element: <Tenders />,
      },
      {
        path: "/tender/:id",
        element: <SingleTender />,
      },
      {
        path: "/schedule-tenders/:id",
        element: <ScheduleTender />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/holding/tax",
        element: <Holding />,
      },
      {
        path: "/holding/list/view/:id",
        element: <SingleHoldingPublic />,
      },
      {
        path: "/citizens_corner",
        element: <CitizenCorner />,
      },
      {
        path: "/sonod-details/:id",
        element: <SonodDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/reset-pass",
        element: <ResetPassword />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccessPage />,
      },
      {
        path: "/payment-cancel",
        element: <PaymentSuccessPage />,
      },
      {
        path: "/auto-bike-registration",
        element: <AutoBikeRegistration />,
      },

      /* application */
      {
        path: "/application/:service",
        element: <ApplicationForm />,
      },
      {
        path: "/application-english/:service",
        element: <EnglishApplicationForm />,
      },
      {
        path: "/new-area",
        element: <UnionRegistration />,
      },
      {
        path: "/supports",
        element: <Supports />,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <AuthProvider>
        <AdminLayout />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: adminRoutes,
  },
  {
    path: "uddokta",
    element: (
      <UddoktaAuthProvider>
        <UddoktaLayout />
      </UddoktaAuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: uddoktaRoutes,
  },
]);

export default router;
