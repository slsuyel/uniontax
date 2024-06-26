import { callApi } from '@/utilities/functions';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface UserData {
  [key: string]: string;
}

const UserData = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<UserData>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await callApi('get', `/api/admin/get/user/${id}`);
        setUserData(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  console.log(userData);

  return (
    <div className="font_amazon">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table">
          <tbody className="text-capitalize row mx-auto">
            {Object.entries(userData).map(
              (
                [key, value]: [string, string] // Specify types here
              ) => (
                <tr key={key} className="col-md-6 row mx-auto ">
                  <th className="fs-4 col-md-6 px-3 my-2">
                    {key.replace(/_/g, ' ')}
                  </th>

                  <td className="col-md-6 px-3 my-2 ">{value}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserData;
