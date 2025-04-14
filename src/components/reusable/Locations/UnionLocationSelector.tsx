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
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
  useEffect(() => {


    fetch(`${BASE_API_URL}/global/divisions`)
      .then((res) => res.json())
      .then((data) => setDivisions(data?.data))
      .catch((error) => console.error("Error fetching divisions:", error));
  }, []);

  useEffect(() => {
    if (selecteddivisions) {
      fetch(`${BASE_API_URL}/global/districts/${selecteddivisions}`)
        .then((response) => response.json())
        .then((data: any) => {
          setDistricts(data?.data);
        })
        .catch((error) => console.error("Error fetching districts data:", error));
    }
  }, [selecteddivisions]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`${BASE_API_URL}/global/upazilas/${selectedDistrict}`)
        .then((response) => response.json())
        .then((data: any) => {
          setUpazilas(data?.data);
        })
        .catch((error) => console.error("Error fetching upazilas data:", error));
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedUpazila) {
      fetch(`${BASE_API_URL}/global/unions/${selectedUpazila}`)
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


    <>
      <div className={showLabels ? "row w-100" : "d-flex justify-content-between align-items-center gap-3"}>
      {[
        {
        label: "বিভাগ নির্বাচন করুন:",
        value: selecteddivisions,
        onChange: handleDivChange,
        placeholder: "বিভাগ নির্বাচন করুন",
        options: divisions,
        optionKey: "id",
        optionValue: "id",
        optionLabel: "bn_name",
        disabled: false,
        },
        {
        label: "জেলা নির্বাচন করুন:",
        value: selectedDistrict,
        onChange: handleDistrictChange,
        placeholder: "জেলা নির্বাচন করুন",
        options: districts,
        optionKey: "id",
        optionValue: "id",
        optionLabel: "bn_name",
        disabled: !selecteddivisions,
        },
        {
        label: "উপজেলা নির্বাচন করুন:",
        value: selectedUpazila,
        onChange: handleUpazilaChange,
        placeholder: "উপজেলা নির্বাচন করুন",
        options: upazilas,
        optionKey: "id",
        optionValue: "id",
        optionLabel: "bn_name",
        disabled: !selectedDistrict,
        },
        {
        label: "ইউনিয়ন নির্বাচন করুন:",
        value: selectedUnion,
        onChange: handleUnionChange,
        placeholder: "ইউনিয়ন নির্বাচন করুন",
        options: unions,
        optionKey: "id",
        optionValue: "name",
        optionLabel: "bn_name",
        disabled: !selectedUpazila,
        },
      ].map((field, index) => (
        <div key={index} className={showLabels ? "col-md-3" : ""}>
        {showLabels ? (
          <Form.Item>
          <label>{field.label}</label>
          <Select
            value={field.value || undefined}
            onChange={field.onChange}
            placeholder={field.placeholder}
            style={{ width: "100%" }}
            disabled={field.disabled}
          >
            {field.options?.map((option) => (
            <Option key={option[field.optionKey as keyof TDivision]} value={option[field.optionValue as keyof TDivision]}>
              {option[field.optionLabel as keyof TDivision]}
            </Option>
            ))}
          </Select>
          </Form.Item>
        ) : (
          <select
          className="searchFrom form_control"
          value={field.value || ""}
          onChange={(e) => field.onChange(e.target.value)}
          disabled={field.disabled}
          >
          <option value="">{field.label}</option>
          {field.options?.map((option) => (
            <option key={option[field.optionKey as keyof TDivision]} value={option[field.optionValue as keyof TDivision]}>
            {option[field.optionLabel as keyof TDivision]}
            </option>
          ))}
          </select>
        )}
        </div>
      ))}
      </div>
    </>


  );
};

export default UnionLocationSelector;
