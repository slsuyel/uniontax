/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Breadcrumbs from '@/components/reusable/Breadcrumbs';

const UnionReports = () => {
  const [formData, setFormData] = useState({
    sonod: '',
    paymentType: '',
    fromDate: '',
    toDate: '',
  });

  const handleInputChange = (event: { target: { id: any; value: any } }) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log('ফর্ম ডেটা:', formData);
  };

  return (
    <div>
      <Breadcrumbs paths={[{ name: '', link: 'report' }]} current="প্রতিবেদন" />

      <form onSubmit={handleSubmit}>
        <div
          className="row"
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <div className="form-group col-md-3 my-1">
            <select
              id="sonod"
              required
              className="form-control"
              onChange={handleInputChange}
              value={formData.sonod}
            >
              <option value="">চিহ্নিত করুন</option>
              <option value="all">সকল</option>
              <option value="holdingtax">হোল্ডিং ট্যাক্স</option>
              <option value="নাগরিকত্ব সনদ">নাগরিকত্ব সনদ</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group col-md-3 my-1">
            <select
              id="paymentType"
              required
              className="form-control"
              onChange={handleInputChange}
              value={formData.paymentType}
            >
              <option value="">চিহ্নিত করুন</option>
              <option value="all">সকল পেমেন্ট</option>
              <option value="manual">ম্যানুয়াল পেমেন্ট</option>
              <option value="online">অনলাইন পেমেন্ট</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <input
              type="date"
              id="fromDate"
              className="form-control"
              onChange={handleInputChange}
              value={formData.fromDate}
            />
          </div>
          <div className="form-group col-md-1 text-center my-2 fs-5">থেকে</div>
          <div className="form-group col-md-2">
            <input
              type="date"
              id="toDate"
              className="form-control"
              onChange={handleInputChange}
              value={formData.toDate}
            />
          </div>
          <div className="form-group col-md-3 my-1">
            <button
              type="submit"
              className="btn_main mt-3"
              style={{ fontSize: '22px', marginLeft: '10px' }}
            >
              খুজুন
            </button>
          </div>
        </div>
      </form>

      <div className="card-body mt-5 p-4">
        <div className="text-end">
          {' '}
          <button className="btn btn-success mb-2 me-2">
            প্রতিবেদন ডাউনলোড
          </button>
        </div>
        <div className="table-responsive ">
          <table className="table">
            <thead>
              <tr>
                <th>তারিখ</th> <th>সনদের ধরণ</th> <th>টাকা</th>
              </tr>
            </thead>{' '}
            <tbody>
              <tr>
                <td>2024-01-05</td> <td>চারিত্রিক সনদ</td> <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UnionReports;
