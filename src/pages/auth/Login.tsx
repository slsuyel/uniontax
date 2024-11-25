// /* eslint-disable @typescript-eslint/no-unused-vars */
// import  { useState } from "react";
// import { Link,  } from "react-router-dom";
// import { Input, Checkbox, } from "antd";

// import { Spinner } from "react-bootstrap";

// const Login = () => {
//   // const [login, { isLoading }] = useAdminLoginMutation();

//   // const navigate = useNavigate();
//   // const location = useLocation();
//   // const from = location.state?.from?.pathname || "/dashboard";
//   // const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e: { preventDefault: () => void }) => {

//   };

//   return (
//     <>
//       <div className="row mx-auto py-5 ">
//         <div className="col-md-4 mx-auto my-3">
//           <div className="p-3 w-100 mx-auto border-0 rounded shadow py-5">
//             <form onSubmit={handleSubmit} className="px-3">
//               <div className="form-group mb-2">
//                 <label
//                   className="fs-5 my-1 text-secondary"
//                   htmlFor="loginUsername"
//                 >
//                   Email
//                 </label>
//                 <Input
//                   id="loginUsername"
//                   placeholder="Enter Your Email"
//                   style={{ height: 35 }}
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>
//               <div className="form-group mb-2">
//                 <label
//                   className="fs-5 my-1 text-secondary"
//                   htmlFor="loginPassword"
//                 >
//                   Password
//                 </label>
//                 <Input.Password
//                   id="loginPassword"
//                   placeholder="Enter Password"
//                   style={{ height: 35 }}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//               <div className="d-flex justify-content-between mb-3">
//                 <div className="form-group ">
//                   <Checkbox id="rememberMe" className="text-color">
//                     Remember me
//                   </Checkbox>
//                 </div>
//                 <div>
//                   <Link to={"/reset-pass"}> Reset password</Link>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <button
//                   type="submit"
//                   className="border-1 btn_main w-100"
//                   disabled={loading}
//                 >
//                   {loading ? <Spinner /> : "Login"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

const Login = () => {
  return <div></div>;
};

export default Login;
