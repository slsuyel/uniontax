import SearchTimeline from "@/components/ui/SearchTimeline";
import { useSonodSearchByIdQuery } from "@/redux/api/user/userApi";

import { useParams } from "react-router-dom";
import RightSidebar from "../Home/RightSidebar";
import Loader from "@/components/reusable/Loader";

const SonodSearchById = () => {
  const { id } = useParams();
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
      </div>{" "}
      <RightSidebar />
    </div>
  );
};

export default SonodSearchById;
