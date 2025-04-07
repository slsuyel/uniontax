import RightSidebar from '../Home/RightSidebar';
import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";

const About = () => {


    const site_settings = useAppSelector((state: RootState) => state.union.site_settings);

  return (
    <div className="row mx-auto container my-3">
      <div className="mainBody col-md-9 ">
        <div className="services ">
          <div className="row mx-auto">
            <div className="col-md-12">
              <h6 className="defaltColor  position-relative ps-3 py-2 serviceTitle text-white mt-3">
              
              {site_settings?.about_title || ""}
              </h6>
            </div>{' '}
            <p style={{ padding: '2px 14px', textAlign: 'justify' }}>
            {site_settings?.about_text || ""}
            </p>{' '}
            <div className="col-md-12">
              <h6 className="defaltColor  position-relative ps-3 py-2 serviceTitle text-white">
              {site_settings?.history_title || ""}
              </h6>
            </div>{' '}
            <div className="col-md-12">
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 2,
                  color: 'rgb(0, 0, 0)',
                  textAlign: 'justify',
                }}
              >
                {site_settings?.history || ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      <RightSidebar />
    </div>
  );
};

export default About;
