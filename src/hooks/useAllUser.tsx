/* eslint-disable react-hooks/exhaustive-deps */
// import { callApi } from '@/utilities/functions';
// import { useQuery } from 'react-query';

// const useAllUser = (category = '', status = '') => {
//   async function fetchData() {
//     try {
//       const response = await callApi(
//         'GET',
//         `/api/all/users/list?category=${category}&status=${status}`
//       );
//       return response.data;
//     } catch (error) {
//       throw new Error('Error fetching user data');
//     }
//   }

//   const {
//     data = [],
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery(['data', category, status], fetchData);

//   return { data, isLoading, isError, refetch };
// };

// export default useAllUser;
import { useState, useEffect } from 'react';
import { callApi } from '@/utilities/functions';

const useAllUser = (category = '', status = '') => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await callApi(
        'GET',
        `/api/all/users/list?category=${category}&status=${status}`
      );
      setData(response.data);
    } catch (error) {
      setIsError(true);
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category, status]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, isError, refetch };
};

export default useAllUser;
