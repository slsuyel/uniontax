import ReactDOM from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/features/store.ts";
import { HelmetProvider } from "react-helmet-async"; // Helmet import করো
import SiteMeta from "./components/SiteMeta.tsx"; // SiteMeta import করো


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <HelmetProvider>
 
      <SiteMeta />
        <RouterProvider router={router} />
    
    </HelmetProvider>
  </Provider>
);
