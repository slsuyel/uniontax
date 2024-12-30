import ApplicationForm from "@/pages/ApplicationForm/ApplicationForm";
import UddoktaDashboardHome from "@/pages/UddoktaDashboard/UddoktaDashboardHome";

export const uddoktaRoutes = [
  {
    path: "",
    element: <UddoktaDashboardHome />,
  },
  {
    path: "application/:service",
    element: <ApplicationForm />,
  },
];
