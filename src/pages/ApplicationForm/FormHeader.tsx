import useAllServices from '@/hooks/useAllServices';
import { useLocation } from 'react-router-dom';

const FormHeader = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const service = pathname.substring(pathname.lastIndexOf('/') + 1);
  const services = useAllServices();

  const selectedService = services.filter(s => s.link === service);
  return (
    <div
      className="panel-heading"
      style={{
        fontWeight: 'bold',
        fontSize: '20px',
        background: 'rgb(21, 149, 19)',
        textAlign: 'center',
        color: 'white',
      }}
    >
      {selectedService[0]?.title || ''}
    </div>
  );
};

export default FormHeader;
