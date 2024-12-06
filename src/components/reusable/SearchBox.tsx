import { TDistrict, TDivision, TUnion, TUpazila } from '@/types';
import React, { ChangeEvent, useEffect, useState } from 'react';

const SearchBox: React.FC = () => {
  const [selecteddivisions, setSelectedDivisions] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('');
  const [divisions, setDivisions] = useState<TDivision[]>([]);
  const [districts, setDistricts] = useState<TDistrict[]>([]);
  const [upazilas, setUpazilas] = useState<TUpazila[]>([]);
  const [unions, setUnions] = useState<TUnion[]>([]);
  useEffect(() => {
    fetch('/divisions.json')
      .then(res => res.json())
      .then((data: TDivision[]) => setDivisions(data))
      .catch(error => console.error('Error fetching divisions data:', error));
  }, []);

  useEffect(() => {
    if (selecteddivisions) {
      fetch('/districts.json')
        .then(response => response.json())
        .then((data: TDistrict[]) => {
          const filteredDistricts = data.filter(
            d => d.division_id === selecteddivisions
          );
          setDistricts(filteredDistricts);
        })
        .catch(error => console.error('Error fetching districts data:', error));
    }
  }, [selecteddivisions]);

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

  useEffect(() => {
    if (selectedUpazila) {
      fetch('/unions.json')
        .then(response => response.json())
        .then((data: TUnion[]) => {
          const filteredUnions = data.filter(
            union => union.upazilla_id === selectedUpazila
          );
          setUnions(filteredUnions);
        })
        .catch(error => console.error('Error fetching unions data:', error));
    }
  }, [selectedUpazila]);

  const handleDivChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivisions(event.target.value);
    setSelectedDistrict('');
    setSelectedUpazila('');
  };

  const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(event.target.value);
    setSelectedUpazila('');
  };

  const handleUpazilaChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUpazila(event.target.value);
  };
  const handleUnionChange = (event: { target: { value: string } }) => {
    const union = event.target.value;

    window.location.href = `http://${union}.localhost:5173`;
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <select
        name="division"
        id="division"
        className="searchFrom form_control"
        value={selecteddivisions}
        onChange={handleDivChange}
      >
        {divisions?.map(d => (
          <option key={d.id} value={d.id}>
            {d.bn_name}
          </option>
        ))}
      </select>
      <select
        name="district"
        id="district"
        className="searchFrom form_control"
        value={selectedDistrict}
        onChange={handleDistrictChange}
      >
        <option>জেলা নির্বাচন করুন</option>
        {districts?.map(d => (
          <option key={d.id} value={d.id}>
            {d.bn_name}
          </option>
        ))}
      </select>
      <select
        name="thana"
        id="thana"
        className="searchFrom form_control"
        value={selectedUpazila}
        onChange={handleUpazilaChange}
      >
        <option>উপজেলা নির্বাচন করুন</option>
        {upazilas.map(u => (
          <option key={u.id} value={u.id}>
            {u.bn_name}
          </option>
        ))}
      </select>
      <select
        id="union"
        className="searchFrom form_control"
        onChange={handleUnionChange}
      >
        <option>ইউনিয়ন নির্বাচন করুন</option>
        {unions.map(union => (
          <option key={union.id} value={union.name}>
            {union.bn_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBox;
