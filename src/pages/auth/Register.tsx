import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, message, Select } from 'antd';
import logo from '../../assets/images/logo-icon.webp';
import { callApi } from '@/utilities/functions';
import { Spinner } from 'react-bootstrap';
import useLoggedIn from '@/hooks/useLoggedIn';
import Loader from '@/components/reusable/Loader';

const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [category, setCategory] = useState('Student');
  const { authenticated, loading } = useLoggedIn();
  const [otpSend, setOtpSend] = useState(false);
  const [otp, setOtp] = useState<number | undefined>(undefined);

  const [mailVerified, setMailVerified] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoader(true);
    event.preventDefault();

    if (password !== confirmPassword) {
      message.error('Passwords do not match!');
      setLoader(false);
      return;
    }

    const data = { name, email, password, mobile: '01722597565', category };
    const res = await callApi('Post', '/api/user/register', data);

    if (res.status === 400 && res.data && res.data.errors) {
      if (res.data.errors.email) {
        message.error(res.data.errors.email[0]);
      } else {
        message.error('Something went wrong!');
      }
    } else if (res.status === 201) {
      message.success('Wow !! Sign up successfully , Login now');
      navigate('/login');
    } else {
      message.error('Something went wrong!');
    }

    setLoader(false);
  };

  if (loading) {
    return <Loader />;
  }

  const handleSendOtp = async (mail: string) => {
    setLoader(true);
    if (!name || !email) {
      message.error('Enter name and Email');
      setLoader(false);
      return;
    }
    const res = await callApi('Post', '/api/send-otp', { email: mail });
    if (res.status == 200) {
      setLoader(false);
      setOtpSend(true);
      message.success('OTP sent to your email');
    } else {
      setLoader(false);
      message.error('OTP sent Failed.');
    }
  };
  const handleOtpVerify = async (mail: string, otp: number) => {
    setLoader(true);
    if (!otp || !email) {
      message.error('Enter OTP');
      setLoader(false);
      return;
    }

    const res = await callApi('Post', '/api/verify-otp', { email: mail, otp });
    console.log(res);
    if (res.status == 200) {
      setLoader(false);
      setOtpSend(true);
      message.success('OTP verified successfully.');
      setMailVerified(true);
    } else {
      setLoader(false);
      message.error(res.data.error || 'OTP verified failed.');
    }
  };

  return (
    <>
      {!authenticated ? (
        <div
          className="row mx-auto py-5 bg-second"
          style={{ background: '#f4f5f7' }}
        >
          <div className="col-md-4 mx-auto my-3">
            <div className="p-3 my-5 w-100 mx-auto border-0 rounded shadow py-5">
              <div className="align-items-center d-flex gap-3 my-4 justify-content-center font_amazon">
                <img src={logo} alt="Logo" width={50} />
                <div>
                  <h2 className="fs-1 fw-bold" style={{ color: '#f89509' }}>
                    Mustafiz Foundation Inc.
                  </h2>
                  <h5>Frontiers for Humanity</h5>
                </div>
              </div>
              <h1 className="bg-white mx-3 my-4 opacity-75 rounded text-center text-secondary-emphasis font_amazon">
                Sign up Mustafiz Foundation{' '}
              </h1>
              <form onSubmit={handleSubmit} className="px-3">
                <div className={`${mailVerified && 'd-none'}`}>
                  <div className="form-group mb-2">
                    <label
                      className="fs-3 my-1 text-secondary"
                      htmlFor="registerName"
                    >
                      Name
                    </label>
                    <Input
                      required
                      id="registerName"
                      placeholder="Enter Name"
                      style={{ height: 45 }}
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label
                      className="fs-3 my-1 text-secondary"
                      htmlFor="registerEmail"
                    >
                      Email
                    </label>
                    <Input
                      required
                      id="registerEmail"
                      placeholder="Enter Email"
                      style={{ height: 45 }}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />

                    <div className="mt-3 text-end">
                      {otpSend ? (
                        <>
                          <Input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp === undefined ? '' : otp.toString()}
                            onChange={e => {
                              const value = parseInt(e.target.value);
                              setOtp(isNaN(value) ? undefined : value);
                            }}
                          />
                          <Button
                            className="mt-2"
                            onClick={() =>
                              handleOtpVerify(email, otp as number)
                            }
                            disabled={loader}
                          >
                            {loader ? 'Please wait' : ' Verify Now'}
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => handleSendOtp(email)}
                          disabled={loader}
                        >
                          {loader ? 'Sending OTP' : ' Send OTP '}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {mailVerified && (
                  <>
                    <div className="form-group mb-2">
                      <label
                        className="fs-3 my-1 text-secondary"
                        htmlFor="category"
                      >
                        Category
                      </label>
                      <Select
                        style={{ height: 45, width: '100%' }}
                        id="category"
                        placeholder="Select Category"
                        value={category}
                        onChange={value => setCategory(value)}
                      >
                        <Option value="student">Student</Option>
                        <Option value="senior">Senior</Option>
                        <Option value="disable">Disable</Option>
                        <Option value="orphan">Orphan</Option>
                        <Option value="homeless">Homeless</Option>
                        <Option value="refugee">Refugee</Option>
                        <Option value="other">Other</Option>
                      </Select>
                    </div>
                    <div className="form-group mb-2">
                      <label
                        className="fs-3 my-1 text-secondary"
                        htmlFor="registerPassword"
                      >
                        Password
                      </label>
                      <Input.Password
                        required
                        id="registerPassword"
                        placeholder="Enter Password"
                        style={{ height: 45 }}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label
                        className="fs-3 my-1 text-secondary"
                        htmlFor="confirmPassword"
                      >
                        Retype Password
                      </label>
                      <Input.Password
                        required
                        id="confirmPassword"
                        placeholder="Retype Password"
                        style={{ height: 45 }}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <button
                        disabled={loader}
                        type="submit"
                        className={`primary_btn py-3 rounded w-100 `}
                      >
                        {loader ? <Spinner /> : 'Register'}
                      </button>
                    </div>
                  </>
                )}
              </form>
              <hr />
              <div className="text-center fs-2">
                Already have an account?{' '}
                <Link className="text-primary" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        navigate('/profile')
      )}
    </>
  );
};

export default Register;
