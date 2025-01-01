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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
