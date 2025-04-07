/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input, Checkbox, Tabs, message } from "antd";
import { useUserLoginMutation } from "@/redux/api/auth/authApi";
import { useAppDispatch } from "@/redux/features/hooks";
// import { RootState } from "@/redux/features/store";
import { useGetUnionInfoMutation } from "@/redux/api/user/userApi";
import { setUnionData } from "@/redux/features/union/unionSlice";

import type { RootState } from "@/redux/features/store"
import { useAppSelector } from "@/redux/features/hooks"


type LoginType = "chairman" | "entrepreneur" | "secretary";

const Login = () => {
  const site_settings = useAppSelector((state: RootState) => state.union.site_settings)


  // const user = useAppSelector((state: RootState) => state.user.user);
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginType, setLoginType] = useState<LoginType>("chairman");
  const [getUnionInfo, { isLoading: getting }] = useGetUnionInfoMutation();
  const dispatch = useAppDispatch();
  const loginConfig = {
    chairman: {
      endpoint: "user/login",
      buttonText: " লগইন",
    },
    entrepreneur: {
      endpoint: "uddokta/login",
      buttonText: " লগইন",
    },
    secretary: {
      endpoint: "user/login",
      buttonText: " লগইন",
    },
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);
  // console.log(user);
  // useEffect(() => {
  //   if (user) {
  //     if (user.position === "Secretary" || user.position === "Chairman") {
  //       navigate("/dashboard");
  //     } else if (user.position === "uddokta") {
  //       navigate("/uddokta");
  //     }
  //   } else {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await userLogin({
        email,
        password,
        endpoint: loginConfig[loginType].endpoint,
      }).unwrap();

      if (res.status_code === 200) {
        const upInfo = await getUnionInfo({
          unionName: res?.data?.user.unioun,
          token: res.data.token,
        }).unwrap();
        // console.log(upInfo);
        dispatch(
          setUnionData({
            unionInfo: upInfo.data.uniouninfos,
            sonodList: upInfo.data.sonod_name_lists,
          })
        );
        localStorage.setItem("token", res.data.token);
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberedPassword", password);
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
        }
        if (loginType === "chairman" || res.data.position === "chairman") {
          navigate("/dashboard");
        } else if (loginType === "entrepreneur" || res.data.uddokta) {
          navigate("/uddokta");
        } else {
          navigate(from);
        }
      } else {
        if (res.status_code === 401) {
          message.error("Unauthorized: Please check your email and password.");
        } else {
          console.error("Login error");
          message.error(`Login failed`);
        }
        console.error("Login failed", res);
      }
    } catch (error: any) {
      if (error.status === 401) {
        message.error("Unauthorized: Please check your email and password.");
      } else {
        console.error("Login error:", error);
      }
    }
  };

  const handleTabChange = (key: string) => {
    setLoginType(key as LoginType);
  };

  const tabItems = [
    { label: site_settings?.secritary_login_text || "", key: "secretary" },
    { label: site_settings?.chairman_login_text || "", key: "chairman" },
    { label: "নিয়মিত ব্যবহারকারী ", key: "entrepreneur" },
  ];

  return (
    <>
      <div className="row mx-auto py-5">
        <div className="col-md-4 mx-auto my-3">
          <div className="p-3 w-100 mx-auto border-0 rounded shadow py-5">
            <div className="d-flex justify-content-center w-100">
              <Tabs
                className=""
                defaultActiveKey="secretary"
                onChange={handleTabChange}
                items={tabItems}
              />
            </div>
            <form onSubmit={handleSubmit} className="px-3">
              <div className="form-group mb-2">
                <label
                  className="fs-5 my-1 text-secondary"
                  htmlFor="loginEmail"
                >
                  ইমেইল
                </label>
                <Input
                  required
                  id="loginEmail"
                  placeholder="ইমেইল লিখুন"
                  style={{ height: 40 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <label
                  className="fs-5 my-1 text-secondary"
                  htmlFor="loginPassword"
                >
                  পাসওয়ার্ড
                </label>
                <Input.Password
                  required
                  id="loginPassword"
                  placeholder="পাসওয়ার্ড দিন"
                  style={{ height: 40 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between mb-3">
                <div className="form-group">
                  <Checkbox
                    id="rememberMe"
                    className="text-color"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  >
                    মনে রাখুন
                  </Checkbox>
                </div>
                <div>
                  <Link to={"/reset-pass"}>পাসওয়ার্ড রিসেট করুন</Link>
                </div>
              </div>
              <div className="form-group">
                <button
                  disabled={isLoading || getting}
                  type="submit"
                  className="border-1 btn_main w-100"
                >
                  {isLoading || getting
                    ? "লগইন হচ্ছে ..."
                    : loginConfig[loginType].buttonText}
                </button>
              </div>
            </form>
            <div className="text-center mt-5">
              <img width="50px" height={"auto"} src="/bangladesh-govt.png" alt="bd-gov" />{" "}
              <h4 style={{ margin: "10px 0px 0px" }}>স্মার্ট বাংলাদেশ</h4>
              ক্যাশ লেস , পেপার লেস সেবা সিস্টেম
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
