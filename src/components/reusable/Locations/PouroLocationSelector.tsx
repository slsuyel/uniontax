import { useEffect, useState } from "react";
import { TDistrict, TDivision, TUnion } from "@/types";
import { Form, Select } from "antd";
const { Option } = Select;

interface LocationSelectorProps {
  onUnionSelect: (union: any | null) => void;
  showLabels?: boolean;
}

const PouroLocationSelector = ({ onUnionSelect, showLabels = false }: LocationSelectorProps) => {
  const [selecteddivisions, setSelectedDivisions] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedUnion, setSelectedUnion] = useState<string>("");

  const [divisions, setDivisions] = useState<TDivision[]>([]);
  const [districts, setDistricts] = useState<TDistrict[]>([]);
  const [unions, setUnions] = useState<TUnion[]>([]);

  useEffect(() => {
    fetch("https://api.uniontax.gov.bd/api/global/divisions")
      .then((res) => res.json())
      .then((data: any) => setDivisions(data?.data))
      .catch((error) => console.error("Error fetching divisions:", error));
  }, []);

  useEffect(() => {
    if (selecteddivisions) {
      fetch(`https://api.uniontax.gov.bd/api/global/districts/${selecteddivisions}`)
        .then((res) => res.json())
        .then((data: any) => setDistricts(data?.data))
        .catch((error) => console.error("Error fetching districts:", error));
    }
  }, [selecteddivisions]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch("/pouroseba.json")
        .then((res) => res.json())
        .then((data: any[]) => {
          const filteredUnions = data.filter(
            (u) => u.district_id == selectedDistrict
          );
          setUnions(filteredUnions);
        })
        .catch((error) => console.error("Error fetching unions:", error));
    } else {
      setUnions([]);
    }
  }, [selectedDistrict]);

  const handleDivChange = (value: string) => {
    setSelectedDivisions(value);
    setSelectedDistrict("");
    setUnions([]);
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedUnion("");
  };

  const handleUnionChange = (value: string) => {
    const selectedUnionObject = unions.find(
      (u) =>
        u?.name.toLowerCase().replace(/\s+/g, "") ===
        value.toLowerCase().replace(/\s+/g, "")
    );

    setSelectedUnion(selectedUnionObject?.name || "");
    onUnionSelect(selectedUnionObject?.name || null);
  };

  return (
    <div className="row w-100">
      {/* Division */}
      <div className="col-md-4">
        <Form.Item>
          {showLabels && <label>বিভাগ নির্বাচন করুন:</label>}
          <Select
            value={selecteddivisions || undefined}
            onChange={handleDivChange}
            placeholder="বিভাগ নির্বাচন করুন"
            className="w-100"
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

      {/* District */}
      <div className="col-md-4">
        <Form.Item>
          {showLabels && <label>জেলা নির্বাচন করুন:</label>}
          <Select
            value={selectedDistrict || undefined}
            onChange={handleDistrictChange}
            placeholder="জেলা নির্বাচন করুন"
            className="w-100"
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

      {/* Union */}
      <div className="col-md-4">
        <Form.Item>
          {showLabels && <label>পৌরসভা নির্বাচন করুন:</label>}
          <Select
            value={selectedUnion || undefined}
            onChange={handleUnionChange}
            placeholder="পৌরসভা নির্বাচন করুন"
            className="w-100"
            disabled={!selectedDistrict}
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

export default PouroLocationSelector;
