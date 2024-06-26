const Hire = () => {
  return (
    <section className="hire">
      <div className="container">
        <div className="section-content flex-column">
          <div className="hire-head">
            <h2 className="section-title">We’re hiring</h2>
            <p className="section-desc">
              We’re a team of lifelong learners. We’re equal parts left and
              right brained.
            </p>
            <a href="#" className="btn btn-hire">
              More about Company
            </a>
          </div>
          <div className="jobs-list">
            <a href="#" className="job-item active">
              <h4 className="job-title">Front-End Developer</h4>
              <span className="job-location">Los Angeles / Remote </span>
              <span className="job-arrow">&gt;</span>
            </a>
            <a href="#" className="job-item">
              <h4 className="job-title">Community Manager</h4>
              <span className="job-location">New York / Full-Time </span>
              <span className="job-arrow">&gt;</span>
            </a>
            <a href="#" className="job-item">
              <h4 className="job-title">UX/UI Designer</h4>
              <span className="job-location">Utah / Full-Time</span>
              <span className="job-arrow">&gt;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hire;
