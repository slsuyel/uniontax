import UnderConstruction from '@/components/reusable/UnderConstruction';
import Dhome from '@/pages/dashboard/Admin/Dhome';
import HoldingAdd from '@/pages/dashboard/holding/HoldingAdd';
import HoldingShow from '@/pages/dashboard/holding/HoldingShow';
import HoldingTax from '@/pages/dashboard/holding/HoldingTax';
import SingleHolding from '@/pages/dashboard/holding/SingleHolding';

import SonodFee from '@/pages/dashboard/SonodFee';
import EditSonod from '@/pages/dashboard/SonodManagement/EditSonod';
import SonodManagement from '@/pages/dashboard/SonodManagement/SonodManagement';
import UnionProfile from '@/pages/dashboard/UnionProfile';
import UnionReports from '@/pages/dashboard/UnionReports';

export const adminRoutes = [
  {
    path: '',
    element: <Dhome />,
  },
  {
    path: 'reports',
    element: <UnionReports />,
  },
  {
    path: 'union/profile',
    element: <UnionProfile />,
  },
  {
    path: 'holding/tax/',
    element: <HoldingTax />,
  },
  {
    path: '/dashboard/holding/tax/list/:word',
    element: <HoldingShow />,
  },
  {
    path: '/dashboard/holding/list/add/:word',
    element: <HoldingAdd />,
  },
  {
    path: '/dashboard/holding/list/view/:id',
    element: <SingleHolding />,
  },
  {
    path: 'sonod/fee',
    element: <SonodFee />,
  },
  {
    path: 'sonod/:sonodName/:condition',
    element: <SonodManagement />,
  },
  {
    path: 'sonod/:sonodName/action/edit/:id',
    element: <EditSonod />,
  },
  {
    path: 'settings',
    element: <UnderConstruction />,
  },
];
