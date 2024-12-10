// import { Form, Input, Button, Select, Upload } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import { useParams } from 'react-router-dom';
// import { useState } from 'react';

// const HoldingAdd = () => {
//     const { word } = useParams()
//     const [form] = Form.useForm();

//     const [category, setCategory] = useState('');

//     const handleTaxType = (value: string) => {
//         setCategory(value);
//         console.log("Selected Category:", value);
//     };



//     const onFinish = (values: any) => {
//         console.log(values);
//     };


//     return (
//         <div className=" card p-4 mt-4">
//             <h4 className="mb-3">হোল্ডিং ট্যাক্স</h4>
//             <Form
//                 form={form}
//                 layout="vertical"
//                 onFinish={onFinish}
//                 initialValues={{
//                     word_no: word,
//                     category: 'হোল্ডিং ট্যাক্স এর ধরণ',
//                 }}
//             >
//                 <div className="row mx-auto">
//                     <div className="col-md-6">
//                         <Form.Item className=' my-1'
//                             label="হোল্ডিং নং"
//                             name="holding_no"

//                         >
//                             <Input style={{ height: 40 }} />
//                         </Form.Item>
//                     </div>
//                     <div className="col-md-6">
//                         <Form.Item className=' my-1'
//                             label="মালিকের নাম"
//                             name="maliker_name"

//                         >
//                             <Input style={{ height: 40 }} />
//                         </Form.Item>
//                     </div>
//                     <div className="col-md-6">
//                         <Form.Item className=' my-1'
//                             label="পিতা/স্বামীর নাম"
//                             name="father_or_samir_name"

//                         >
//                             <Input style={{ height: 40 }} />
//                         </Form.Item>
//                     </div>
//                     <div className="col-md-6">
//                         <Form.Item className=' my-1'
//                             label="গ্রামের নাম"
//                             name="gramer_name"

//                         >
//                             <Input style={{ height: 40 }} />
//                         </Form.Item>
//                     </div>
//                     <div className="col-md-6">
//                         <Form.Item className=' my-1'
//                             label="এনআইডি নং"
//                             name="nid_no"

//                         >
//                             <Input style={{ height: 40 }} />
//                         </Form.Item>
//                     </div>
//                     <div className="col-md-6">
//                         <Form.Item className=' my-1'
//                             label="মোবাইল নং"
//                             name="mobile_no"

//                         >
//                             <Input style={{ height: 40 }} />
//                         </Form.Item>
//                     </div>
//                     <div className="col-md-6">
//                         <Form.Item className=' my-1'
//                             label="ওয়ার্ড নং"
//                             name="word_no"


//                         >
//                             <Input disabled style={{ height: 40 }} />
//                         </Form.Item>
//                     </div>
//                     <div className="col-md-6">
//                         <Form.Item className=' my-1'
//                             label="হোল্ডিং ট্যাক্স এর ধরণ"
//                             name="category"


//                         >
//                             <Select
//                                 style={{ height: 40 }}
//                                 onChange={handleTaxType}
//                                 value={category}
//                             >
//                                 <Select.Option value="হোল্ডিং ট্যাক্স এর ধরণ">হোল্ডিং ট্যাক্স এর ধরণ</Select.Option>
//                                 <Select.Option value="ভাড়া">ভাড়া</Select.Option>
//                                 <Select.Option value="আংশিক ভাড়া">আংশিক ভাড়া</Select.Option>
//                                 <Select.Option value="মালিক নিজে বসবাসকারী">মালিক নিজে বসবাসকারী</Select.Option>
//                                 <Select.Option value="প্রতিষ্ঠান (সরকারি/আধা সরকারি/বেসরকারি/বাণিজ্যিক)">প্রতিষ্ঠান (সরকারি/আধা সরকারি/বেসরকারি/বাণিজ্যিক)</Select.Option>
//                             </Select>
//                         </Form.Item>
//                     </div>


//                     {category == 'প্রতিষ্ঠান (সরকারি/আধা সরকারি/বেসরকারি/বাণিজ্যিক)' &&
//                         <>
//                             <div className="col-md-6">
//                                 <Form.Item className=' my-1'
//                                     label="গৃহের বার্ষিক মূল্য"
//                                     name="griher_barsikh_mullo"
//                                 >
//                                     <Input style={{ height: 40 }} />
//                                 </Form.Item>
//                             </div>
//                             <div className="col-md-6">
//                                 <Form.Item className=' my-1'
//                                     label="জমির ভাড়া"
//                                     name="jomir_vara"
//                                 >
//                                     <Input style={{ height: 40 }} />
//                                 </Form.Item>
//                             </div>
//                         </>

//                     }

//                     {category == 'মালিক নিজে বসবাসকারী' &&
//                         <>
//                             <div className="col-md-6">
//                                 <Form.Item className=' my-1'
//                                     label="গৃহের বার্ষিক মূল্য"
//                                     name="griher_barsikh_mullo"
//                                 >
//                                     <Input style={{ height: 40 }} />
//                                 </Form.Item>
//                             </div>
//                             <div className="col-md-6">
//                                 <Form.Item className=' my-1'
//                                     label="জমির ভাড়া"
//                                     name="jomir_vara"
//                                 >
//                                     <Input style={{ height: 40 }} />
//                                 </Form.Item>
//                             </div>
//                         </>

//                     }






//                     {category == 'আংশিক ভাড়া' &&
//                         <>
//                             <div className="col-md-6">
//                                 <Form.Item className=' my-1'
//                                     label="গৃহের বার্ষিক মূল্য"
//                                     name="griher_barsikh_mullo"
//                                 >
//                                     <Input style={{ height: 40 }} />
//                                 </Form.Item>
//                             </div>
//                             <div className="col-md-6">
//                                 <Form.Item className=' my-1'
//                                     label="জমির ভাড়া"
//                                     name="jomir_vara"
//                                 >
//                                     <Input style={{ height: 40 }} />
//                                 </Form.Item>
//                             </div>


//                             <div className="col-md-6">
//                                 <Form.Item className=' my-1'
//                                     label="বার্ষিক ভাড়া"
//                                     name="barsikh_vara"
//                                 >
//                                     <Input style={{ height: 40 }} />
//                                 </Form.Item>
//                             </div>
//                         </>

//                     }


//                     {category == 'ভাড়া' &&
//                         <div className="col-md-6">
//                             <Form.Item className=' my-1'
//                                 label="বার্ষিক ভাড়া"
//                                 name="barsikh_vara"
//                             >
//                                 <Input style={{ height: 40 }} />
//                             </Form.Item>
//                         </div>

//                     }





//                     <div className="col-md-6">
//                         <Form.Item className=' my-1' label="মালিকের ছবি" name="image" valuePropName="fileList">
//                             <Upload action="/upload.do" listType="text">
//                                 <Button icon={<UploadOutlined />}>Choose file</Button>
//                             </Upload>
//                         </Form.Item>
//                     </div>
//                 </div>



//                 <Form.Item className="mt-4">
//                     <Button type="primary" htmlType="submit">
//                         Submit
//                     </Button>
//                 </Form.Item>
//             </Form>
//         </div>
//     );
// };

// export default HoldingAdd;
import { Form, Input, Button, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const HoldingAdd = () => {
    const { word } = useParams(); // Word number from URL params
    const [form] = Form.useForm();
    const [category, setCategory] = useState('');

    const handleTaxType = (value: string) => {
        setCategory(value);
    };

    const onFinish = (values: any) => {
        console.log("Form Submitted:", values);
    };

    return (
        <div className="card p-4 mt-4">
            <h4 className="mb-3">হোল্ডিং ট্যাক্স</h4>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    word_no: word,
                }}
            >
                <div className="row mx-auto">
                    {/* Static Fields */}
                    <div className="col-md-6">
                        <Form.Item label="হোল্ডিং নং" name="holding_no" className="my-1">
                            <Input style={{ height: 40 }} />
                        </Form.Item>
                    </div>
                    <div className="col-md-6">
                        <Form.Item label="মালিকের নাম" name="maliker_name" className="my-1">
                            <Input style={{ height: 40 }} />
                        </Form.Item>
                    </div>
                    <div className="col-md-6">
                        <Form.Item label="পিতা/স্বামীর নাম" name="father_or_samir_name" className="my-1">
                            <Input style={{ height: 40 }} />
                        </Form.Item>
                    </div>
                    <div className="col-md-6">
                        <Form.Item label="গ্রামের নাম" name="gramer_name" className="my-1">
                            <Input style={{ height: 40 }} />
                        </Form.Item>
                    </div>
                    <div className="col-md-6">
                        <Form.Item label="এনআইডি নং" name="nid_no" className="my-1">
                            <Input style={{ height: 40 }} />
                        </Form.Item>
                    </div>
                    <div className="col-md-6">
                        <Form.Item label="মোবাইল নং" name="mobile_no" className="my-1">
                            <Input style={{ height: 40 }} />
                        </Form.Item>
                    </div>
                    <div className="col-md-6">
                        <Form.Item label="ওয়ার্ড নং" name="word_no" className="my-1">
                            <Input disabled style={{ height: 40 }} />
                        </Form.Item>
                    </div>

                    {/* Category Selection */}
                    <div className="col-md-6">
                        <Form.Item required label="হোল্ডিং ট্যাক্স এর ধরণ" name="category" className="my-1">
                            <Select style={{ height: 40 }} onChange={handleTaxType} value={category}>

                                <Select.Option value="ভাড়া">ভাড়া</Select.Option>
                                <Select.Option value="আংশিক ভাড়া">আংশিক ভাড়া</Select.Option>
                                <Select.Option value="মালিক নিজে বসবাসকারী">মালিক নিজে বসবাসকারী</Select.Option>
                                <Select.Option value="প্রতিষ্ঠান (সরকারি/আধা সরকারি/বেসরকারি/বাণিজ্যিক)">প্রতিষ্ঠান (সরকারি/আধা সরকারি/বেসরকারি/বাণিজ্যিক)</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>

                    {/* Dynamic Fields Based on Category */}
                    {category === 'প্রতিষ্ঠান (সরকারি/আধা সরকারি/বেসরকারি/বাণিজ্যিক)' && (
                        <>
                            <div className="col-md-6">
                                <Form.Item label="গৃহের বার্ষিক মূল্য" name="griher_barsikh_mullo" className="my-1">
                                    <Input style={{ height: 40 }} />
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item label="জমির ভাড়া" name="jomir_vara" className="my-1">
                                    <Input style={{ height: 40 }} />
                                </Form.Item>
                            </div>

                            <div className="col-md-6">
                                <Form.Item label="প্রতিষ্ঠানের নাম" name="busnessName" className="my-1">
                                    <Input style={{ height: 40 }} />
                                </Form.Item>
                            </div>


                        </>
                    )}
                    {category === 'মালিক নিজে বসবাসকারী' && (
                        <>
                            <div className="col-md-6">
                                <Form.Item label="গৃহের বার্ষিক মূল্য" name="griher_barsikh_mullo" className="my-1">
                                    <Input style={{ height: 40 }} />
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item label="জমির ভাড়া" name="jomir_vara" className="my-1">
                                    <Input style={{ height: 40 }} />
                                </Form.Item>
                            </div>
                        </>
                    )}
                    {category === 'ভাড়া' && (
                        <div className="col-md-6">
                            <Form.Item label="বার্ষিক ভাড়া" name="barsikh_vara" className="my-1">
                                <Input style={{ height: 40 }} />
                            </Form.Item>
                        </div>
                    )}
                    {category === 'আংশিক ভাড়া' && (
                        <>
                            <div className="col-md-6">
                                <Form.Item label="গৃহের বার্ষিক মূল্য" name="griher_barsikh_mullo" className="my-1">
                                    <Input style={{ height: 40 }} />
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item label="জমির ভাড়া" name="jomir_vara" className="my-1">
                                    <Input style={{ height: 40 }} />
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item label="বার্ষিক ভাড়া" name="barsikh_vara" className="my-1">
                                    <Input style={{ height: 40 }} />
                                </Form.Item>
                            </div>
                        </>
                    )}


                    {/* Upload Field */}
                    <div className="col-md-6">
                        <Form.Item label="মালিকের ছবি" name="image" valuePropName="fileList" className="my-1">
                            <Upload action="/upload.do" listType="text">
                                <Button icon={<UploadOutlined />}>Choose file</Button>
                            </Upload>
                        </Form.Item>
                    </div>
                </div>

                {/* Submit Button */}
                <div className=' text-center'>
                    <Form.Item className="mt-4">
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default HoldingAdd;
