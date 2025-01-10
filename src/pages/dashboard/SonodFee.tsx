import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import Loader from "@/components/reusable/Loader";
import {
  useSonodFeesQuery,
  useUpdateSonodFeesMutation,
} from "@/redux/api/sonod/sonodApi";
import { message } from "antd";
import { useState, useEffect } from "react";

interface TSonodFee {
  sonod_fees_id: number;
  sonodnamelist_id: number;
  service_id: string;
  bnname: string;
  template: string;
  unioun: string;
  fees: string;
}

const SonodFee = () => {
  // Fetch the sonod information from the state
  const token = localStorage.getItem("token");
  const { data, isLoading } = useSonodFeesQuery({ token });
  const [updateSonod, { isLoading: updating }] = useUpdateSonodFeesMutation();
  const [feesData, setFeesData] = useState<TSonodFee[]>([]);

  // Update feesData when the data changes
  useEffect(() => {
    if (data?.data) {
      setFeesData(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  // Handler to update fees value
  const handleFeeChange = (index: number, value: string) => {
    setFeesData((prevFeesData) => {
      const updatedFeesData = [...prevFeesData];
      updatedFeesData[index] = { ...updatedFeesData[index], fees: value };
      return updatedFeesData;
    });
  };

  const handleSave = async () => {
    const formInputs = Array.from(
      document.querySelectorAll("input[type='number']")
    ) as HTMLInputElement[];

    const payload = {
      fees_data: feesData.map((d, index) => ({
        sonod_fees_id: d.sonod_fees_id,
        sonodnamelist_id: d.sonodnamelist_id,
        service_id: d.service_id,
        fees: formInputs[index].value,
        unioun: d.unioun,
      })),
    };
    try {
      const res = await updateSonod({ data: payload, token }).unwrap();
      if (res.status_code == 200) {
        message.success("সনদ ফি সফলভাবে আপডেট করা হয়েছে");
      }
      if (res.status_code !== 200) {
        message.success("SonodFees updated failed");
      }
    } catch (error) {
      console.error("Error updating fees:", error);
    }
  };

  const dataSource = feesData.map((d, index) => ({
    key: index + 1,
    bnname: d.bnname,
    fees: d.fees,
  }));

  return (
    <div className="container card p-3 border-0">
      <Breadcrumbs current="সনদ ফি" />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>বাংলা নাম</th>
            <th>ফি</th>
          </tr>
        </thead>
        <tbody>
          {dataSource.map((item, index) => (
            <tr key={item.key}>
              <td>{item.key}</td>
              <td>{item.bnname}</td>
              <td>
                <input
                  type="number"
                  min={1}
                  value={feesData[index]?.fees || ""}
                  onChange={(e) => handleFeeChange(index, e.target.value)}
                  className="form-control"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSave}
        className="btn btn-primary mt-3"
        disabled={updating}
      >
        {updating ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default SonodFee;
