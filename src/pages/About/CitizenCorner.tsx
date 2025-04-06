import RightSidebar from '../Home/RightSidebar';
import CitizenSearch from '../../components/CitizenSearch'; 

const CitizenCorner = () => {
  return (
    <div className="row mx-auto container my-3">
      <div className="col-md-9">       <CitizenSearch /></div>
      <RightSidebar />
    </div>
  );
};

export default CitizenCorner;
