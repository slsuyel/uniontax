import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAllServices from '@/hooks/useAllServices';
import { TService } from '@/types';

const useSelectedServices = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const serviceLink = pathname.substring(pathname.lastIndexOf('/') + 1);
  const services = useAllServices();

  const [selectedService, setSelectedService] = useState<TService>();

  useEffect(() => {
    const foundService = services.find(s => s.link === serviceLink);

    setSelectedService(foundService);
  }, [serviceLink, services]);

  return selectedService
    ? { title: selectedService.title, link: selectedService.link }
    : null;
};

export default useSelectedServices;
