import { useEffect, useState } from "react";
import { TDistrict, TDivision, TUnion, TUpazila } from "@/types";
import { Select, Form } from "antd";

const { Option } = Select;

interface LocationSelectorProps {
  onUnionSelect: (union: any | null) => void;
  showLabels?: boolean;
}

const UnionLocationSelector = ({ onUnionSelect, showLabels = false }: LocationSelectorProps) => {

  const [selecteddivisions, setSelectedDivisions] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedUpazila, setSelectedUpazila] = useState<string>("");
  const [selectedUnion, setSelectedUnion] = useState<string>("");
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
        .then((data: any) => {
          setDistricts(data?.data);
        })
        .catch((error) => console.error("Error fetching districts data:", error));
    }
  }, [selecteddivisions]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://api.uniontax.gov.bd/api/global/upazilas/${selectedDistrict}`)
        .then((response) => response.json())
        .then((data: any) => {
          setUpazilas(data?.data);
        })
        .catch((error) => console.error("Error fetching upazilas data:", error));
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

  const handleDivChange = (value: string) => {
    setSelectedDivisions(value);
    setSelectedDistrict("");
    setSelectedUpazila("");
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedUpazila("");
  };

  const handleUpazilaChange = (value: string) => {
    setSelectedUpazila(value);
  };

  const handleUnionChange = (value: string) => {
    const selectedUnionObject = unions.find(
      (u) => u?.name.toLowerCase().replace(/\s+/g, '') === value.toLowerCase().replace(/\s+/g, '')
    );
    setSelectedUnion(selectedUnionObject?.name || "");
    onUnionSelect(selectedUnionObject?.name || null);
  };

  return (
    <div className="row w-100">
      <div className="col-md-3">
        <Form.Item>
          {showLabels && <label>বিভাগ নির্বাচন করুন:</label>}
          <Select
            value={selecteddivisions || undefined}
            onChange={handleDivChange}
            placeholder="বিভাগ নির্বাচন করুন"
            style={{ width: "100%" }}
          >
            {divisions?.map((d) => (
              <Option key={d.id} value={d.id}>
                {d.bn_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div className="col-md-3">
        <Form.Item>
          {showLabels && <label>জেলা নির্বাচন করুন:</label>}
          <Select
            value={selectedDistrict || undefined}
            onChange={handleDistrictChange}
            placeholder="জেলা নির্বাচন করুন"
            style={{ width: "100%" }}
            disabled={!selecteddivisions}
          >
            {districts?.map((d) => (
              <Option key={d.id} value={d.id}>
                {d.bn_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div className="col-md-3">
        <Form.Item>
          {showLabels && <label>উপজেলা নির্বাচন করুন:</label>}
          <Select
            value={selectedUpazila || undefined}
            onChange={handleUpazilaChange}
            placeholder="উপজেলা নির্বাচন করুন"
            style={{ width: "100%" }}
            disabled={!selectedDistrict}
          >
            {upazilas?.map((u) => (
              <Option key={u.id} value={u.id}>
                {u.bn_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div className="col-md-3">
        <Form.Item>
          {showLabels && <label>ইউনিয়ন নির্বাচন করুন:</label>}
          <Select
            value={selectedUnion || undefined}
            onChange={handleUnionChange}
            placeholder="ইউনিয়ন নির্বাচন করুন"
            style={{ width: "100%" }}
            disabled={!selectedUpazila}
          >
            {unions?.map((u) => (
              <Option key={u.id} value={u.name}>
                {u.bn_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </div>
  );
};

export default UnionLocationSelector;
