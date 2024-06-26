import { useEffect, useState } from 'react';
import { Form, Input, Select, Checkbox } from 'antd';
import { TDistrict, TDivision, TUpazila } from '@/types';

const { Option } = Select;

export const AddressFields = () => {
  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('');
  const [divisions, setDivisions] = useState<TDivision[]>([]);
  const [districts, setDistricts] = useState<TDistrict[]>([]);
  const [upazilas, setUpazilas] = useState<TUpazila[]>([]);

  useEffect(() => {
    fetch('/divisions.json')
      .then(res => res.json())
      .then((data: TDivision[]) => setDivisions(data))
      .catch(error => console.error('Error fetching divisions data:', error));
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      fetch('/districts.json')
        .then(response => response.json())
        .then((data: TDistrict[]) => {
          const filteredDistricts = data.filter(
            d => d.division_id === selectedDivision
          );
          setDistricts(filteredDistricts);
        })
        .catch(error => console.error('Error fetching districts data:', error));
    }
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch('/upazilas.json')
        .then(response => response.json())
        .then((data: TUpazila[]) => {
          const filteredUpazilas = data.filter(
            upazila => upazila.district_id === selectedDistrict
          );
          setUpazilas(filteredUpazilas);
        })
        .catch(error => console.error('Error fetching upazilas data:', error));
    }
  }, [selectedDistrict]);

  const handleDivChange = (value: string) => {
    setSelectedDivision(value);
    setSelectedDistrict('');
    setSelectedUpazila('');
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedUpazila('');
  };

  const handleUpazilaChange = (value: string) => {
    setSelectedUpazila(value);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="app-heading">বর্তমান ঠিকানা</div>

          <Form.Item name=""></Form.Item>
          <Form.Item
            name="currentDivision"
            label="বিভাগ"
            rules={[{ required: true, message: 'বিভাগ নির্বাচন করুন' }]}
          >
            <Select
              style={{ height: 40, width: '100%' }}
              className=""
              value={selectedDivision}
              onChange={handleDivChange}
            >
              <Option value="">বিভাগ নির্বাচন করুন</Option>
              {divisions.map(division => (
                <Option key={division.id} value={division.id}>
                  {division.bn_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="currentDistrict"
            label="জেলা"
            rules={[{ required: true, message: 'জেলা নির্বাচন করুন' }]}
          >
            <Select
              style={{ height: 40, width: '100%' }}
              className=""
              value={selectedDistrict}
              onChange={handleDistrictChange}
            >
              <Option value="">জেলা নির্বাচন করুন</Option>
              {districts.map(district => (
                <Option key={district.id} value={district.id}>
                  {district.bn_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="currentUpazila"
            label="উপজেলা/থানা"
            rules={[{ required: true, message: 'উপজেলা নির্বাচন করুন' }]}
          >
            <Select
              style={{ height: 40, width: '100%' }}
              className=""
              value={selectedUpazila}
              onChange={handleUpazilaChange}
            >
              <Option value="">উপজেলা নির্বাচন করুন</Option>
              {upazilas.map(upazila => (
                <Option key={upazila.id} value={upazila.id}>
                  {upazila.bn_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="currentPostOffice" label="পোষ্ট অফিস">
            <Input className="form-control" />
          </Form.Item>
          <Form.Item name="currentWardNo" label="ওয়ার্ড নং">
            <Select style={{ height: 40, width: '100%' }}>
              <Option value="">ওয়াড নং</Option>
              {Array.from({ length: 9 }, (_, i) => (
                <Option key={i + 1} value={i + 1}>
                  {i + 1}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="currentVillage" label="গ্রাম/মহল্লা">
            <Input className="form-control" />
          </Form.Item>
        </div>
        <div className="col-md-6">
          <div className="app-heading">স্থায়ী ঠিকানা</div>
          <Form.Item name="sameAsCurrent">
            <Checkbox> বর্তমান ঠিকানা ও স্থায়ী ঠিকানা একই হলে</Checkbox>
          </Form.Item>
          <Form.Item
            name="permanentDivision"
            label="বিভাগ"
            rules={[{ required: true, message: 'বিভাগ নির্বাচন করুন' }]}
          >
            <Select
              style={{ height: 40, width: '100%' }}
              className=""
              value={selectedDivision}
              onChange={handleDivChange}
            >
              <Option value="">বিভাগ নির্বাচন করুন</Option>
              {divisions.map(division => (
                <Option key={division.id} value={division.id}>
                  {division.bn_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="permanentDistrict"
            label="জেলা"
            rules={[{ required: true, message: 'জেলা নির্বাচন করুন' }]}
          >
            <Select
              style={{ height: 40, width: '100%' }}
              className=""
              value={selectedDistrict}
              onChange={handleDistrictChange}
            >
              <Option value="">জেলা নির্বাচন করুন</Option>
              {districts.map(district => (
                <Option key={district.id} value={district.id}>
                  {district.bn_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="permanentUpazila"
            label="উপজেলা/থানা"
            rules={[{ required: true, message: 'উপজেলা নির্বাচন করুন' }]}
          >
            <Select
              style={{ height: 40, width: '100%' }}
              className=""
              value={selectedUpazila}
              onChange={handleUpazilaChange}
            >
              <Option value="">উপজেলা নির্বাচন করুন</Option>
              {upazilas.map(upazila => (
                <Option key={upazila.id} value={upazila.id}>
                  {upazila.bn_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="permanentPostOffice" label="পোষ্ট অফিস">
            <Input className="form-control" />
          </Form.Item>
          <Form.Item name="permanentWardNo" label="ওয়ার্ড নং">
            <Select style={{ height: 40, width: '100%' }}>
              <Option value="">ওয়াড নং</Option>
              {Array.from({ length: 9 }, (_, i) => (
                <Option key={i + 1} value={i + 1}>
                  {i + 1}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="permanentVillage" label="গ্রাম/মহল্লা">
            <Input className="form-control" />
          </Form.Item>
        </div>
      </div>
    </>
  );
};

export default AddressFields;
