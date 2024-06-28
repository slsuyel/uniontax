import Breadcrumbs from '@/components/reusable/Breadcrumbs';
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  full_name: string;
  short_name_b: string;
  thana: string;
  district: string;
  c_name: string;
  c_email: string;
  u_code: string;
  u_description: string;
  u_notice: string;
  google_map: string;
  defaultColor: string;
  web_logo: File | null;
  sonod_logo: File | null;
  c_signture: File | null;
  socib_signture: File | null;
  u_image: File | null;
}
const UnionProfile = () => {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    short_name_b: '',
    thana: '',
    district: '',
    c_name: '',
    c_email: '',
    u_code: '',
    u_description: '',
    u_notice: '',
    google_map: '',
    defaultColor: '',
    web_logo: null,
    sonod_logo: null,
    c_signture: null,
    socib_signture: null,
    u_image: null,
  });

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value, type } = event.target;

    if (type === 'file') {
      const files = (event.target as HTMLInputElement).files;
      setFormData(prevData => ({
        ...prevData,
        [id]: files ? files[0] : null,
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formData);
  };

  return (
    <div>
      <Breadcrumbs current="ইউনিয়ন প্রোফাইল" />
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ইউনিয়নের পুরো নাম
                </label>{' '}
                <input
                  type="text"
                  id="full_name"
                  className="form-control"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ইউনিয়নের সংক্ষিপ্ত নাম (বাংলা)
                </label>{' '}
                <input
                  type="text"
                  id="short_name_b"
                  className="form-control"
                  value={formData.short_name_b}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  উপজেলা (বাংলা)
                </label>{' '}
                <input
                  type="text"
                  id="thana"
                  className="form-control"
                  value={formData.thana}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  জেলা (বাংলা)
                </label>{' '}
                <input
                  type="text"
                  id="district"
                  className="form-control"
                  value={formData.district}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  চেয়ারম্যানের নাম (বাংলা)
                </label>{' '}
                <input
                  type="text"
                  id="c_name"
                  className="form-control"
                  value={formData.c_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  চেয়ারম্যানের ইমেইল{' '}
                </label>{' '}
                <input
                  type="email"
                  id="c_email"
                  className="form-control"
                  value={formData.c_email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ইউনিয়নের কোড (English)
                </label>{' '}
                <input
                  type="text"
                  id="u_code"
                  className="form-control"
                  value={formData.u_code}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ইউনিয়নের বিবরন (বাংলা)
                </label>{' '}
                <textarea
                  id="u_description"
                  cols={30}
                  rows={6}
                  className="form-control"
                  style={{ resize: 'none', height: '120px' }}
                  value={formData.u_description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ইউনিয়নের নোটিশ (বাংলা)
                </label>{' '}
                <textarea
                  id="u_notice"
                  cols={30}
                  rows={6}
                  className="form-control"
                  style={{ resize: 'none', height: '120px' }}
                  value={formData.u_notice}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ইউনিয়নের ম্যাপ
                </label>{' '}
                <textarea
                  id="google_map"
                  cols={30}
                  rows={6}
                  className="form-control"
                  style={{ resize: 'none', height: '120px' }}
                  value={formData.google_map}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ওয়েবসাইট কালার
                </label>{' '}
                <input
                  style={{ height: 50 }}
                  type="color"
                  id="defaultColor"
                  className="form-control"
                  value={formData.defaultColor}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ওয়েবসাইট এর লোগো
                </label>{' '}
                <input
                  type="file"
                  id="web_logo"
                  className="form-control"
                  onChange={handleChange}
                />
                {formData.web_logo && (
                  <img
                    width={250}
                    alt="Web Logo"
                    className="img-thumbnail img-fluid"
                    src={URL.createObjectURL(formData.web_logo)}
                    style={{ marginTop: '10px' }}
                  />
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  সনদ এর লোগো
                </label>{' '}
                <input
                  type="file"
                  id="sonod_logo"
                  className="form-control"
                  onChange={handleChange}
                />
                {formData.sonod_logo && (
                  <img
                    width={250}
                    alt="Sonod Logo"
                    className="img-thumbnail img-fluid"
                    src={URL.createObjectURL(formData.sonod_logo)}
                    style={{ marginTop: '10px' }}
                  />
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  চেয়ারম্যানের স্বাক্ষর
                </label>{' '}
                <input
                  type="file"
                  id="c_signture"
                  className="form-control"
                  onChange={handleChange}
                />
                {formData.c_signture && (
                  <img
                    width={250}
                    alt="Chairman Signature"
                    className="img-thumbnail img-fluid"
                    src={URL.createObjectURL(formData.c_signture)}
                    style={{ marginTop: '10px' }}
                  />
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  সচিবের স্বাক্ষর
                </label>{' '}
                <input
                  type="file"
                  id="socib_signture"
                  className="form-control"
                  onChange={handleChange}
                />
                {formData.socib_signture && (
                  <img
                    width={250}
                    alt="Secretary Signature"
                    className="img-thumbnail img-fluid"
                    src={URL.createObjectURL(formData.socib_signture)}
                    style={{ marginTop: '10px' }}
                  />
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-form-label">
                  ইউনিয়নের ছবি
                </label>{' '}
                <input
                  type="file"
                  id="u_image"
                  className="form-control"
                  onChange={handleChange}
                />
                {formData.u_image && (
                  <img
                    width={250}
                    alt="Union Image"
                    className="img-thumbnail img-fluid"
                    src={URL.createObjectURL(formData.u_image)}
                    style={{ marginTop: '10px' }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className=" pt-4">
          <div className="">
            <button type="submit" className="btn btn-primary">
              সাবমিট
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UnionProfile;
