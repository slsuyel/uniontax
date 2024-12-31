import UnderConstruction from "@/components/reusable/UnderConstruction";

import UddoktaApplicationForm from "@/pages/UddoktaDashboard/UddoktaApplicationForm";
import UddoktaDashboardHome from "@/pages/UddoktaDashboard/UddoktaDashboardHome";

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
];
