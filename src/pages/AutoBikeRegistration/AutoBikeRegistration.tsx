/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, Select, message, Checkbox, } from 'antd';

import addressFields from '../ApplicationForm/addressFields';
import { useAppSelector } from '@/redux/features/hooks';
import { RootState } from '@/redux/features/store';
import { useBikeRegistrationMutation } from '@/redux/api/sonod/sonodApi';
import { useState } from 'react';

const { Option } = Select;

const AutoBikeRegistration = () => {
    const [bikeRegistration, { isLoading }] = useBikeRegistrationMutation()
    const unionInfo = useAppSelector((state: RootState) => state.union.unionInfo);
    const [form] = Form.useForm();
    const postOffices = unionInfo?.post_offices || [];
    const addressFieldsProps = { form, postOffices };

    const [holdingPromanok, setHoldingPromanok] = useState<File | null>(null);
    const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
    const [nationalIdCopy, setNationalIdCopy] = useState<File | null>(null);
    const [autoBikeReceipt, setAutoBikeReceipt] = useState<File | null>(null);
    const [previousLicenseCopy, setPreviousLicenseCopy] = useState<File | null>(null);
    const [affidavitCopy, setAffidavitCopy] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    // Handle form submission
    const onFinish = async (values: any) => {
        const formData = new FormData();

        // Append files if they exist
        if (passportPhoto) formData.append("passport_photo", passportPhoto);
        if (nationalIdCopy) formData.append("national_id_copy", nationalIdCopy);
        if (autoBikeReceipt) formData.append("auto_bike_receipt", autoBikeReceipt);
        if (previousLicenseCopy) formData.append("previous_license_copy", previousLicenseCopy);
        if (affidavitCopy) formData.append("affidavit_copy", affidavitCopy);
        if (holdingPromanok) formData.append("holding_tax_promanok", holdingPromanok);

        // Append additional metadata (non-file fields)
        formData.append("union_name", unionInfo?.short_name_e || '');
        formData.append("s_uri", window.origin + "/payment-success");
        formData.append("f_uri", window.origin + "/payment-failed");
        formData.append("c_uri", window.origin + "/payment-cancel");

        // Append all other form values (excluding files)
        Object.keys(values).forEach((key) => {
            if (
                key !== "holding_tax_promanok" &&
                key !== "passport_photo" &&
                key !== "national_id_copy" &&
                key !== "auto_bike_receipt" &&
                key !== "previous_license_copy" &&
                key !== "affidavit_copy"
            ) {
                formData.append(key, values[key]);
            }
        });

        try {
            const res = await bikeRegistration(formData).unwrap();
            message.success("You are redirect to payment gateway");
            window.location.href = res.data.redirect_url;
        } catch (error) {
            message.error("Failed to submit the form.");
            console.error(error);
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        if (errorInfo?.errorFields?.length > 0) {
            form.scrollToField(errorInfo.errorFields[0].name);
        }
    };
    return (
        <div className="container my-3">
            <Form form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                initialValues={{
                    // Application Info
                    fiscal_year: '২০২৪-২৫',
                    application_type: 'নতুন',

                    // Applicant Personal Info
                    applicant_name_bn: '',
                    applicant_name_en: '',
                    applicant_father_name: '',
                    applicant_mother_name: '',
                    applicant_gender: '',
                    nationality: '',
                    applicant_religion: '',
                    applicant_date_of_birth: '',
                    marital_status: '',
                    profession: '',
                    blood_group: '',
                    applicant_mobile: '',

                    // Holding Info
                    holding_owner_name: '',
                    holding_owner_relationship: '',
                    holding_owner_mobile: '',

                    // Address Info
                    division_id: '', // Dhaka division
                    district_id: '', // Dhaka district
                    upazila_id: '', // Savar upazila
                    union_id: '', // Ashulia union
                    ward_id: '',
                    post_office_id: '', // Ashulia post office
                    village: '',
                    postal_code: '',

                    // Emergency Contact
                    emergency_contact_name: '',
                    emergency_contact_phone: '',
                    emergency_contact_relation: '',
                    emergency_contact_national_id_number: '',

                    // Bike Information
                    auto_bike_purchase_date: '',
                    auto_bike_last_renew_date: '',
                    auto_bike_last_regi_no: '',
                    auto_bike_supplier_name: '',
                    auto_bike_supplier_address: '',
                    auto_bike_supplier_mobile: '',

                    // Documents (these would be handled via file upload state)
                    passport_photo: null,
                    national_id_copy: null,
                    auto_bike_receipt: null,
                    previous_license_copy: null,
                    affidavit_copy: null,

                    // Confirmation
                    confirmation: true
                }}


            >
                <div
                    className="panel-heading"
                    style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        background: "green",
                        textAlign: "center",
                        color: "white",
                    }}
                >
                    'ব্যাটারি চালিত অটোরিক্সা/ইজিবাইক মালিকানা/তালিকাভুক্তি/নিবন্ধন আবেদন ফরম'
                </div>

                <div className="form-pannel">
                    <div className="row">

                        <div className="col-md-12">
                            <div className="app-heading">আবেদনকারীর তথ্য</div>
                        </div>


                        <div className="col-md-4">
                            <Form.Item label="অর্থ বছর" name="fiscal_year" rules={[{ required: true, message: "অর্থ বছর নির্বাচন করুন" }]}>
                                <Select placeholder="অর্থ বছর নির্বাচন করুন" style={{ height: 40, width: "100%" }}>
                                    <Option value="২০২৫-২৬">২০২৫-২৬</Option>
                                    <Option value="২০২৪-২৫">২০২৪-২৫</Option>
                                    <Option value="২০২৩-২৪">২০২৩-২৪</Option>
                                    <Option value="২০২২-২৩">২০২২-২৩</Option>
                                    <Option value="২০২১-২২">২০২১-২২</Option>
                                    <Option value="২০২০-২১">২০২০-২১</Option>
                                    <Option value="২০১৯-২০">২০১৯-২০</Option>
                                    <Option value="২০১৮-১৯">২০১৮-১৯</Option>
                                    <Option value="২০১৭-১৮">২০১৭-১৮</Option>
                                    <Option value="২০১৬-১৭">২০১৬-১৭</Option>
                                </Select>
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item label="আবেদনের ধরন" name="application_type" rules={[{ required: true, message: "আবেদনের ধরন নির্বাচন করুন" }]}>
                                <Select placeholder="আবেদনের ধরন নির্বাচন করুন" style={{ height: 40, width: "100%" }}>
                                    <Option value="নতুন">নতুন</Option>
                                    <Option value="নবায়ন">নবায়ন</Option>
                                    <Option value="সংশোধন">সংশোধন</Option>
                                </Select>
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item label="আবেদনকারীর নাম" name="applicant_name_bn" rules={[{ required: true, message: "দয়া করে আবেদনকারীর নাম লিখুন" }]}>
                                <Input style={{ height: 40, width: "100%" }} />
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item label="আবেদনকারীর নাম (English)" name="applicant_name_en" rules={[{ required: true, message: "Please enter applicant's name in English" }]}>
                                <Input style={{ height: 40, width: "100%" }} />
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item label="পিতা/স্বামীর নাম" name="applicant_father_name" rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}>
                                <Input style={{ height: 40, width: "100%" }} />
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item label="মাতার নাম" name="applicant_mother_name" rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}>
                                <Input style={{ height: 40, width: "100%" }} />
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item label="লিঙ্গ (Gender)" name="applicant_gender" rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}>
                                <Select placeholder="লিঙ্গ নির্বাচন করুন" style={{ height: 40, width: "100%" }}>
                                    <Option value="পুরুষ">পুরুষ</Option>
                                    <Option value="মহিলা">মহিলা</Option>
                                </Select>
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item label="জাতীয়তা" name="nationality" rules={[{ required: true, message: "জাতীয়তা নির্বাচন করুন" }]}>
                                <Select placeholder="জাতীয়তা নির্বাচন করুন" style={{ height: 40, width: "100%" }}>
                                    <Option value="বাংলাদেশি">বাংলাদেশি</Option>
                                    <Option value="অন্যান্য">অন্যান্য</Option>
                                </Select>
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item label="ধর্ম" name="applicant_religion" rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}>
                                <Select placeholder="ধর্ম নির্বাচন করুন" style={{ height: 40, width: "100%" }}>
                                    <Option value="ইসলাম">ইসলাম</Option>
                                    <Option value="খ্রিস্টান">খ্রিস্টান</Option>
                                    <Option value="হিন্দু">হিন্দু</Option>
                                    <Option value="বৌদ্ধ">বৌদ্ধ</Option>

                                </Select>
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item
                                label="জন্ম তারিখ (মাস/দিন/বছর)"
                                name="applicant_date_of_birth"
                                rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}
                            >
                                <Input type="date" className="form-control" style={{ height: 40, width: "100%" }} />
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item label="বৈবাহিক অবস্থা" name="marital_status" rules={[{ required: true, message: "বৈবাহিক অবস্থা নির্বাচন করুন" }]}>
                                <Select placeholder="বৈবাহিক অবস্থা নির্বাচন করুন" style={{ height: 40, width: "100%" }}>
                                    <Option value="বিবাহিত">বিবাহিত</Option>
                                    <Option value="অবিবাহিত">অবিবাহিত</Option>
                                    <Option value="বিধবা">বিধবা</Option>
                                    <Option value="তালাকপ্রাপ্ত">তালাকপ্রাপ্ত</Option>
                                </Select>
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item label="পেশা" name="profession" rules={[{ required: true, message: "পেশা নির্বাচন করুন" }]}>
                                <Input style={{ height: 40, width: "100%" }} />
                            </Form.Item>
                        </div>


                        <fieldset className="border rounded p-3 mb-3 col-md-12">
                            <legend className="w-auto px-2" style={{ fontWeight: 'bold' }}>হোল্ডিং সম্পর্কিত তথ্য</legend>

                            <div className="row mx-auto">

                                <div className="col-md-4">
                                    <Form.Item label="হোল্ডিং নং" name="applicant_holding_tax_number">
                                        <Input
                                            style={{ height: 40, width: "100%" }}
                                            className="form-control"
                                        />
                                    </Form.Item>
                                </div>

                                <div className="col-md-4">
                                    <Form.Item label="হোল্ডিং মালিকের নাম" name="holding_owner_name">
                                        <Input
                                            style={{ height: 40, width: "100%" }}
                                            className="form-control"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="col-md-4">
                                    <Form.Item
                                        label="হোল্ডিং মালিকের সাথে সম্পর্ক"
                                        name="holding_owner_relationship"
                                    >
                                        <Select style={{ height: 40 }} placeholder="সম্পর্ক">
                                            <Select.Option value="নিজ">নিজ</Select.Option>
                                            <Select.Option value="ভাড়াটিয়া">ভাড়াটিয়া</Select.Option>
                                            <Select.Option value="পিতা">পিতা</Select.Option>
                                            <Select.Option value="মাতা">মাতা</Select.Option>
                                            <Select.Option value="স্ত্রী">স্ত্রী</Select.Option>
                                            <Select.Option value="পুত্র">পুত্র</Select.Option>
                                            <Select.Option value="কন্যা">কন্যা</Select.Option>
                                            <Select.Option value="স্বামী">স্বামী</Select.Option>
                                            <Select.Option value="ভাই">ভাই</Select.Option>
                                            <Select.Option value="ভাবি">ভাবি</Select.Option>
                                            <Select.Option value="বোন">বোন</Select.Option>
                                            <Select.Option value="নাতি">নাতি</Select.Option>
                                            <Select.Option value="নাতনি">নাতনি</Select.Option>

                                        </Select>
                                    </Form.Item>
                                </div>

                                <div className="col-md-4">
                                    <Form.Item label="হোল্ডিং মালিকের মোবাইল নম্বর" name="holding_owner_mobile">
                                        <Input
                                            style={{ height: 40, width: "100%" }}
                                            className="form-control"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </fieldset>

                        <div className="col-md-4">
                            <Form.Item label="রক্তের গ্রুপ" name="blood_group" rules={[{ required: true, message: "রক্তের গ্রুপ নির্বাচন করুন" }]}>
                                <Select placeholder="রক্তের গ্রুপ নির্বাচন করুন" style={{ height: 40, width: "100%" }}>
                                    <Option value="A+">A+</Option>
                                    <Option value="A-">A-</Option>
                                    <Option value="B+">B+</Option>
                                    <Option value="B-">B-</Option>
                                    <Option value="O+">O+</Option>
                                    <Option value="O-">O-</Option>
                                    <Option value="AB+">AB+</Option>
                                    <Option value="AB-">AB-</Option>
                                </Select>
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item
                                label="মোবাইল"
                                name="applicant_mobile"
                                rules={[
                                    { required: true, message: "দয়া করে আপনার মোবাইল নম্বর লিখুন" },
                                    { len: 11, message: "মোবাইল নম্বরটি ১১ অক্ষর হতে হবে" },
                                    { pattern: /^[0-9]+$/, message: "মোবাইল নম্বরটি শুধুমাত্র সংখ্যা হতে হবে" },
                                ]}
                            >
                                <Input style={{ height: 40, width: "100%" }} type="tel" />
                            </Form.Item>
                        </div>

                        {addressFields(addressFieldsProps)}


                        <div className="col-md-12">
                            <div className="app-heading">যোগাযোগ (জরুরী প্রয়োজনে)</div>
                        </div>


                        <div className="col-md-4">
                            <Form.Item
                                label="যোগাযোগের নাম"
                                name="emergency_contact_name"
                                rules={[{ required: true, message: "জরুরী যোগাযোগের নাম লিখুন" }]}
                            >
                                <Input style={{ height: 40, width: "100%" }} />
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item
                                label="যোগাযোগের মোবাইল নম্বর"
                                name="emergency_contact_phone"
                                rules={[
                                    { required: true, message: "দয়া করে মোবাইল নম্বর লিখুন" },
                                    { len: 11, message: "মোবাইল নম্বরটি ১১ অক্ষর হতে হবে" },
                                    { pattern: /^[0-9]+$/, message: "মোবাইল নম্বরটি শুধুমাত্র সংখ্যা হতে হবে" },
                                ]}
                            >
                                <Input style={{ height: 40, width: "100%" }} type="tel" />
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item
                                label="সম্পর্ক"
                                name="emergency_contact_relation"
                                rules={[{ required: true, message: "সম্পর্ক নির্বাচন করুন" }]}
                            >
                                <Select placeholder="সম্পর্ক নির্বাচন করুন" style={{ height: 40, width: "100%" }}>
                                    <Option value="মা">মা</Option>
                                    <Option value="বাবা">বাবা</Option>
                                    <Option value="ভাই">ভাই</Option>
                                    <Option value="বোন">বোন</Option>
                                    <Option value="স্বামী/স্ত্রী">স্বামী/স্ত্রী</Option>
                                    <Option value="অন্যান্য">অন্যান্য</Option>
                                </Select>
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item label="জাতীয় পরিচয়পত্র নং" name="emergency_contact_national_id_number" rules={[{ required: true, message: "জাতীয় পরিচয়পত্র" }]}>
                                <Input style={{ height: 40, width: "100%" }} />
                            </Form.Item>
                        </div>


                        <div className="col-md-12">
                            <div className="app-heading">ব্যাটারি চালিত অটোরিক্সা/ইজিবাইকের তথ্য</div>
                        </div>


                        <div className="col-md-4">
                            <Form.Item label=" ক্রয়ের তারিখ" name="auto_bike_purchase_date" rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}>
                                <Input style={{ height: 40, width: "100%" }} type="date" />
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item label="সর্বশেষ নবায়ন তারিখ" name="auto_bike_last_renew_date" rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}>
                                <Input style={{ height: 40, width: "100%" }} type="date" />
                            </Form.Item>
                        </div>
                        <div className="col-md-4">
                            <Form.Item label="পৌরসভা কর্তৃক ইতোপূর্বে প্রদত্ত নিবন্ধন নম্বর" name="auto_bike_last_regi_no" >
                                <Input style={{ height: 40, width: "100%" }} />
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item label="সরবরাহকারী প্রতিষ্ঠানের নাম" name="auto_bike_supplier_name" rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}>
                                <Input style={{ height: 40, width: "100%" }} />
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item label="প্রতিষ্ঠানের ঠিকানা" name="auto_bike_supplier_address" rules={[{ required: true, message: "এই তথ্যটি প্রয়োজন" }]}>
                                <Input style={{ height: 40, width: "100%" }} />
                            </Form.Item>
                        </div>


                        <div className="col-md-4">
                            <Form.Item
                                label="প্রতিষ্ঠানের মোবাইল নম্বর"
                                name="auto_bike_supplier_mobile"
                                rules={[
                                    { required: true, message: "দয়া করে প্রতিষ্ঠানের মোবাইল নম্বর লিখুন" },
                                    { len: 11, message: "মোবাইল নম্বরটি ১১ অক্ষর হতে হবে" },
                                    { pattern: /^[0-9]+$/, message: "মোবাইল নম্বরটি শুধুমাত্র সংখ্যা হতে হবে" },
                                ]}
                            >
                                <Input style={{ height: 40, width: "100%" }} type="tel" />
                            </Form.Item>
                        </div>


                        <div className="col-md-12">
                            <div className="app-heading">প্রদত্ত লিপি</div>
                        </div>


                        <div className="col-md-4">
                            <Form.Item
                                label="সদস্য তোলা পাসপোর্ট সাইজের ছবি"
                                name="passport_photo"
                                rules={[{ required: true, message: "পাসপোর্ট সাইজের ছবি আপলোড করুন" }]}
                            >
                                <Input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, setPassportPhoto)}
                                />
                            </Form.Item>
                        </div>

                        <div className="col-md-4">
                            <Form.Item
                                label="জাতীয় পরিচয়পত্র/জন্ম নিবন্ধন পত্রের ফটোকপি"
                                name="national_id_copy"
                            >
                                <Input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, setNationalIdCopy)}
                                />
                            </Form.Item>
                        </div>
                        <div className="col-md-4">
                            <Form.Item
                                label="হোল্ডিং ট্যাক্সের  প্রমাণক "
                                name="holding_tax_promanok"
                            >
                                <Input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, setHoldingPromanok)}
                                />
                            </Form.Item>
                        </div>

                        <div className="col-md-4">
                            <Form.Item
                                label="ব্যাটারি চালিত অটোরিক্সা/ইজিবাইক ক্রয়ের রশিদের ফটোকপি"
                                name="auto_bike_receipt"
                            >
                                <Input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, setAutoBikeReceipt)}
                                />
                            </Form.Item>
                        </div>

                        <div className="col-md-4">
                            <Form.Item
                                label="পূর্ববর্তী লাইসেন্সের মূল কপি"
                                name="previous_license_copy"
                            >
                                <Input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, setPreviousLicenseCopy)}
                                />
                            </Form.Item>
                        </div>

                        <div className="col-md-4">
                            <Form.Item
                                label="মালিকানা পরিবর্তন হলে এফিডেভিট এর ফটোকপি"
                                name="affidavit_copy"
                            >
                                <Input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, setAffidavitCopy)}
                                />
                            </Form.Item>
                        </div>


                        <div className="col-md-12">
                            <Form.Item
                                name="confirmation"
                                valuePropName="checked"
                                rules={[{ required: true, message: "আপনাকে শপথ বাক্যটি গ্রহণ করতে হবে!" }]}
                            >
                                <Checkbox required>
                                    "আমি এই মর্মে শপথ করছি যে, আবেদনপত্রে প্রদত্ত সব তথ্য সত্য। কোন মিথ্যা তথ্য দিয়ে থাকলে আমি আইনতঃ দন্ডনীয় হব।"
                                </Checkbox>
                            </Form.Item>
                        </div>

                        <div className="col-md-12">
                            <Form.Item>
                                <Button disabled={isLoading} loading={isLoading} type="primary" htmlType="submit" style={{ height: 40, width: "100%" }}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default AutoBikeRegistration;
