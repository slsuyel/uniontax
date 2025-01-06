import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Loader from "@/components/reusable/Loader";
import { useUddoktaTokenCheckQuery } from "@/redux/api/auth/authApi";
import {
  setInformations,
  setLastApplicationSonodName,
  setUnionName, // Import the new action
} from "@/redux/features/nidInfo/informationsSlice";

interface UddoktaProps {
  children: ReactNode;
}

const UddoktaAuthProvider: FC<UddoktaProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { data, isLoading, isError } = useUddoktaTokenCheckQuery(
    { token },
    { skip: !token }
  );

  // Check token every time the URL changes
  useEffect(() => {
    if (!token || isError || (data && data.status_code !== 200)) {
      navigate("/login"); // Redirect to login if token is invalid
    } else if (data && data.status_code === 200) {
      // Update Redux state if token is valid
      dispatch(
        setInformations(
          data?.data?.uddokta.latest_uddokta_search?.api_response?.informations
        )
      );
      dispatch(
        setLastApplicationSonodName(
          data?.data?.uddokta.latest_uddokta_search?.sonod_name
        )
      );
      dispatch(setUnionName(data?.data?.uddokta.union_name)); // Dispatch the union name
    }
  }, [token, isError, data, navigate, dispatch]);

  if (isLoading) {
    return <Loader />; // Show loader while checking token
  }

  if (data && data.status_code === 200) {
    return <>{children}</>; // Render children if token is valid
  }

  return null; // Return nothing if token is invalid
};

export default UddoktaAuthProvider;
