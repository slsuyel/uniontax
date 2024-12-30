import Loader from "@/components/reusable/Loader";
import { useUddoktaTokenCheckQuery } from "@/redux/api/auth/authApi";
import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UddoktaProps {
  children: ReactNode;
}

const UddoktaAuthProvider: FC<UddoktaProps> = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { data, isLoading, isError } = useUddoktaTokenCheckQuery(
    { token },
    { skip: !token }
  );

  useEffect(() => {
    if (!token || isError || (data && data.status_code !== 200)) {
      navigate("/login");
    }
  }, [token, isError, data, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  if (data && data.status_code === 200) {
    return <>{children}</>;
  }
  return null;
};

export default UddoktaAuthProvider;
