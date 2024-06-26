const About = () => {
  return (
    <>
      <section className="what-about">
        <div className="container">
          <div className="section-content">
            <div className="what-about-item">
              <h4>Who We Are ?</h4>
              <p>
                It's inspiring to see MFI's dedication to innovation and
                community empowerment, especially in supporting distressed
                children worldwide. Collaborating with other organizations to
                fill gaps in support is crucial for creating meaningful change.
                Keep up the impactful work!
              </p>
            </div>
            <div className="what-about-item">
              <h4>What is our Goal ?</h4>
              <p>
                Our goal at MFI is simple: empower communities with innovation
                for a better world. We stand with distressed populations,
                especially children, working tirelessly to create lasting
                impact. Join us in building a brighter future.
              </p>
            </div>
          </div>
        </div>
      </section>{' '}
      <section className="organizations">
        <div className="container">
          <div className="section-content">
            <div className="organization">
              <img
                src="https://raw.githubusercontent.com/mustafadalga/foundation-website/master/assets/img/organizations/newyork-times.svg"
                alt=""
                className="organization-logo"
              />
            </div>
            <div className="organization">
              <img
                src="https://raw.githubusercontent.com/mustafadalga/foundation-website/master/assets/img/organizations/forbes.svg"
                alt=""
                className="organization-logo"
              />
            </div>
            <div className="organization">
              <img
                src="https://raw.githubusercontent.com/mustafadalga/foundation-website/master/assets/img/organizations/apple.svg"
                alt=""
                className="organization-logo"
              />
            </div>
            <div className="organization">
              <img
                src="https://raw.githubusercontent.com/mustafadalga/foundation-website/master/assets/img/organizations/mashable.svg"
                alt=""
                className="organization-logo"
              />
            </div>
            <div className="organization">
              <img
                src="https://raw.githubusercontent.com/mustafadalga/foundation-website/master/assets/img/organizations/wsj.svg"
                alt=""
                className="organization-logo"
              />
            </div>
            <div className="organization">
              <img
                src="https://raw.githubusercontent.com/mustafadalga/foundation-website/master/assets/img/organizations/google.svg"
                alt=""
                className="organization-logo"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
