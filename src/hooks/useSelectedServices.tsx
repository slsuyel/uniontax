import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useAllServices from '@/hooks/useAllServices';
import { TService } from '@/types';

const useSelectedServices = () => {
  const { sonodName } = useParams();
  const location = useLocation();
  const pathname = location.pathname;
  const isDashboard = pathname.includes('dashboard');

  const serviceLink = pathname.substring(pathname.lastIndexOf('/') + 1);
  const services = useAllServices();

  const [selectedService, setSelectedService] = useState<
    TService | undefined
  >();

  useEffect(() => {
    const foundService = services.find(s =>
      isDashboard ? s.link === sonodName : s.link === serviceLink
    );
    setSelectedService(foundService);
  }, [serviceLink, sonodName, services, isDashboard]);

  return selectedService
    ? { title: selectedService.title, link: selectedService.link }
    : null;
};

export default useSelectedServices;
