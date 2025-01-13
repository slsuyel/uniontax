import UnderConstruction from "@/components/reusable/UnderConstruction";
import ProfilePage from "@/pages/auth/ProfilePage";
import Dhome from "@/pages/dashboard/Admin/Dhome";
import HoldingAdd from "@/pages/dashboard/holding/HoldingAdd";
import HoldingShow from "@/pages/dashboard/holding/HoldingShow";
import HoldingTax from "@/pages/dashboard/holding/HoldingTax";
import HoldingTaxEdit from "@/pages/dashboard/holding/HoldingTaxEdit";
import SingleHolding from "@/pages/dashboard/holding/SingleHolding";
import PaymentFailed from "@/pages/dashboard/PaymentFailed";

import SonodFee from "@/pages/dashboard/SonodFee";
import EditSonod from "@/pages/dashboard/SonodManagement/EditSonod";
import EnglishEditSonod from "@/pages/dashboard/SonodManagement/EnglishEditSonod";
import SonodManagement from "@/pages/dashboard/SonodManagement/SonodManagement";
import UnionProfile from "@/pages/dashboard/UnionProfile";
import UnionReports from "@/pages/dashboard/UnionReports";

export const adminRoutes = [
  {
    path: "",
    element: <Dhome />,
  },
  {
    path: "reports",
    element: <UnionReports />,
  },
  {
    path: "union/profile",
    element: <UnionProfile />,
  },
  {
    path: "holding/tax/",
    element: <HoldingTax />,
  },
  {
    path: "payment-failed",
    element: <PaymentFailed />,
  },
  {
    path: "/dashboard/holding/tax/list/:word",
    element: <HoldingShow />,
  },
  {
    path: "/dashboard/holding/list/add/:word",
    element: <HoldingAdd />,
  },
  {
    path: "/dashboard/holding/list/edit/:id",
    element: <HoldingTaxEdit />,
  },
  {
    path: "/dashboard/holding/list/view/:id",
    element: <SingleHolding />,
  },
  {
    path: "sonod/fee",
    element: <SonodFee />,
  },
  {
    path: "sonod/:sonodName/:condition",
    element: <SonodManagement />,
  },
  {
    path: "sonod/:sonodName/action/edit/:id",
    element: <EditSonod />,
  },
  {
    path: "sonod/:sonodName/action/edit-english/:id",
    element: <EnglishEditSonod />,
  },
  {
    path: "settings",
    element: <UnderConstruction />,
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
];
