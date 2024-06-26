import Loader from '@/components/reusable/Loader';
import { callApi } from '@/utilities/functions';
import { ReactNode, useEffect, useState } from 'react';

import { Navigate } from 'react-router';

const UserCheck = ({ children }: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUserAuthentication = async () => {
      const token = localStorage.getItem('token')!;

      if (!token) {
        setAuthenticated(false);
        setLoading(false);
        <Navigate to="/login" />;
        return;
      }
      try {
        const response = await callApi('POST', '/api/user/check-token', {
          token,
        });

        if (response.data.message == 'Token is valid') {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        setAuthenticated(false);
      }
      setLoading(false);
    };

    checkUserAuthentication();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return authenticated ? children : <Navigate to="/login" />;
};

export default UserCheck;
