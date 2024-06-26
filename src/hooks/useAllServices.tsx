import { TService } from '@/types';
import { useEffect, useState } from 'react';

const useAllServices = () => {
  const [services, setServices] = useState<TService[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/services.json');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return services;
};

export default useAllServices;
