import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/features/hooks";
import { useTokenCheckQuery } from "@/redux/api/auth/authApi";
import { setUser } from "@/redux/features/user/userSlice";
import { useDispatch } from "react-redux";

// Custom hook for handling token check
export const useTokenCheck = (token: string | null, _p0: { skipInitial: boolean; }) => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shouldRefetch, setShouldRefetch] = useState(false); // State to track if refetch should be triggered

  // Query to check the token validity
  const { data: tokenCheckData, isError, refetch } = useTokenCheckQuery({ token }, { skip: !token });

  useEffect(() => {
    // Don't call refetch automatically on initial load
    if (shouldRefetch && token) {
      // If the profile step is not completed, trigger refetch
      if (user?.profile_steps !== 10) {
        refetch();
        setShouldRefetch(false); // Reset shouldRefetch state after refetch
      }
    }

    // Check if token is valid
    if (token && (isError || (tokenCheckData && tokenCheckData.status_code !== 200))) {
      navigate("/login"); // Redirect to login if token is invalid
    } else if (tokenCheckData && tokenCheckData.status_code === 200) {
      dispatch(setUser(tokenCheckData.data.user)); // Set the user data in redux
    }
  }, [token, user, isError, tokenCheckData, refetch, dispatch, navigate, shouldRefetch]);

  // Function to manually trigger refetch
  const triggerRefetch = () => {
    setShouldRefetch(true); // Set state to trigger refetch
  };

  return { tokenCheckData, refetch: triggerRefetch }; // Return a custom function to trigger refetch manually
};
