import UnderConstruction from "@/components/reusable/UnderConstruction";
import ProfilePage from "@/pages/auth/ProfilePage";



import UddoktaApplicationForm from "@/pages/UddoktaDashboard/UddoktaApplicationForm";
import UddoktaDashboardHome from "@/pages/UddoktaDashboard/UddoktaDashboardHome";
import UddoktaEnglishApplicationForm from "@/pages/UddoktaDashboard/UddoktaEnglishApplicationForm";
import HoldingAdd from "@/pages/UddoktaDashboard/uddoktaHolding/HoldingAdd";
import HoldingShow from "@/pages/UddoktaDashboard/uddoktaHolding/HoldingShow";
import HoldingTax from "@/pages/UddoktaDashboard/uddoktaHolding/HoldingTax";
import HoldingTaxEdit from "@/pages/UddoktaDashboard/uddoktaHolding/HoldingTaxEdit";
import SingleHolding from "@/pages/UddoktaDashboard/uddoktaHolding/SingleHolding";

export const uddoktaRoutes = [
  {
    path: "",
    element: <UddoktaDashboardHome />,
  },
  {
    path: "application/:service",
    element: <UddoktaApplicationForm />,
  },
  {
    path: "settings",
    element: <UnderConstruction />,
  },
  {
    path: "application-english/:service",
    element: <UddoktaEnglishApplicationForm />,
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
  {
    path: "holding/tax/",
    element: <HoldingTax />,
  },
  {
    path: "holding/tax/list/:word",
    element: <HoldingShow />,
  },
  {
    path: "holding/list/add/:word",
    element: <HoldingAdd />,
  },
  {
    path: "holding/list/edit/:id",
    element: <HoldingTaxEdit />,
  },
  {
    path: "holding/list/view/:id",
    element: <SingleHolding />,
  },
];
