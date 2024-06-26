import MainLayout from '@/components/layouts/MainLayout';
import AdminLayout from '@/components/layouts/admin/AdminLayout';
import ErrorPage from '@/components/reusable/ErrorPage';
import UnderConstruction from '@/components/reusable/UnderConstruction';
import AdminCheck from '@/hooks/AdminCheck';

import UserCheck from '@/hooks/UserCheck';

import Home from '@/pages/Home/Home';

import EditProfile from '@/pages/Profile/EditProfile';
import Profile from '@/pages/Profile/Profile';

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
        path: '/profile',
        element: (
          <UserCheck>
            <Profile />
          </UserCheck>
        ),
      },
      {
        path: '/edit-profile/:id',
        element: (
          <UserCheck>
            <EditProfile />
          </UserCheck>
        ),
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
