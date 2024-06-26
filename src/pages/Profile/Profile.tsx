import { message, notification } from 'antd';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DocUpdate from './DocUpdate/DocUpdate';
import { callApi } from '@/utilities/functions';
import UseProfileData from '@/hooks/UseProfileData';
import Loader from '@/components/reusable/Loader';

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading } = UseProfileData();
  const handleLogoutClick = async () => {
    try {
      const res = await callApi('Post', '/api/user/logout');

      if (res.status == 200) {
        localStorage.removeItem('token');
        message.success('Logged out successfully');
        window.location.replace('/');
      } else message.error('Error occurred during logout');
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };

  useEffect(() => {
    notification.open({
      message: 'Important Notification',
      description: (
        <span className="text-danger">
          Please fill out all the required information in your profile and
          submit it. This is necessary to complete the process.
        </span>
      ),
      icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
    });
  }, []);
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    navigate('/login');
    return null;
  }
  return (
    <div style={{ background: '#f4f5f7' }}>
      <div className="student-profile py-4">
        <div className="container">
          <div className="row mx-auto">
            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-header bg-transparent text-center">
                  <img
                    className="profile_img"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFLHz0vltSz4jyrQ5SmjyKiVAF-xjpuoHcCw&s"
                    alt=""
                  />
                  <h3>{user.name}</h3>
                  <button
                    className="btn btn-outline-success fw-bold mb-2"
                    disabled
                  >
                    Status : {user.status}
                  </button>
                </div>

                <div className="d-flex gap-4 justify-content-center my-4">
                  <Link
                    to={`/edit-profile/${user.id}`}
                    className="btn btn-outline-primary"
                  >
                    <span>
                      <i className="fas fa-user-edit"></i> Update Profile
                    </span>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={handleLogoutClick}
                  >
                    <span>
                      <i className="fas fa-sign-out-alt"></i> Log Out
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-header bg-transparent border-0">
                  <h3 className="mb-0">
                    <i className="far fa-clone pe-1" />
                    General Information
                  </h3>
                </div>
                <div className="card-body pt-0">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>Date of Birth</th>
                        <td width="2%">:</td>
                        <td>{user.dob}</td>
                      </tr>
                      <tr>
                        <th>Gender</th>
                        <td width="2%">:</td>
                        <td>{user.gender}</td>
                      </tr>
                      <tr>
                        <th>Nationality</th>
                        <td width="2%">:</td>
                        <td>{user.nationality}</td>
                      </tr>
                      <tr>
                        <th>Phone Number</th>
                        <td width="2%">:</td>
                        <td>{user.phone}</td>
                      </tr>
                      <tr>
                        <th>Email Address</th>
                        <td width="2%">:</td>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <th>Address Details</th>
                        <td width="2%">:</td>
                        <td>{user.current_address}</td>
                      </tr>
                      <tr>
                        <th>Educational Background</th>
                        <td width="2%">:</td>
                        <td>{user.highest_education}</td>
                      </tr>
                      <tr>
                        <th>Family Information</th>
                        <td width="2%">:</td>
                        <td>
                          {user.father_name},{user.mother_name}
                        </td>
                      </tr>
                      <tr>
                        <th>Current Situation</th>
                        <td width="2%">:</td>
                        <td>{user.situation}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <hr className="mt-4" />
            <DocUpdate />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
