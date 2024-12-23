/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Form, Select, Checkbox, Input } from "antd";
import { TDistrict, TDivision, TUpazila } from "@/types";

const { Option } = Select;

interface AddressFieldsProps {
  form: any; // Accept the form prop from the parent component
}
const AddressFields = ({ form }: AddressFieldsProps) => {
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedUpazila, setSelectedUpazila] = useState<string>("");
  const [selectedPerDivision, setSelectedPerDivision] = useState<string>("");
  const [selectedPerDistrict, setSelectedPerDistrict] = useState<string>("");
  const [selectedPerUpazila, setSelectedPerUpazila] = useState<string>("");

  const [divisions, setDivisions] = useState<TDivision[]>([]);
  const [districts, setDistricts] = useState<TDistrict[]>([]);
  const [upazilas, setUpazilas] = useState<TUpazila[]>([]);

  const [perDistricts, setPerDistricts] = useState<TDistrict[]>([]);
  const [perUpazilas, setPerUpazilas] = useState<TUpazila[]>([]);

  useEffect(() => {
    fetch("/divisions.json")
      .then((res) => res.json())
      .then((data: TDivision[]) => {
        setDivisions(data);
      })
      .catch((error) => console.error("Error fetching divisions data:", error));
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      fetch("/districts.json")
        .then((response) => response.json())
        .then((data: TDistrict[]) => {
          const filteredDistricts = data.filter(
            (d) => d.division_id === selectedDivision
          );
          setDistricts(filteredDistricts);
        })
        .catch((error) =>
          console.error("Error fetching districts data:", error)
        );
    }
    if (selectedPerDivision) {
      fetch("/districts.json")
        .then((response) => response.json())
        .then((data: TDistrict[]) => {
          const filteredDistricts = data.filter(
            (d) => d.division_id === selectedPerDivision
          );
          setPerDistricts(filteredDistricts);
        })
        .catch((error) =>
          console.error("Error fetching districts data:", error)
        );
    }
  }, [selectedDivision, selectedPerDivision]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch("/upazilas.json")
        .then((response) => response.json())
        .then((data: TUpazila[]) => {
          const filteredUpazilas = data.filter(
            (upazila) => upazila.district_id === selectedDistrict
          );
          setUpazilas(filteredUpazilas);
        })
        .catch((error) =>
          console.error("Error fetching upazilas data:", error)
        );
    }
    if (selectedPerDistrict) {
      fetch("/upazilas.json")
        .then((response) => response.json())
        .then((data: TUpazila[]) => {
          const filteredUpazilas = data.filter(
            (upazila) => upazila.district_id === selectedPerDistrict
          );
          setPerUpazilas(filteredUpazilas);
        })
        .catch((error) =>
          console.error("Error fetching upazilas data:", error)
        );
    }
  }, [selectedDistrict, selectedPerDistrict]);

  const handleDivChange = (value: string) => {
    setSelectedDivision(value);
    setSelectedDistrict("");
    setSelectedUpazila("");

    const filterDivition = divisions.find((d) => d.id === value);
    console.log(filterDivition?.bn_name);

    form.setFieldsValue({
      current_division: filterDivition?.bn_name,
    });
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedUpazila("");

    const filterDistrict = districts.find((d) => d.id === value);
    console.log(filterDistrict?.bn_name);

    form.setFieldsValue({
      applicant_present_district: filterDistrict?.bn_name,
    });

    console.log(form);
  };

  const handleUpazilaChange = (value: string) => {
    setSelectedUpazila(value);

    const filterUpazila = upazilas.find((d) => d.id === value);
    console.log(filterUpazila?.bn_name);

    form.setFieldsValue({
      applicant_present_Upazila: filterUpazila?.bn_name,
    });

    console.log(form);
  };

  /* ------------------ */

  const handlePerDivChange = (value: string) => {
    setSelectedPerDivision(value);
    setSelectedPerDistrict("");
    setSelectedPerUpazila("");
    const filterDivition = divisions.find((d) => d.id === value);
    console.log(filterDivition?.bn_name);

    form.setFieldsValue({
      permanent_division: filterDivition?.bn_name,
    });
  };

  const handlePerDistrictChange = (value: string) => {
    setSelectedPerDistrict(value);
    setSelectedPerUpazila("");

    const filterDistrict = districts.find((d) => d.id === value);
    console.log(filterDistrict?.bn_name);

    form.setFieldsValue({
      applicant_permanent_district: filterDistrict?.bn_name,
    });

    console.log(form);
  };

  const handlePerUpazilaChange = (value: string) => {
    setSelectedPerUpazila(value);

    const filterUpazila = upazilas.find((d) => d.id === value);
    console.log(filterUpazila?.bn_name);

    form.setFieldsValue({
      applicant_permanent_Upazila: filterUpazila?.bn_name,
    });

    console.log(form);
  };

  const handleSameAddressChange = (e: any) => {
    if (e.target.checked) {
      form.setFieldsValue({
        applicant_permanent_division: form.getFieldValue("current_division"),
        applicant_permanent_district: form.getFieldValue(
          "applicant_present_district"
        ),
        applicant_permanent_Upazila: form.getFieldValue(
          "applicant_present_Upazila"
        ),
        applicant_permanent_word_number: form.getFieldValue(
          "applicant_present_word_number"
        ),
        applicant_permanent_village: form.getFieldValue(
          "applicant_present_village"
        ),
        applicant_permanent_post_office: form.getFieldValue(
          "applicant_present_post_office"
        ),
      });
    } else {
      form.setFieldsValue({
        applicant_permanent_division: "",
        applicant_permanent_district: "",
        applicant_permanent_Upazila: "",
        applicant_permanent_word_number: "",
        applicant_permanent_village: "",
        applicant_permanent_post_office: "",
      });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="app-heading">বর্তমান ঠিকানা</div>

          <Form.Item></Form.Item>
          <Form.Item name="current_division" label="বিভাগ">
            <Select
              placeholder="বিভাগ নির্বাচন করুন"
              style={{ height: 40, width: "100%" }}
              value={selectedDivision}
              onChange={handleDivChange}
            >
              {divisions.map((division) => (
                <Option key={division.id} value={division.id}>
                  {division.bn_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="applicant_present_district" label="জেলা">
            <Select
              placeholder="জেলা নির্বাচন করুন"
              style={{ height: 40, width: "100%" }}
              value={selectedDistrict}
              onChange={handleDistrictChange}
            >
              {districts.map((district) => (
                <Option key={district.id} value={district.id}>
                  {district.bn_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="applicant_present_Upazila" label="উপজেলা/থানা">
            <Select
              placeholder="উপজেলা/থানা নির্বাচন করুন"
              style={{ height: 40, width: "100%" }}
              value={selectedUpazila}
              onChange={handleUpazilaChange}
            >
              {upazilas.map((upazila) => (
                <Option key={upazila.id} value={upazila.id}>
                  {upazila.bn_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="applicant_present_post_office" label="পোষ্ট অফিস">
            <Input className="form-control" />
          </Form.Item>
          <Form.Item name="applicant_present_word_number" label="ওয়ার্ড নং">
            <Select style={{ height: 40, width: "100%" }}>
              <Option value="">ওয়াড নং</Option>
              {Array.from({ length: 9 }, (_, i) => (
                <Option key={i + 1} value={i + 1}>
                  {i + 1}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="applicant_present_village" label="গ্রাম/মহল্লা">
            <Input className="form-control" />
          </Form.Item>
        </div>

        <div className="col-md-6">
          <div className="app-heading">স্থায়ী ঠিকানা</div>

          <Form.Item name="permanent_address" valuePropName="checked">
            <Checkbox onChange={handleSameAddressChange}>
              বর্তমান ঠিকানার সাথে মিলিয়ে দিন
            </Checkbox>
          </Form.Item>
          {/* <Form.Item name="permanent_address">
            <Checkbox onChange={handleSameAddressChange}>
              বর্তমান ঠিকানার সাথে মিলিয়ে দিন
            </Checkbox>
          </Form.Item> */}

          <Form.Item
            name="applicant_permanent_division"
            label="বিভাগ"
            // rules={[{ required: true, message: 'বিভাগ নির্বাচন করুন' }]}
          >
            <Select
              placeholder="বিভাগ নির্বাচন করুন"
              style={{ height: 40, width: "100%" }}
              className=""
              value={selectedPerDivision}
              onChange={handlePerDivChange}
            >
              {divisions.map((division) => (
                <Option key={division.id} value={division.id}>
                  {division.bn_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="applicant_permanent_district"
            label="জেলা"
            // rules={[{ required: true, message: 'জেলা নির্বাচন করুন' }]}
          >
            <Select
              placeholder="জেলা নির্বাচন করুন"
              style={{ height: 40, width: "100%" }}
              className=""
              value={selectedPerDistrict}
              onChange={handlePerDistrictChange}
            >
              {perDistricts.map((district) => (
                <Option key={district.id} value={district.id}>
                  {district.bn_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="applicant_permanent_Upazila"
            label="উপজেলা/থানা"
            // rules={[{ required: true, message: 'উপজেলা নির্বাচন করুন' }]}
          >
            <Select
              placeholder="উপজেলা নির্বাচন করুন"
              style={{ height: 40, width: "100%" }}
              className=""
              value={selectedPerUpazila}
              onChange={handlePerUpazilaChange}
            >
              {perUpazilas.map((upazila) => (
                <Option key={upazila.id} value={upazila.id}>
                  {upazila.bn_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="applicant_permanent_post_office" label="পোষ্ট অফিস">
            <Input className="form-control" />
          </Form.Item>
          <Form.Item name="applicant_permanent_word_number" label="ওয়ার্ড নং">
            <Select style={{ height: 40, width: "100%" }}>
              <Option value="">ওয়াড নং</Option>
              {Array.from({ length: 9 }, (_, i) => (
                <Option key={i + 1} value={i + 1}>
                  {i + 1}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="applicant_permanent_village" label="গ্রাম/মহল্লা">
            <Input className="form-control" />
          </Form.Item>
        </div>
      </div>
    </>
  );
};

export default AddressFields;
