import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input, Checkbox, message } from 'antd';

import { callApi } from '@/utilities/functions';
import { Spinner } from 'react-bootstrap';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const from =
    (location.state && location.state.from && location.state.from.pathname) ||
    '/admin';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await callApi('POST', '/api/admin/login', {
        email: username,
        password,
      });
      if (res.status == 200) {
        localStorage.setItem('token', res.data.token);

        message.success('Login successfully!');
        navigate(from, { replace: true });
      } else {
        message.error('Login failed');
        console.log('Login failed: Token missing in the response.');
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{ background: '#f4f5f7', marginTop: 'auto', minHeight: '80vh' }}
        className="py-5"
      >
        <div className="row mx-auto py-5 ">
          <div className="col-md-4 mx-auto my-3">
            <div className="p-3 w-100 mx-auto border-0 rounded shadow py-5">
              <form onSubmit={handleSubmit} className="px-3">
                <div className="form-group mb-2">
                  <label
                    className="fs-3 my-1 text-secondary"
                    htmlFor="loginUsername"
                  >
                    Email
                  </label>
                  <Input
                    id="loginUsername"
                    placeholder="Enter Your Email"
                    style={{ height: 45 }}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label
                    className="fs-3 my-1 text-secondary"
                    htmlFor="loginPassword"
                  >
                    Password
                  </label>
                  <Input.Password
                    id="loginPassword"
                    placeholder="Enter Password"
                    style={{ height: 45 }}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div className="form-group ">
                    <Checkbox id="rememberMe" className="text-color">
                      Remember me
                    </Checkbox>
                  </div>
                  <div>
                    <Link className="fs-4" to={'/reset-pass'}>
                      {' '}
                      Reset password
                    </Link>
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="primary_btn py-3 rounded w-100"
                    disabled={loading}
                  >
                    {loading ? <Spinner /> : 'Admin Login'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
