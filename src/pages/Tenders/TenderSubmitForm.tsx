/* eslint-disable @typescript-eslint/no-explicit-any */

import { useDropTenderMutation } from "@/redux/api/tender/tenderApi";
import React from "react";
import { TTenderResponse } from "./ScheduleTender";
import { message } from "antd";
import CountdownTimerMin from "./CountdownTimerMin";

const convertToBanglaDate = (isoDate: string) => {
    const months = [
        "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
        "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
    ];

    const banglaDigits = (num: string) =>
        num.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);

    const dateObj = new Date(isoDate);
    const day = banglaDigits(String(dateObj.getDate()));
    const month = months[dateObj.getMonth()];
    const year = banglaDigits(String(dateObj.getFullYear()));

    return `${day} ${month} ${year}`;
};


const TenderSubmitForm = ({ data }: { data: TTenderResponse }) => {

    const [dropTender, { isLoading }] = useDropTenderMutation();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            const res = await dropTender({ data: formData }).unwrap();
            if (
                res?.isError === false &&
                res?.data?.redirect_url
            ) {
                window.location.href = res.data.redirect_url;
            }
        } catch (error) {
            console.error("❌ Error submitting tender:", error);
            message.error(` Error submitting tender`)
        }
    };

    console.log(data.tender_end_time);/* 2025-06-30T17:06 */

    return (
        <div className="container">
            <div className=" text-center mt-3">  <img src="/images/tender-banner.png" alt="" width={350} /></div>

            <CountdownTimerMin endTime={data.tender_end_time} />


            <div className="col-md-12 mt-3 my-3 card rounded p-2">
                <p>বিজ্ঞপ্তির তারিখ: {data?.tender_list?.noticeDate && convertToBanglaDate(data.tender_list.noticeDate)}</p>
                <p>স্মারক নং- {data?.tender_list?.memorial_no}</p>
                <p>নিলামের বিবরণ- {data?.tender_list?.description}</p>
            </div>


            <form
                onSubmit={handleSubmit}
            >
                <div className="row  card mb-4">
                    <div className="col-md-12 mt-3 d-none">
                        <div className="form-group">
                            <label className="mb-1" htmlFor="dorId">
                                দাখিলকৃত দরপত্র নম্বর
                            </label>
                            <input
                                required
                                type="hidden"
                                className="form-control"
                                id="dorId"
                                defaultValue={data.dorId}
                                name="dorId"
                            />
                        </div>
                        <div className="form-group">
                            <label className="mb-1" htmlFor="tender_id">
                                tender_id
                            </label>
                            <input
                                required
                                type="hidden"
                                className="form-control"
                                id="tender_id"
                                defaultValue={data.tender_list.id}
                                name="tender_id"
                            />
                        </div>
                    </div>


                    <div className="col-md-12 mt-3">
                        <div className="form-group">
                            <label className="mb-1" htmlFor="applicant_orgName">
                                দরপত্র দাখিলকারীর নাম
                            </label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                id="applicant_orgName"
                                name="applicant_orgName"
                            />
                        </div>
                    </div>

                    <div className="col-md-12 mt-3">
                        <div className="form-group">
                            <label className="mb-1" htmlFor="applicant_org_fatherName">
                                পিতার নাম
                            </label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                id="applicant_org_fatherName"
                                name="applicant_org_fatherName"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mt-3">
                            <div className="form-group">
                                <label className="mb-1" htmlFor="nidNo">
                                    জাতীয় পরিচয়পত্র নম্বর
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="nidNo"
                                    name="nidNo"
                                    maxLength={17}
                                />
                            </div>
                        </div>

                        <div className="col-md-6 mt-3">
                            <div className="form-group">
                                <label className="mb-1" htmlFor="nidDate">
                                    জন্ম তারিখ
                                </label>
                                <input
                                    required
                                    type="date"
                                    className="form-control"
                                    id="nidDate"
                                    name="nidDate"
                                />
                            </div>
                        </div>
                    </div>



                    <div className="col-md-12 mt-3 ">
                        <div className="form-group">
                            <label className="mb-1" htmlFor="address">
                                ঠিকানা
                            </label>
                        </div>
                        <div className="row">
                            <div className="col-md-3 mt-3">
                                <div className="form-group">
                                    <label className="mb-1" htmlFor="vill">
                                        গ্রাম
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="addvilless"
                                        name="vill"
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 mt-3">
                                <div className="form-group">
                                    <label className="mb-1" htmlFor="postoffice">
                                        ডাকঘর
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="postoffice"
                                        name="postoffice"
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 mt-3">
                                <div className="form-group">
                                    <label className="mb-1" htmlFor="thana">
                                        উপজেলা
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="thana"
                                        name="thana"
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 mt-3">
                                <div className="form-group">
                                    <label className="mb-1" htmlFor="distric">
                                        জেলা
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="distric"
                                        name="distric"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 mt-3">
                        <div className="form-group">
                            <label className="mb-1" htmlFor="mobile">
                                মোবাইল নম্বর
                            </label>
                            <input
                                required
                                type="tel"
                                className="form-control"
                                id="mobile"
                                name="mobile"
                                minLength={11}
                                maxLength={11}
                            />
                        </div>
                    </div>
                    <div className="col-md-12 mt-3">
                        <div className="form-group">
                            <label className="mb-1" htmlFor="DorAmount">
                                দাখিলকৃত দরের পরিমাণ (সর্ব নিম্ন দরপত্র দাখিল {Number(data.tender_list.govt_price) + 1} টাকা)
                            </label>
                            <input
                                required
                                type="number"
                                min={Number(data.tender_list.govt_price) + 1}
                                className="form-control"
                                id="DorAmount"
                                name="DorAmount"
                            />
                        </div>
                    </div>
                    <div className="col-md-12 mt-3">
                        <div className="form-group">
                            <label className="mb-1" htmlFor="DorAmountText">
                                কথায়
                            </label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                id="DorAmountText"
                                name="DorAmountText"
                            />
                        </div>
                    </div>
                    <div className="col-md-12 mt-3">
                        <div className="form-group">
                            <label className="mb-1" htmlFor="depositAmount">
                                ৫০% জামানত হিসেবে ব্যাংক ড্রাফট/পে অর্ডারের পরিমাণ (টাকা)
                            </label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                id="depositAmount"
                                name="depositAmount"
                            />
                        </div>
                    </div>
                    <div className="col-md-12 mt-3">
                        <div className="form-group">
                            <label className="mb-1" htmlFor="bank_draft_image">
                                ব্যাংক ড্রাফট/পে-অর্ডারের ছবি আপলোড করুন
                            </label>
                            <input
                                required
                                type="file"
                                className="form-control"
                                id="bank_draft_image"
                                name="bank_draft_image"
                            />
                        </div>
                    </div>
                </div>
                <button disabled={isLoading} type="submit" className="btn btn-info my-5">
                    দরপত্র দাখিল করুন
                </button>
            </form>
            <br />
            <br />
        </div>
    );
};

export default TenderSubmitForm;
