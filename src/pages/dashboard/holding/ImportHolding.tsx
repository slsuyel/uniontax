"use client"

import { useState } from "react"
import { Upload, Button, message, Typography, Space } from "antd"
import { FileExcelOutlined, InboxOutlined } from "@ant-design/icons"
import type { UploadProps, UploadFile } from "antd"
import Breadcrumbs from "@/components/reusable/Breadcrumbs"
import { useImportHoldingMutation } from "@/redux/api/sonod/sonodApi"

const { Text } = Typography
const { Dragger } = Upload

const ImportHolding = () => {
    const token = localStorage.getItem("token")
    const [importHolding, { isLoading: uploading }] = useImportHoldingMutation()
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const props: UploadProps = {
        name: "file",
        multiple: false,
        accept: ".xlsx, .xls",
        fileList,
        beforeUpload: (file) => {
            const isExcel =
                file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                file.type === "application/vnd.ms-excel"

            if (!isExcel) {
                message.error("You can only upload Excel files!")
                return Upload.LIST_IGNORE
            }

            setFileList([file])
            return false // Prevent auto upload
        },
        onRemove: () => {
            setFileList([])
        },
        onChange(info) {
            if (info.file.status === "removed") {
                setFileList([])
            }
        },
    }

    const handleUpload = async () => {
        if (fileList.length === 0) {
            message.warning("Please select an Excel file first!");
            return;
        }
        const file = fileList[0] as unknown as File;
        const formData = new FormData();
        formData.append("file", file);
        const res = await importHolding({ token, formData }).unwrap();
        if (res.status_code == 200) {
            message.success('File uploaded successfully')
        }
    };


    return (
        <div className="card border-0 p-3">
            <Breadcrumbs current="হোল্ডিং ট্যাক্স" />

            <div className="card border-0 shadow-sm">
                <div className="row mx-auto">
                    <div className="col-md-10 mx-auto">
                        <div className="bg-light p-4 rounded-3 mb-4 upload-container">
                            <Dragger {...props} className="bg-white border-dashed" style={{ borderRadius: "8px" }}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined style={{ color: "#1677ff", fontSize: "48px" }} />
                                </p>
                                <p className="ant-upload-text fw-bold">Click or drag Excel file to this area to upload</p>
                                <p className="text-muted ant-upload-hint">
                                    Support for a single Excel file upload. Ensure your data follows the required format.
                                </p>
                            </Dragger>

                            {fileList.length > 0 && (
                                <div className="d-flex align-items-center mt-3">
                                    <FileExcelOutlined style={{ fontSize: "20px", color: "#52c41a" }} />
                                    <Text className="ms-2">{fileList[0].name}</Text>
                                </div>
                            )}

                            <div className="d-flex justify-content-end mt-4">
                                <Space>
                                    <Button
                                        onClick={() => setFileList([])}
                                        disabled={fileList.length === 0 || uploading}
                                        className="btn-outline-secondary"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={handleUpload}
                                        loading={uploading}
                                        disabled={fileList.length === 0}
                                        className="btn-primary"
                                    >
                                        {uploading ? "Uploading" : "Upload Now"}
                                    </Button>
                                </Space>
                            </div>
                        </div>

                        <div className="d-flex alert alert-info align-items-center">
                            <i className="bi bi-info-circle me-2"></i>
                            <div>
                                <p className="mb-0">
                                    অনুগ্রহ করে নিশ্চিত করুন যে আপনার এক্সেল ফাইলটি প্রয়োজনীয় টেমপ্লেট ফরম্যাট অনুসরণ করে।
                                    <a href="https://docs.google.com/spreadsheets/d/1wA7N0LDxkj_Zjjl1PRDh6C7ZvUUvNh0O/edit?usp=sharing&ouid=100850055606337083923&rtpof=true&sd=true" className="fw-bold ms-1">
                                        টেমপ্লেট ডাউনলোড করুন
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImportHolding

