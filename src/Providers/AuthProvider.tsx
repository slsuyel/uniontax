import Loader from "@/components/reusable/Loader";
import { useTokenCheckQuery } from "@/redux/api/auth/authApi";
import { useAppDispatch } from "@/redux/features/hooks";

import { setUser } from "@/redux/features/user/userSlice";
import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useTokenCheckQuery(
    { token },
    { skip: !token }
  );

  useEffect(() => {
    if (!token || isError || (data && data.status_code !== 200)) {
      navigate("/login");
    } else if (data && data.status_code === 200) {
      dispatch(setUser(data.data.user));
    }
  }, [token, isError, data, navigate, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (data && data.status_code === 200) {
    return <>{children}</>;
  }
  return null;
};

export default AuthProvider;
