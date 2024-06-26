import logo from '../../assets/images/logo-icon.webp';
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content font_amazon">
        <div>
          <img src={logo} width={100} alt="" />
        </div>
        <h1 className="fs-1 fw-bold" style={{ color: '#f89509' }}>
          Mustafiz Foundation Inc.
        </h1>
        <h5 className="mt-3 text-muted">Frontiers for Humanity</h5>
      </div>
    </div>
  );
};

export default Loader;
