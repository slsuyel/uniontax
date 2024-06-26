import { Spin } from 'antd';

const Loader = () => {
  return (
    <div
      className="container"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Spin size="large" />
      <h1 style={{ marginLeft: '20px' }}>Loading...</h1>
    </div>
  );
};

export default Loader;
