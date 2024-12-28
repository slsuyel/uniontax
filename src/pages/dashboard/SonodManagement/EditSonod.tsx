import Loader from "@/components/reusable/Loader";
import ApplicationForm from "@/pages/ApplicationForm/ApplicationForm";
import { useSingleSonodQuery } from "@/redux/api/sonod/sonodApi";
import { TApplicantData } from "@/types/global";
import { useParams } from "react-router-dom";

const EditSonod = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const { data, isLoading } = useSingleSonodQuery({
    id,
    token,
  });

  if (isLoading) {
    return <Loader />;
  }

  const user: TApplicantData = data?.data;
  // console.log(user);
  return (
    <>
      <ApplicationForm user={user} />
    </>
  );
};

export default EditSonod;
