import Loader from "@/components/reusable/Loader";

import EnglishApplicationForm from "@/pages/EnglishApplicationForm/EnglishApplicationForm";
import { useSingleSonodQuery } from "@/redux/api/sonod/sonodApi";
import { TApplicantData } from "@/types/global";
import { useParams } from "react-router-dom";

const EnglishEditSonod = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const { data, isLoading } = useSingleSonodQuery({
    id,
    token,
    en: true,
  });

  if (isLoading) {
    return <Loader />;
  }

  const user: TApplicantData = data?.data;
  // console.log(user);
  return (
    <>
      <EnglishApplicationForm user={user} />
    </>
  );
};

export default EnglishEditSonod;
