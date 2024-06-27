import { useState } from 'react';
import RightSidebar from '../Home/RightSidebar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    message: '',
  });

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(formData); // Log the form data when submitted
    // You can add further logic here to handle form submission, like sending data to a server
  };

  const handleInputChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="row container mx-auto my-3">
      <div className="mainBody col-md-9 ">
        <div id="contact-form" className="contact-form">
          <h1 className="contact-form_title">যোগাযোগ</h1>
          <div className="separator" />
          <form className="form" onSubmit={handleFormSubmit}>
            <div className="form-group my-2">
              <label className="defaltTextColor">নাম</label>
              <input
                name="name"
                placeholder="নাম"
                type="text"
                autoComplete="off"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group my-2">
              <label className="defaltTextColor">বিষয়</label>
              <select
                name="subject"
                className="form-control"
                value={formData.subject}
                onChange={handleInputChange}
              >
                <option>চিহ্নিত করুন</option>
                <option value="নাগরিকত্ব সনদ">নাগরিকত্ব সনদ</option>
                <option value="ট্রেড লাইসেন্স">ট্রেড লাইসেন্স</option>
                <option value="ওয়ারিশান সনদ">ওয়ারিশান সনদ</option>
                <option value="উত্তরাধিকারী সনদ">উত্তরাধিকারী সনদ</option>
                <option value="বিবিধ প্রত্যয়নপত্র">বিবিধ প্রত্যয়নপত্র</option>
                <option value="চারিত্রিক সনদ">চারিত্রিক সনদ</option>
                <option value="ভূমিহীন সনদ">ভূমিহীন সনদ</option>
                <option value="পারিবারিক সনদ">পারিবারিক সনদ</option>
                <option value="অবিবাহিত সনদ">অবিবাহিত সনদ</option>
                <option value="পুনঃ বিবাহ না হওয়া সনদ">
                  পুনঃ বিবাহ না হওয়া সনদ
                </option>
                <option value="বার্ষিক আয়ের প্রত্যয়ন">
                  বার্ষিক আয়ের প্রত্যয়ন
                </option>
                <option value="একই নামের প্রত্যয়ন">একই নামের প্রত্যয়ন</option>
                <option value="প্রতিবন্ধী সনদপত্র">প্রতিবন্ধী সনদপত্র</option>
                <option value="অনাপত্তি সনদপত্র">অনাপত্তি সনদপত্র</option>
                <option value="আর্থিক অস্বচ্ছলতার সনদপত্র">
                  আর্থিক অস্বচ্ছলতার সনদপত্র
                </option>
              </select>
            </div>
            <div className="form-group my-2">
              <label className="defaltTextColor">ইমেইল</label>
              <input
                name="email"
                placeholder="ইমেইল"
                type="email"
                autoComplete="off"
                className="form-control"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group my-2">
              <label className="defaltTextColor">মেসেজ</label>
              <textarea
                name="message"
                rows={4}
                placeholder="মেসেজ"
                className="form-control"
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="border-1 btn_main mt-2 w-100">
              সেন্ড করুন
            </button>
          </form>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Contact;
