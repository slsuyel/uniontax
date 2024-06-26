import HeroSlider from '@/components/ui/HeroSlider';
import RightSidebar from './RightSidebar';
import ServiceBox from '@/components/ui/ServiceBox';

const Home = () => {
  return (
    <div className="row mx-auto container my-3">
      <div className="col-md-9 ps-0">
        <HeroSlider />
        <ServiceBox />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Home;
