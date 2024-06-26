import ReactDOM from 'react-dom/client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes.tsx';
import GoToTop from 'go-to-top-react/src/GoToTop.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    {/* <React.StrictMode> */}
    <RouterProvider router={router} />
    <GoToTop />
    {/* </React.StrictMode> */}
  </QueryClientProvider>
);
