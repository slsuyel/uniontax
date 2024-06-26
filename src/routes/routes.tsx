import MainLayout from '@/components/layouts/MainLayout';
import AdminLayout from '@/components/layouts/admin/AdminLayout';
import ErrorPage from '@/components/reusable/ErrorPage';
import UnderConstruction from '@/components/reusable/UnderConstruction';
import AdminCheck from '@/hooks/AdminCheck';
import About from '@/pages/About/About';
import CitizenCorner from '@/pages/About/CitizenCorner';
import ApplicationForm from '@/pages/ApplicationForm/ApplicationForm';
import Contact from '@/pages/Contact/Contact';
import Holding from '@/pages/Holding/Holding';

import Home from '@/pages/Home/Home';
import Notice from '@/pages/Notice/Notice';
import SonodSearch from '@/pages/SonodSearch/SonodSearch';
import Tenders from '@/pages/Tenders/Tenders';
import Login from '@/pages/auth/Login';
import ResetPassword from '@/pages/auth/ResetPassword';

import AllUsers from '@/pages/dashboard/AllUsers';
import Dhome from '@/pages/dashboard/Dhome';
import UserData from '@/pages/dashboard/UserData';
import UserTable from '@/pages/dashboard/UserTable';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/sonod/search',
        element: <SonodSearch />,
      },
      {
        path: '/notice',
        element: <Notice />,
      },
      {
        path: '/tenders',
        element: <Tenders />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/holding/tax',
        element: <Holding />,
      },
      {
        path: '/citizens_corner',
        element: <CitizenCorner />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/reset-pass',
        element: <ResetPassword />,
      },

      /* application */
      {
        path: '/application/:service',
        element: <ApplicationForm />,
      },
    ],
  },

  {
    path: 'admin',
    element: (
      <AdminCheck>
        <AdminLayout />
      </AdminCheck>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Dhome />,
      },
      {
        path: 'all-users',
        element: <AllUsers />,
      },

      {
        path: ':category/:status',
        element: <UserTable />,
      },
      {
        path: 'user/:id',
        element: <UserData />,
      },
      {
        path: 'settings',
        element: <UnderConstruction />,
      },
    ],
  },
]);

export default router;
