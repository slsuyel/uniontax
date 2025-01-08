import UnderConstruction from "@/components/reusable/UnderConstruction";
import ProfilePage from "@/pages/auth/ProfilePage";

import UddoktaApplicationForm from "@/pages/UddoktaDashboard/UddoktaApplicationForm";
import UddoktaDashboardHome from "@/pages/UddoktaDashboard/UddoktaDashboardHome";
import UddoktaEnglishApplicationForm from "@/pages/UddoktaDashboard/UddoktaEnglishApplicationForm";

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
];
