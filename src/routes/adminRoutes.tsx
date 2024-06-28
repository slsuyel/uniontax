import UnderConstruction from '@/components/reusable/UnderConstruction';
import AllUsers from '@/pages/dashboard/AllUsers';
import Dhome from '@/pages/dashboard/Dhome';
import UserData from '@/pages/dashboard/UserData';
import UserTable from '@/pages/dashboard/UserTable';

export const adminRoutes = [
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
];
