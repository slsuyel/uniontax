import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/features/hooks";
import { useTokenCheckQuery } from "@/redux/api/auth/authApi";
import { setUser } from "@/redux/features/user/userSlice";
import { useDispatch } from "react-redux";

// Custom hook for handling token check
export const useTokenCheck = (token: string | null) => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Query to check the token validity
  const { data: tokenCheckData, isError, refetch } = useTokenCheckQuery({ token }, { skip: !token });

  useEffect(() => {
    if (token) {
      // If the profile step is not completed, trigger a refetch
      if (user?.profile_steps !== 10) {
        refetch();
      }

      // Check if token is valid
      if (!token || isError || (tokenCheckData && tokenCheckData.status_code !== 200)) {
        navigate("/login"); // Redirect to login if token is invalid
      } else if (tokenCheckData && tokenCheckData.status_code === 200) {
        dispatch(setUser(tokenCheckData.data.user)); // Set the user data in redux
      }
    }
  }, [token, user, isError, tokenCheckData, refetch, dispatch, navigate]);

  return { tokenCheckData, refetch };
};
