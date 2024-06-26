import Loader from '@/components/reusable/Loader';
import { callApi } from '@/utilities/functions';
import { ReactNode, useEffect, useState } from 'react';

import { Navigate } from 'react-router';

const AdminCheck = ({ children }: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAdminAuthentication = async () => {
      const token = localStorage.getItem('token')!;

      if (!token) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const response = await callApi('POST', '/api/admin/check-token');
        console.log(response);
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

    checkAdminAuthentication();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return authenticated ? children : <Navigate to="/admin-login" />;
};

export default AdminCheck;
