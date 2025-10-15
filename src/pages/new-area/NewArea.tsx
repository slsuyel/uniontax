import { Mail, MapPin, Phone } from "lucide-react";

const ContactCard = ({
  title,
  location,
  phone1,
  phone2,
  email,
  bgColor,
}: any) => (
  <div
    className={`p-4 p-md-5 rounded-4 shadow-sm border-top border-4 border-primary ${bgColor}`}
  >
    <h4 className="fw-bold mb-3 text-dark border-bottom pb-2">{title}</h4>

    <div className="d-flex flex-column gap-3">
      {/* Location */}
      <div className="d-flex align-items-start text-secondary">
        <MapPin className="text-primary me-2 mt-1 flex-shrink-0" />
        <p className="fw-semibold mb-0">{location}</p>
      </div>

      {/* Phone 1 */}
      <div className="d-flex align-items-center text-secondary">
        <Phone className="text-primary me-2 flex-shrink-0" />
        <p className="font-monospace mb-0">{phone1}</p>
      </div>

      {/* Phone 2 */}
      {phone2 && (
        <div className="d-flex align-items-center text-secondary">
          <Phone className="text-primary me-2 flex-shrink-0" />
          <p className="font-monospace mb-0">{phone2}</p>
        </div>
      )}

      {/* Email */}
      <div className="d-flex align-items-center text-secondary">
        <Mail className="text-primary me-2 flex-shrink-0" />
        <p className="font-monospace mb-0">{email}</p>
      </div>
    </div>
  </div>
);

const UnionRegistration = () => {
  return (
    <div className="container py-5">
      <div className="bg-white p-4 p-md-5 rounded-4 shadow border border-light">
        {/* Header */}
        <h3 className="text-center fw-bold text-primary mb-2">
          নতুন ইউনিয়ন রেজিস্ট্রেশনের জন্য
        </h3>
        <h1 className="text-center fw-bold text-dark mb-4 border-bottom border-3 border-primary pb-3">
          ইউনিয়ন/পৌরসভা প্রশাসনিক অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="text-center text-secondary mb-5 fs-5 fw-semibold">
          অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন। আমাদের টিম আপনাকে রেজিস্ট্রেশন
          প্রক্রিয়ায় সহায়তা করতে প্রস্তুত।
        </p>

        {/* Contact Sections */}
        <div className="row g-4 g-md-5">
          <div className="col-md-6">
            <ContactCard
              title="যোগাযোগের ঠিকানা "
              location="Debiganj, Panchagarh - 5020, Bangladesh"
              phone1="+880 1909-756552"
              phone2="+880 1713-760596"
              email="info@softwebsys.com"
              bgColor="bg-light"
            />
          </div>

          <div className="col-md-6">
            <ContactCard
              title="যোগাযোগের ঠিকানা (ঢাকা)"
              location="Road 20, Nikunjo-02, Khilkhet, Dhaka-1229, Bangladesh"
              phone1="+880 1722-597565"
              email="slsuyel@gmail.com"
              bgColor="bg-light"
            />
          </div>
        </div>

        {/* Email Button */}
        <div className="text-center mt-5">
          <a
            href="mailto:info@softwebsys.com"
            className="btn btn-success btn-lg px-5 shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
          >
            <Mail className="me-2" /> ইমেইল পাঠান
          </a>
        </div>
      </div>
    </div>
  );
};

export default UnionRegistration;
