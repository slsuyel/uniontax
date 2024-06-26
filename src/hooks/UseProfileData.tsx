import { useState, useEffect } from 'react';
import { callApi } from '@/utilities/functions';
import { TypeDataForm } from '@/types';
import { useLocation } from 'react-router-dom';

const UseProfileData = () => {
  const location = useLocation();
  const [user, setUser] = useState<TypeDataForm | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        /* /api/user/check/login */
        const response = await callApi('POST', '/api/user/check/login', {
          token,
        });

        if (response.data.message === 'Token is valid') {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
      setLoading(false);
    };

    checkUserAuthentication();
  }, [location]);

  return { user, loading };
};

export default UseProfileData;
