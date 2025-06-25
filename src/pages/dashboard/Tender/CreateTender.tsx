// import React, { useState } from "react";
// import { useCreateTenderMutation } from "@/redux/api/tender/tenderApi";

// const CreateTender = () => {
//     const [createTender, { isLoading, error, isSuccess }] = useCreateTenderMutation();
//     const token = localStorage.getItem(`token`)
//     const [formData, setFormData] = useState({
//         tender_type: "",
//         memorial_no: "",
//         tender_name: "",
//         description: "",
//         tender_word_no: "",
//         govt_price: "",
//         form_price: "",
//         noticeDate: "",
//         form_buy_last_date: "",
//         tender_start: "",
//         tender_end: "",
//         tender_open: "",
//         tender_roles: "",

//     });


//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setFormData((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         try {
//             await createTender({ data: formData, token }).unwrap();
//             /* status_code ==201 */
//             alert("Tender created successfully");
//             setFormData({
//                 tender_type: "",
//                 memorial_no: "",
//                 tender_name: "",
//                 description: "",
//                 tender_word_no: "",
//                 govt_price: "",
//                 form_price: "",
//                 noticeDate: "",
//                 form_buy_last_date: "",
//                 tender_start: "",
//                 tender_end: "",
//                 tender_open: "",
//                 tender_roles: "",
//             });
//         } catch (err) {
//             alert("Failed to create tender");
//             console.error(err);
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <h2>Create Tender</h2>
//             <form onSubmit={handleSubmit}>
//                 {/* tender_type */}
//                 <div className="mb-3">
//                     <label htmlFor="tender_type" className="form-label">
//                         Tender Type
//                     </label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="tender_type"
//                         name="tender_type"
//                         value={formData.tender_type}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* memorial_no */}
//                 <div className="mb-3">
//                     <label htmlFor="memorial_no" className="form-label">
//                         Memorial No
//                     </label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="memorial_no"
//                         name="memorial_no"
//                         value={formData.memorial_no}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* tender_name */}
//                 <div className="mb-3">
//                     <label htmlFor="tender_name" className="form-label">
//                         Tender Name
//                     </label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="tender_name"
//                         name="tender_name"
//                         value={formData.tender_name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* description */}
//                 <div className="mb-3">
//                     <label htmlFor="description" className="form-label">
//                         Description
//                     </label>
//                     <textarea
//                         className="form-control"
//                         id="description"
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         rows={3}
//                         required
//                     />
//                 </div>

//                 {/* tender_word_no */}
//                 <div className="mb-3">
//                     <label htmlFor="tender_word_no" className="form-label">
//                         Tender Word No
//                     </label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="tender_word_no"
//                         name="tender_word_no"
//                         value={formData.tender_word_no}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* govt_price */}
//                 <div className="mb-3">
//                     <label htmlFor="govt_price" className="form-label">
//                         Govt Price
//                     </label>
//                     <input
//                         type="number"
//                         className="form-control"
//                         id="govt_price"
//                         name="govt_price"
//                         value={formData.govt_price}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* form_price */}
//                 <div className="mb-3">
//                     <label htmlFor="form_price" className="form-label">
//                         Form Price
//                     </label>
//                     <input
//                         type="number"
//                         className="form-control"
//                         id="form_price"
//                         name="form_price"
//                         value={formData.form_price}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* noticeDate */}
//                 <div className="mb-3">
//                     <label htmlFor="noticeDate" className="form-label">
//                         Notice Date & Time
//                     </label>
//                     <input
//                         type="datetime-local"
//                         className="form-control"
//                         id="noticeDate"
//                         name="noticeDate"
//                         value={formData.noticeDate}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* form_buy_last_date */}
//                 <div className="mb-3">
//                     <label htmlFor="form_buy_last_date" className="form-label">
//                         Form Buy Last Date & Time
//                     </label>
//                     <input
//                         type="datetime-local"
//                         className="form-control"
//                         id="form_buy_last_date"
//                         name="form_buy_last_date"
//                         value={formData.form_buy_last_date}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* tender_start */}
//                 <div className="mb-3">
//                     <label htmlFor="tender_start" className="form-label">
//                         Tender Start Date & Time
//                     </label>
//                     <input
//                         type="datetime-local"
//                         className="form-control"
//                         id="tender_start"
//                         name="tender_start"
//                         value={formData.tender_start}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* tender_end */}
//                 <div className="mb-3">
//                     <label htmlFor="tender_end" className="form-label">
//                         Tender End Date & Time
//                     </label>
//                     <input
//                         type="datetime-local"
//                         className="form-control"
//                         id="tender_end"
//                         name="tender_end"
//                         value={formData.tender_end}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* tender_open */}
//                 <div className="mb-3">
//                     <label htmlFor="tender_open" className="form-label">
//                         Tender Open Date & Time
//                     </label>
//                     <input
//                         type="datetime-local"
//                         className="form-control"
//                         id="tender_open"
//                         name="tender_open"
//                         value={formData.tender_open}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* tender_roles */}
//                 <div className="mb-3">
//                     <label htmlFor="tender_roles" className="form-label">
//                         Tender Roles (HTML allowed)
//                     </label>
//                     <textarea
//                         className="form-control"
//                         id="tender_roles"
//                         name="tender_roles"
//                         value={formData.tender_roles}
//                         onChange={handleChange}
//                         rows={4}
//                         required
//                     />
//                 </div>




//                 <button type="submit" className="btn btn-primary" disabled={isLoading}>
//                     {isLoading ? "Saving..." : "Create Tender"}
//                 </button>

//                 {error && (
//                     <div className="alert alert-danger mt-3">
//                         Error creating tender. Please try again.
//                     </div>
//                 )}

//                 {isSuccess && (
//                     <div className="alert alert-success mt-3">
//                         Tender created successfully!
//                     </div>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default CreateTender;

"use client"

import type React from "react"
import { useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { useCreateTenderMutation } from "@/redux/api/tender/tenderApi"

const CreateTender = () => {
    const [createTender, { isLoading, error, isSuccess }] = useCreateTenderMutation()
    const token = localStorage.getItem(`token`)
    const [formData, setFormData] = useState({
        tender_type: "",
        memorial_no: "",
        tender_name: "",
        description: "",
        tender_word_no: "",
        govt_price: "",
        form_price: "",
        noticeDate: "",
        form_buy_last_date: "",
        tender_start: "",
        tender_end: "",
        tender_open: "",
        tender_roles: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleEditorChange = (content: string) => {
        setFormData((prev) => ({
            ...prev,
            tender_roles: content,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await createTender({ data: formData, token }).unwrap()
            alert("Tender created successfully")
            setFormData({
                tender_type: "",
                memorial_no: "",
                tender_name: "",
                description: "",
                tender_word_no: "",
                govt_price: "",
                form_price: "",
                noticeDate: "",
                form_buy_last_date: "",
                tender_start: "",
                tender_end: "",
                tender_open: "",
                tender_roles: "",
            })
        } catch (err) {
            alert("Failed to create tender")
            console.error(err)
        }
    }

    return (
        <div className="container-fluid py-4">
            <div className="row justify-content-center">
                <div className="col-lg-10 col-xl-8">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary text-white py-3">
                            <h2 className="card-title mb-0 text-center">
                                <i className="fas fa-file-contract me-2"></i>
                                Create New Tender
                            </h2>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* Basic Information Section */}
                                    <div className="col-12">
                                        <h5 className="text-primary border-bottom pb-2 mb-4">
                                            <i className="fas fa-info-circle me-2"></i>
                                            Basic Information
                                        </h5>
                                    </div>

                                    {/* tender_type */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="tender_type" className="form-label fw-semibold">
                                            <i className="fas fa-tag me-1"></i>
                                            Tender Type <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="tender_type"
                                            name="tender_type"
                                            value={formData.tender_type}
                                            onChange={handleChange}
                                            placeholder="Enter tender type"
                                            required
                                        />
                                    </div>

                                    {/* memorial_no */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="memorial_no" className="form-label fw-semibold">
                                            <i className="fas fa-hashtag me-1"></i>
                                            Memorial No <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="memorial_no"
                                            name="memorial_no"
                                            value={formData.memorial_no}
                                            onChange={handleChange}
                                            placeholder="Enter memorial number"
                                            required
                                        />
                                    </div>

                                    {/* tender_name */}
                                    <div className="col-12 mb-3">
                                        <label htmlFor="tender_name" className="form-label fw-semibold">
                                            <i className="fas fa-signature me-1"></i>
                                            Tender Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="tender_name"
                                            name="tender_name"
                                            value={formData.tender_name}
                                            onChange={handleChange}
                                            placeholder="Enter tender name"
                                            required
                                        />
                                    </div>

                                    {/* description */}
                                    <div className="col-12 mb-4">
                                        <label htmlFor="description" className="form-label fw-semibold">
                                            <i className="fas fa-align-left me-1"></i>
                                            Description <span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="Enter tender description"
                                            required
                                        />
                                    </div>

                                    {/* Financial Information Section */}
                                    <div className="col-12">
                                        <h5 className="text-success border-bottom pb-2 mb-4">
                                            <i className="fas fa-dollar-sign me-2"></i>
                                            Financial Information
                                        </h5>
                                    </div>

                                    {/* tender_word_no */}
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="tender_word_no" className="form-label fw-semibold">
                                            <i className="fas fa-file-alt me-1"></i>
                                            Tender Word No <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="tender_word_no"
                                            name="tender_word_no"
                                            value={formData.tender_word_no}
                                            onChange={handleChange}
                                            placeholder="Enter tender word number"
                                            required
                                        />
                                    </div>

                                    {/* govt_price */}
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="govt_price" className="form-label fw-semibold">
                                            <i className="fas fa-coins me-1"></i>
                                            Govt Price <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="govt_price"
                                                name="govt_price"
                                                value={formData.govt_price}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* form_price */}
                                    <div className="col-md-4 mb-4">
                                        <label htmlFor="form_price" className="form-label fw-semibold">
                                            <i className="fas fa-receipt me-1"></i>
                                            Form Price <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="form_price"
                                                name="form_price"
                                                value={formData.form_price}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Timeline Section */}
                                    <div className="col-12">
                                        <h5 className="text-warning border-bottom pb-2 mb-4">
                                            <i className="fas fa-calendar-alt me-2"></i>
                                            Timeline Information
                                        </h5>
                                    </div>

                                    {/* noticeDate */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="noticeDate" className="form-label fw-semibold">
                                            <i className="fas fa-bell me-1"></i>
                                            Notice Date & Time <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="noticeDate"
                                            name="noticeDate"
                                            value={formData.noticeDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* form_buy_last_date */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="form_buy_last_date" className="form-label fw-semibold">
                                            <i className="fas fa-shopping-cart me-1"></i>
                                            Form Buy Last Date & Time <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="form_buy_last_date"
                                            name="form_buy_last_date"
                                            value={formData.form_buy_last_date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* tender_start */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="tender_start" className="form-label fw-semibold">
                                            <i className="fas fa-play me-1"></i>
                                            Tender Start Date & Time <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="tender_start"
                                            name="tender_start"
                                            value={formData.tender_start}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* tender_end */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="tender_end" className="form-label fw-semibold">
                                            <i className="fas fa-stop me-1"></i>
                                            Tender End Date & Time <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="tender_end"
                                            name="tender_end"
                                            value={formData.tender_end}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* tender_open */}
                                    <div className="col-12 mb-4">
                                        <label htmlFor="tender_open" className="form-label fw-semibold">
                                            <i className="fas fa-unlock me-1"></i>
                                            Tender Open Date & Time <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="tender_open"
                                            name="tender_open"
                                            value={formData.tender_open}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Tender Rules Section */}
                                    <div className="col-12">
                                        <h5 className="text-info border-bottom pb-2 mb-4">
                                            <i className="fas fa-gavel me-2"></i>
                                            Tender Rules & Requirements
                                        </h5>
                                    </div>

                                    {/* tender_roles with TinyMCE */}
                                    <div className="col-12 mb-4">
                                        <label htmlFor="tender_roles" className="form-label fw-semibold">
                                            <i className="fas fa-list-ul me-1"></i>
                                            Tender Rules <span className="text-danger">*</span>
                                        </label>
                                        <div className="border rounded">
                                            <Editor
                                                apiKey="697ehuev0q1uyp3lahblnx5fpb9mx2ef3krcjvnhmy3ob9fb" // Replace with your actual API key
                                                value={formData.tender_roles}
                                                onEditorChange={handleEditorChange}
                                                init={{
                                                    height: 400,
                                                    menubar: true,
                                                    plugins: [
                                                        "advlist",
                                                        "autolink",
                                                        "lists",
                                                        "link",
                                                        "image",
                                                        "charmap",
                                                        "preview",
                                                        "anchor",
                                                        "searchreplace",
                                                        "visualblocks",
                                                        "code",
                                                        "fullscreen",
                                                        "insertdatetime",
                                                        "media",
                                                        "table",
                                                        "help",
                                                        "wordcount",
                                                    ],
                                                    toolbar:
                                                        "undo redo | blocks | " +
                                                        "bold italic forecolor | alignleft aligncenter " +
                                                        "alignright alignjustify | bullist numlist outdent indent | " +
                                                        "removeformat | help",
                                                    content_style:
                                                        "body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }",
                                                    placeholder: "Enter tender rules and requirements...",
                                                    branding: false,
                                                    resize: false,
                                                    statusbar: true,
                                                    elementpath: false,
                                                    content_css: false,
                                                    skin: "oxide",

                                                }}
                                            />
                                        </div>
                                        <div className="form-text">
                                            <i className="fas fa-info-circle me-1"></i>
                                            Use the rich text editor to format tender rules and requirements with HTML support.
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="row">
                                    <div className="col-12">
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                            <button type="submit" className="btn btn-primary btn-lg px-5 me-md-2" disabled={isLoading}>
                                                {isLoading ? (
                                                    <>
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                            aria-hidden="true"
                                                        ></span>
                                                        Creating Tender...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-save me-2"></i>
                                                        Create Tender
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-lg px-5"
                                                onClick={() => {
                                                    if (window.confirm("Are you sure you want to reset the form?")) {
                                                        setFormData({
                                                            tender_type: "",
                                                            memorial_no: "",
                                                            tender_name: "",
                                                            description: "",
                                                            tender_word_no: "",
                                                            govt_price: "",
                                                            form_price: "",
                                                            noticeDate: "",
                                                            form_buy_last_date: "",
                                                            tender_start: "",
                                                            tender_end: "",
                                                            tender_open: "",
                                                            tender_roles: "",
                                                        })
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-undo me-2"></i>
                                                Reset Form
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Error Alert */}
                                {error && (
                                    <div className="alert alert-danger mt-4 d-flex align-items-center" role="alert">
                                        <i className="fas fa-exclamation-triangle me-2"></i>
                                        <div>
                                            <strong>Error!</strong> Failed to create tender. Please check your input and try again.
                                        </div>
                                    </div>
                                )}

                                {/* Success Alert */}
                                {isSuccess && (
                                    <div className="alert alert-success mt-4 d-flex align-items-center" role="alert">
                                        <i className="fas fa-check-circle me-2"></i>
                                        <div>
                                            <strong>Success!</strong> Tender has been created successfully!
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTender
