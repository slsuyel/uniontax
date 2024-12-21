/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState } from 'react';
import Breadcrumbs from '@/components/reusable/Breadcrumbs';
import { useAppSelector } from '@/redux/features/hooks';
import { RootState } from '@/redux/features/store';
import { useFailedPaymentQuery } from '@/redux/api/user/userApi';

import { TPaymentFailed } from '@/types/global';
import { Spinner } from 'react-bootstrap';


const UnionReports = () => {

  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const token = localStorage.getItem(`token`)
  const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
  const sonodInfo = useAppSelector((state: RootState) => state.union.sonodList);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const { data, isLoading, isFetching } = useFailedPaymentQuery(
    triggerSearch ? { token, sonod_type: selectedService, date: selectedDate } : null
  );

  const [formData, setFormData] = useState({
    sonod: '',
    paymentType: '',
    fromDate: '',
    toDate: '',
  });


  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedService(e.target.value);
  };



  const handleInputChange = (event: { target: { id: any; value: any } }) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log('ফর্ম ডেটা:', formData);
    const url = `https://api.uniontax.gov.bd/payment/report/download?union=${unionInfo?.short_name_e}&from=${formData.fromDate}&to=${formData.toDate}&sonod_type=${formData.sonod}`;
    window.open(url, '_blank');
  };

  const handleSearch = () => {
    setTriggerSearch(true);
  };

  const failedResult: TPaymentFailed[] = data?.data

  return (
    <div>
      <Breadcrumbs current="প্রতিবেদন" />

      <form onSubmit={handleSubmit}>
        <div
          className="row"

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
              {sonodInfo.map((d) => <option key={d.id} value={d.bnname}>{d.bnname}</option>)}

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



      <div className=' mt-5'>
        <h6>পেমেন্ট Failed তালিকাঃ</h6>
        <div className='row '>
          <div className="form-group col-md-3 my-1">
            <select
              id="sonod"
              required
              className="form-control"
              onChange={handleChange}
              value={selectedService}
            >
              <option value="">চিহ্নিত করুন</option>
              <option value="all">সকল</option>
              <option value="holdingtax">হোল্ডিং ট্যাক্স</option>
              {sonodInfo.map((d) => (
                <option key={d.id} value={d.bnname}>
                  {d.bnname}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-3 my-1">
            <input
              className="form-control"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}

            />
          </div>
          <div className="form-group col-md-3 my-1">
            <button className='btn_main' onClick={handleSearch} disabled={!selectedDate || !selectedService}>
              Search
            </button>
          </div>

        </div>
      </div>



      <div className="my-4">
        <h2>Payment Failed Records</h2>
        <div className="table-responsive d-none d-md-block">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Sonod ID</th>
                <th>Union</th>
                <th>Transaction ID</th>
                <th>Sonod Type</th>
                <th>Date</th>
                <th>Method</th>
                <th>Maliker Name</th>
                <th>Gram</th>
                <th>Mobile No</th>
                <th>Holding No</th>
                <th>Tax Year</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(isLoading || isFetching) ? (
                <tr>
                  <td colSpan={14} className="text-center">
                    <Spinner />
                  </td>
                </tr>
              ) : failedResult?.length > 0 ? (
                failedResult.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.sonodId}</td>
                    <td>{item.union}</td>
                    <td>{item.trxId}</td>
                    <td>{item.sonod_type}</td>
                    <td>{item.date}</td>
                    <td>{item.method}</td>
                    <td>{item.holding_tax.maliker_name}</td>
                    <td>{item.holding_tax.gramer_name}</td>
                    <td>{item.holding_tax.mobile_no}</td>
                    <td>{item.holding_tax.holding_no}</td>
                    <td>{item.tax.year}</td>
                    <td>{item.tax.price}</td>
                    <td>{item.tax.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={14} className="text-center">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Card View for Mobile */}
        <div className="card-view d-block d-md-none">
          {(isLoading || isFetching) ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : failedResult?.length > 0 ? (
            failedResult.map((item) => (
              <div key={item.id} className="card mb-3">
                <div className="card-body">
                  <p><strong>ID:</strong> {item.id}</p>
                  <p><strong>Sonod ID:</strong> {item.sonodId}</p>
                  <p><strong>Union:</strong> {item.union}</p>
                  <p><strong>Transaction ID:</strong> {item.trxId}</p>
                  <p><strong>Sonod Type:</strong> {item.sonod_type}</p>
                  <p><strong>Date:</strong> {item.date}</p>
                  <p><strong>Method:</strong> {item.method}</p>
                  <p><strong>Maliker Name:</strong> {item.holding_tax.maliker_name}</p>
                  <p><strong>Gram:</strong> {item.holding_tax.gramer_name}</p>
                  <p><strong>Mobile No:</strong> {item.holding_tax.mobile_no}</p>
                  <p><strong>Holding No:</strong> {item.holding_tax.holding_no}</p>
                  <p><strong>Tax Year:</strong> {item.tax.year}</p>
                  <p><strong>Price:</strong> {item.tax.price}</p>
                  <p><strong>Status:</strong> {item.tax.status}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              No records found.
            </div>
          )}
        </div>
      </div>





    </div>
  );
};

export default UnionReports;
