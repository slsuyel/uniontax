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

import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./adminRoutes";
import AuthProvider from "@/Providers/AuthProvider";
import PaymentSuccessPage from "@/pages/payment/PaymentSuccessPage";
import SingleHoldingPublic from "@/pages/Holding/SingleHoldingPublic";
import EnglishApplicationForm from "@/pages/EnglishApplicationForm/EnglishApplicationForm";
import UddoktaLayout from "./../components/layouts/uddokta/UddoktaLayout";
import { uddoktaRoutes } from "./uddoktaRoutes";
import UddoktaAuthProvider from "@/Providers/UddoktaAuthProvider";
import SonodSearchById from "@/pages/SonodSearch/SonodSearchById";
import SonodDetails from "@/pages/About/SonodDetails";

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

      /* application */
      {
        path: "/application/:service",
        element: <ApplicationForm />,
      },
      {
        path: "/application-english/:service",
        element: <EnglishApplicationForm />,
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
