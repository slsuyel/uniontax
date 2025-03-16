/* eslint-disable @typescript-eslint/no-explicit-any */
import { TDistrict, TDivision, TUnion, TUpazila } from "@/types";
import React, { ChangeEvent, useEffect, useState } from "react";

const SearchBox: React.FC = () => {
  const [selecteddivisions, setSelectedDivisions] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedUpazila, setSelectedUpazila] = useState<string>("");
  const [divisions, setDivisions] = useState<TDivision[]>([]);
  const [districts, setDistricts] = useState<TDistrict[]>([]);
  const [upazilas, setUpazilas] = useState<TUpazila[]>([]);
  const [unions, setUnions] = useState<TUnion[]>([]);
  useEffect(() => {
    fetch("https://api.uniontax.gov.bd/api/global/divisions")
      .then((res) => res.json())
      .then((data: any) => setDivisions(data?.data))
      .catch((error) => console.error("Error fetching divisions data:", error));
  }, []);

  useEffect(() => {
    if (selecteddivisions) {
      fetch(`https://api.uniontax.gov.bd/api/global/districts/${selecteddivisions}`)
        .then((response) => response.json())
        .then((data:any) => {
          setDistricts(data?.data);
        })
        .catch((error) =>
          console.error("Error fetching districts data:", error)
        );
    }
  }, [selecteddivisions]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://api.uniontax.gov.bd/api/global/upazilas/${selectedDistrict}`)
        .then((response) => response.json())
        .then((data: any) => {
          setUpazilas(data?.data);
        })
        .catch((error) =>
          console.error("Error fetching upazilas data:", error)
        );
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedUpazila) {
      fetch(`https://api.uniontax.gov.bd/api/global/unions/${selectedUpazila}`)
        .then((response) => response.json())
        .then((data: any) => {
          setUnions(data?.data);
        })
        .catch((error) => console.error("Error fetching unions data:", error));
    }
  }, [selectedUpazila]);

  const handleDivChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivisions(event.target.value);
    setSelectedDistrict("");
    setSelectedUpazila("");
  };

  const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(event.target.value);
    setSelectedUpazila("");
  };

  const handleUpazilaChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUpazila(event.target.value);
  };

  const baseUrl = window.origin;
  const handleUnionChange = (event: { target: { value: string } }) => {
    const union = event.target.value.replace(/\s+/g, "").toLowerCase();
    if (baseUrl.includes("uniontax")) {
      window.location.href = `https://${union}.uniontax.gov.bd`;
    } else if (baseUrl.includes("unionservices")) {
      window.location.href = `https://${union}.unionservices.gov.bd`;
    }
    else { window.location.href = `https://${union}.uniontax.gov.bd`; }
  };


  return (
    <div className="d-flex justify-content-between align-items-center">
      <select
        name="division"
        className="searchFrom form_control"
        value={selecteddivisions}
        onChange={handleDivChange}
      >
        {divisions?.map((d) => (
          <option key={d.id} value={d.id}>
            {d.bn_name}
          </option>
        ))}
      </select>
      <select
        name="district"
        className="searchFrom form_control"
        value={selectedDistrict}
        onChange={handleDistrictChange}
      >
        <option>জেলা নির্বাচন করুন</option>
        {districts?.map((d) => (
          <option key={d.id} value={d.id}>
            {d.bn_name}
          </option>
        ))}
      </select>
      <select
        name="thana"
        className="searchFrom form_control"
        value={selectedUpazila}
        onChange={handleUpazilaChange}
      >
        <option>উপজেলা নির্বাচন করুন</option>
        {upazilas.map((u) => (
          <option key={u.id} value={u.id}>
            {u.bn_name}
          </option>
        ))}
      </select>
      <select className="searchFrom form_control" onChange={handleUnionChange}>
        <option>ইউনিয়ন নির্বাচন করুন</option>
        {unions.map((union) => (
          <option key={union.id} value={union.name}>
            {union.bn_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBox;
