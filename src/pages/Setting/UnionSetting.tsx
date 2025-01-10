// import React, { useState } from "react";
// import { Button, Form, message, Input } from "antd";
// import { useUpdateUnionMutation } from "@/redux/api/auth/authApi";

// const UnionSetting = () => {
//   const [form] = Form.useForm();
//   const [updateUnion] = useUpdateUnionMutation(); // RTK Query mutation
//   const [files, setFiles] = useState({
//     web_logo: null,
//     sonod_logo: null,
//     c_signture: null,
//     u_image: null,
//     socib_signture: null,
//   });
//   const [thanaValue, setThanaValue] = useState(""); // Store the value of the thana input

//   // Handle input field changes
//   const handleThanaChange = (e) => {
//     setThanaValue(e.target.value);
//   };

//   // Handle file input changes
//   const handleFileChange = (e, fieldName) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFiles((prev) => ({ ...prev, [fieldName]: file }));
//       message.success(`${file.name} file selected successfully`);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     const token = localStorage.getItem("token"); // Replace with your token retrieval logic
//     const formData = new FormData();

//     // Append thana value to FormData
//     formData.append("thana", thanaValue);

//     // Append files to FormData
//     Object.entries(files).forEach(([key, file]) => {
//       if (file) {
//         formData.append(key, file);
//       }
//     });

//     // Debugging: Log FormData contents
//     for (let [key, value] of formData.entries()) {
//       console.log(key, value);
//     }

//     try {
//       const res = await updateUnion({ data: formData, token }).unwrap();
//       message.success("Data and files uploaded successfully!");
//       console.log("API Response:", res);
//     } catch (error) {
//       message.error("Failed to upload data and files.");
//       console.error("Upload Error:", error);
//     }
//   };

//   return (
//     <Form form={form} layout="vertical">
//       <div className="col-md-4">
//         <Form.Item label="উপজেলা (বাংলা)" name="thana">
//           <Input
//             style={{ height: 40 }}
//             name="thana"
//             value={thanaValue}
//             onChange={handleThanaChange}
//             className="form-control"
//           />
//         </Form.Item>
//       </div>

//       {Object.keys(files).map((fieldName) => (
//         <Form.Item
//           key={fieldName}
//           label={fieldName
//             .replace(/_/g, " ")
//             .replace(/\b\w/g, (char) => char.toUpperCase())}
//           name={fieldName}
//         >
//           <input
//             type="file"
//             onChange={(e) => handleFileChange(e, fieldName)}
//             accept="image/*"
//           />
//         </Form.Item>
//       ))}

//       <Form.Item>
//         <Button type="primary" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default UnionSetting;

const UnionSetting = () => {
  return <div></div>;
};

export default UnionSetting;
