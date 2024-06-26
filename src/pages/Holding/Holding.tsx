import { useState } from 'react';
import RightSidebar from '../Home/RightSidebar';

const Holding = () => {
  const fakeDbEntries = [
    {
      holdingNumber: '12345',
      name: 'John Doe',
      idNumber: 'ABC123',
      mobileNumber: '9876543210',
      moreInfo: 'Lorem ipsum dolor sit amet',
    },
    // Add more entries if needed
  ];

  const [formData, setFormData] = useState('');

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="row mx-auto container my-3">
      <div className="mainBody col-md-9 mt-3">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="d-flex">
              <input
                type="text"
                id="userdata"
                placeholder="এখানে আপনার হোল্ডিং নং/নাম/জাতীয় পরিচয় পত্র নম্বর/মোবাইল নম্বর (যে কোন একটি তথ্য) এন্ট্রি করুন"
                required
                className="form-control"
                value={formData}
                onChange={e => setFormData(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group text-center">
            <button type="submit" className="border-1 btn_main mb-3 mt-2">
              খুঁজুন
            </button>
          </div>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>হোল্ডিং নাম্বার</th>
              <th>নাম</th>
              <th>এন আইডি নাম্বার</th>
              <th>মোবাইল নাম্বার</th>
              <th>আরও তথ্য</th>
            </tr>
          </thead>
          <tbody>
            {fakeDbEntries.map((item, index) => (
              <tr key={index}>
                <td>{item.holdingNumber}</td>
                <td>{item.name}</td>
                <td>{item.idNumber}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.moreInfo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Holding;
