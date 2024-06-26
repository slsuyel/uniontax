import { Outlet } from 'react-router-dom';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import ScrollToTop from '@/utils/ScrollToTop';
import TopHeader from '../ui/TopHeader';

const MainLayout = () => {
  return (
    <ScrollToTop>
      <TopHeader />
      <Header />
      <Outlet />

      <Footer />
    </ScrollToTop>
  );
};

export default MainLayout;
