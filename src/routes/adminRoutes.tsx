import UnderConstruction from '@/components/reusable/UnderConstruction';
import Dhome from '@/pages/dashboard/Admin/Dhome';
import HoldingTax from '@/pages/dashboard/HoldingTax';
import SonodFee from '@/pages/dashboard/SonodFee';
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
    path: 'sonod/fee',
    element: <SonodFee />,
  },
  {
    path: 'sonod/:sonodName/:condition',
    element: <SonodManagement />,
  },
  {
    path: 'settings',
    element: <UnderConstruction />,
  },
];
