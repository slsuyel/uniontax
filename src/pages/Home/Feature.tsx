const Feature = () => {
  return (
    <section className="features">
      <div className="container">
        <div className="section-content">
          <div className="features-text ">
            <img
              src="https://raw.githubusercontent.com/mustafadalga/foundation-website/master/assets/img/features-img.svg"
              alt=""
              className="features-text-img"
            />
            <h4 className="section-head-title feature-head-title">Features</h4>
            <h2 className="section-title">
              Empower Communities with Mustafiz Foundation
            </h2>
            <p className="section-desc">
              Send one-off and automated messages to engage supporters. Create
              better stories of impact.
            </p>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-head">
                  <img
                    src="https://raw.githubusercontent.com/mustafadalga/foundation-website/master/assets/img/features/compass.svg"
                    alt=""
                    className="feature-bg-img"
                  />
                  <h3>Reach New Supporters</h3>
                </div>
                <div className="feature-body">
                  <p>
                    Everything you need to start building – including
                    open-source code, documentation.
                  </p>
                  <div className="feature-sm-img">
                    <img
                      src="https://raw.githubusercontent.com/mustafadalga/foundation-website/master/assets/img/features/feature-1.png"
                      alt=""
                    />
                    <p>Expand your community outreach</p>
                  </div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-head">
                  <img
                    src="https://raw.githubusercontent.com/mustafadalga/foundation-website/master/assets/img/features/home.svg"
                    alt=""
                    className="feature-bg-img"
                  />
                  <h3>Engage Supporters</h3>
                </div>
                <div className="feature-body">
                  <p>
                    Everything you need to start building – including
                    open-source code, documentation.
                  </p>
                  <div className="feature-sm-img">
                    <img
                      src="https://raw.githubusercontent.com/mustafadalga/foundation-website/master/assets/img/features/feature-2.png"
                      alt=""
                    />
                    <p>Share impactful stories and updates</p>
                  </div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-head">
                  <img
                    src="https://raw.githubusercontent.com/mustafadalga/foundation-website/master/assets/img/features/server.svg"
                    alt=""
                    className="feature-bg-img"
                  />
                  <h3>Support Across Platforms</h3>
                </div>
                <div className="feature-body">
                  <p>
                    A beautifully simple system for tracking, prioritizing, and
                    solving community needs.
                  </p>
                  <div className="feature-sm-img">
                    <img
                      src="https://raw.githubusercontent.com/mustafadalga/foundation-website/master/assets/img/features/feature-3.png"
                      alt=""
                    />
                    <p>Provide seamless support to those in need</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="features-img">
            <img
              className="img-fluid"
              src="https://mustafiz.org/wp-content/uploads/2023/04/Donation.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
