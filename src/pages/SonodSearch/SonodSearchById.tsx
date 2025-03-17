import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchTimeline from "@/components/ui/SearchTimeline";
import { useSonodSearchByIdQuery } from "@/redux/api/user/userApi";
import RightSidebar from "../Home/RightSidebar";
import Loader from "@/components/reusable/Loader";

const SonodSearchById = () => {
  const hostname = window.location.hostname;
  const union = hostname.split(".")[0];
  
  const { id } = useParams<{ id?: string }>();
  const numericId = id ? parseInt(id, 10) : 0;

  useEffect(() => {
    const restrictedUnions = [
      "azimpur",
      "bhandra",
      "bijora",
      "birol",
      "dhamoir",
      "dharmapur",
      "farakkabad",
      "mongalpur",
      "palashbari",
      "rajarampur",
      "ranipukur",
      "shohorgram",
    ];
    if (restrictedUnions.includes(union) && numericId <= 30000) {
      window.location.href = `https://oldbirol.uniontax.gov.bd/verification/sonod/${numericId}`
    }
  }, [union, numericId]);

  const { data, isLoading, isError } = useSonodSearchByIdQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error occurred while fetching sonod data.</div>;
  }

  return (
    <div className="row mx-auto my-3 container">
      <div className="mainBody col-md-9">
        {data && !data.isError ? <SearchTimeline data={data} /> : null}
      </div>
      <RightSidebar />
    </div>
  );
};

export default SonodSearchById;
