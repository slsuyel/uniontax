import React, { useState } from "react";
import { Form, Input, Button, Tabs, message, Table, Modal } from "antd";
import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import UnionProfile from "../dashboard/UnionProfile";
import {
  useBankDetailsQuery,
  useChangePasswordMutation,
  useSetBankAccountMutation,
  usePostOfficeListQuery
} from "@/redux/api/auth/authApi";
import Loader from "@/components/reusable/Loader";

const { TabPane } = Tabs;

const ProfilePage: React.FC = () => {
  const [setBankAccount, { isLoading }] = useSetBankAccountMutation();
  const token = localStorage.getItem("token");
  const [changePassword, { isLoading: chaningPass }] = useChangePasswordMutation();
  const { data, isLoading: getting } = useBankDetailsQuery(token);
  const { data: postOfficeData, isLoading: loadingPostOffices } = usePostOfficeListQuery(token);
  const [passwordForm] = Form.useForm();

  const [selectedWordNo, setSelectedWordNo] = useState<number | null>(null);
  const [villageData, setVillageData] = useState<Village[]>([]);
  const [loadingVillages, setLoadingVillages] = useState<boolean>(false);

  // States for modal handling
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingVillage, setEditingVillage] = useState<Village | null>(null);

  // New modal state for creating a village
  const [isCreateVillageModalVisible, setIsCreateVillageModalVisible] = useState(false);
  
  interface PasswordFormValues {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
  }

  const onPasswordFinish = async (values: PasswordFormValues) => {
    try {
      const res = await changePassword({ data: values, token }).unwrap();
      if (res.status_code === 200 && !res.isError) {
        message.success("পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে।");
      } else {
        const errorMessage =
          res.data?.message ||
          res.error?.message ||
          "An error occurred while updating the password.";
        message.error(errorMessage);
      }
    } catch (error) {
      message.error("An unexpected error occurred. Please try again.");
    }
  };

  interface BankFormValues {
    bank_name: string;
    branch_name: string;
    account_no: string;
    account_name: string;
    routing_no: string;
  }

  const handleBankFormSubmit = async (values: BankFormValues) => {
    const res = await setBankAccount({ data: values, token }).unwrap();
    if (res.status_code == 200) {
      message.success("ব্যাংক একাউন্ট সফলভাবে যোগ করা হয়েছে।");
    }
  };

  const fetchVillagesByWordNo = async (wordNo: number) => {
    setLoadingVillages(true);
    try {

      const response = await fetch(`https://api.uniontax.gov.bd/api/user/unioun-info/village?word_no=${wordNo}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}`,'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const result = await response.json();
        setVillageData(result.data || []);
      } else {
        message.error("Error fetching villages.");
      }
    } catch (error) {
      message.error("Error fetching villages.");
    } finally {
      setLoadingVillages(false);
    }
  };

  const handleWordTabChange = (key: string) => {
    const wordNo = parseInt(key);
    setSelectedWordNo(wordNo);
    fetchVillagesByWordNo(wordNo);
  };

  interface Village {
    id: string;
    name_bn: string;
    name_en: string;
    word_no: number;
  }

  const handleEditVillage = (village: Village) => {
    setEditingVillage(village);
    setIsModalVisible(true);
  };

  const handleCreateVillage = () => {
    setIsCreateVillageModalVisible(true);
  };

  const handleDeleteVillage = async (villageId: string) => {
    const response = await fetch(`https://api.uniontax.gov.bd/api/user/unioun-info/village/${villageId}?token=${token}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}`,'Content-Type': 'application/json' },
    });
    if (response.ok) {
      message.success("গ্রাম সফলভাবে মুছে ফেলা হয়েছে।");
      fetchVillagesByWordNo(selectedWordNo!);
    } else {
      message.error("গ্রাম মুছে ফেলতে সমস্যা হয়েছে।");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setIsCreateVillageModalVisible(false);
    setEditingVillage(null);
  };

  const handleModalOk = async (values: VillageFormValues) => {
    const response = await fetch(`https://api.uniontax.gov.bd/api/user/unioun-info/village/${editingVillage.id}`, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: { Authorization: `Bearer ${token}`,'Content-Type': 'application/json' },
    });
    if (response.ok) {
      message.success("গ্রাম সফলভাবে আপডেট করা হয়েছে।");
      setIsModalVisible(false);
      setEditingVillage(null);
      fetchVillagesByWordNo(selectedWordNo!);
    } else {
      message.error("গ্রাম আপডেট করতে সমস্যা হয়েছে।");
    }
  };

  const handleCreateVillageOk = async (values: VillageFormValues) => {
    const response = await fetch(`https://api.uniontax.gov.bd/api/user/unioun-info/village`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { Authorization: `Bearer ${token}`,'Content-Type': 'application/json' },
    });
    if (response.ok) {
      message.success("গ্রাম সফলভাবে তৈরি করা হয়েছে।");
      setIsCreateVillageModalVisible(false);
      fetchVillagesByWordNo(selectedWordNo!);
    } else {
      message.error("গ্রাম তৈরি করতে সমস্যা হয়েছে।");
    }
  };

  if (getting) {
    return <Loader />;
  }

  const columns = [
    {
      title: "ওয়ার্ড নম্বর",
      dataIndex: "word_no",
      key: "word_no",
    },
    {
      title: "গ্রামের নাম (বাংলা)",
      dataIndex: "name_bn",
      key: "name_bn",
    },
    {
      title: "গ্রামের নাম (ইংরেজি)",
      dataIndex: "name_en",
      key: "name_en",
    },
    {
      title: "অপশন",
      key: "action",
      render: (_: unknown, record: Village) => (
        <div>
          <Button onClick={() => handleEditVillage(record)} type="link">এডিট</Button>
          <Button onClick={() => handleDeleteVillage(record.id)} type="link" danger>মুছে ফেলুন</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container card p-4">
      <Breadcrumbs current="প্রোফাইল" />
      <Tabs defaultActiveKey="1">
        <TabPane tab="ইউনিয়ন প্রোফাইল" key="3">
          <UnionProfile />
        </TabPane>

        <TabPane tab="ব্যাংক অ্যাকাউন্ট সেটআপ" key="4">
          <Form initialValues={data?.data} onFinish={handleBankFormSubmit} className="row mx-auto" layout="vertical">
            <Form.Item className="col-md-6" label="ব্যাংকের নাম" name="bank_name">
              <Input style={{ height: 40 }} />
            </Form.Item>
            <Form.Item className="col-md-6" label="ব্রাঞ্চের নাম" name="branch_name">
              <Input style={{ height: 40 }} />
            </Form.Item>
            <Form.Item className="col-md-6" label="অ্যাকাউন্ট নম্বর" name="account_no">
              <Input style={{ height: 40 }} />
            </Form.Item>
            <Form.Item className="col-md-6" label="অ্যাকাউন্টের নাম" name="account_name">
              <Input style={{ height: 40 }} />
            </Form.Item>
            <Form.Item className="col-md-6" label="রাউটিং নম্বর" name="routing_no">
              <Input style={{ height: 40 }} />
            </Form.Item>
            <Form.Item className="col-md-12">
              <Button loading={isLoading} disabled={isLoading} type="primary" htmlType="submit">
                সংরক্ষণ করুন
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane tab="পাসওয়ার্ড পরিবর্তন" key="2">
          <Form className="row mx-auto" form={passwordForm} name="password_form" onFinish={onPasswordFinish} layout="vertical">
            <Form.Item className="col-md-6" label="বর্তমান পাসওয়ার্ড" name="current_password" rules={[{ required: true, message: "দয়া করে আপনার বর্তমান পাসওয়ার্ড লিখুন!" }]}> 
              <Input.Password style={{ height: 40 }} />
            </Form.Item>
            <Form.Item className="col-md-6" label="নতুন পাসওয়ার্ড" name="new_password" rules={[{ required: true, message: "দয়া করে আপনার নতুন পাসওয়ার্ড লিখুন!" }]}> 
              <Input.Password min={8} style={{ height: 40 }} />
            </Form.Item>
            <Form.Item className="col-md-6" label="নতুন পাসওয়ার্ড নিশ্চিত করুন" name="new_password_confirmation" dependencies={["new_password"]} rules={[({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue("new_password") === value) { return Promise.resolve(); } return Promise.reject(new Error("আপনার প্রবেশ করানো দুটি পাসওয়ার্ড মেলে না!")); } })]}> 
              <Input.Password min={8} style={{ height: 40 }} />
            </Form.Item>
            <Form.Item className="col-md-6">
              <Button disabled={chaningPass} loading={chaningPass} type="primary" htmlType="submit">পাসওয়ার্ড পরিবর্তন করুন</Button>
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane tab="গ্রাম সেটিংস" key="5">
          <Button type="primary" onClick={handleCreateVillage}>গ্রাম তৈরি করুন</Button>
          <Tabs onChange={handleWordTabChange} type="card">
            {Array.from({ length: 9 }, (_, index) => (
              <TabPane tab={`ওয়ার্ড নম্বর ${index + 1}`} key={`${index + 1}`}>
                {loadingVillages ? (
                  <Loader />
                ) : (
                  <Table
                    columns={columns}
                    dataSource={villageData}
                    rowKey="id"
                    pagination={false}
                  />
                )}
              </TabPane>
            ))}
          </Tabs>
        </TabPane>

        <TabPane tab="ডাকঘর" key="6">
            {loadingPostOffices ? <Loader /> : postOfficeData?.data?.map((post, index) => (
              <p key={index}>{post.name}</p>
            ))}
        </TabPane>
      </Tabs>

      {/* Create Village Modal */}
      <Modal
        title="গ্রাম তৈরি করুন"
        visible={isCreateVillageModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form onFinish={handleCreateVillageOk}>
          <Form.Item
            name="name_bn"
            label="গ্রামের নাম (বাংলা)"
            rules={[{ required: true, message: 'গ্রামের নাম (বাংলা) প্রয়োজন' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="name_en"
            label="গ্রামের নাম (ইংরেজি)"
            rules={[{ required: true, message: 'গ্রামের নাম (ইংরেজি) প্রয়োজন' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="word_no"
            label="ওয়ার্ড নম্বর"
            rules={[{ required: true, message: 'ওয়ার্ড নম্বর প্রয়োজন' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">
              গ্রাম তৈরি করুন
            </Button>
          </Form.Item>
        </Form>
      </Modal>



      {/* Edit Village Modal */}
      <Modal
        title="গ্রাম এডিট করুন"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          initialValues={editingVillage || {}}
          onFinish={handleModalOk} // Using handleModalOk on form submission
        >
          <Form.Item
            name="name_bn"
            label="গ্রামের নাম (বাংলা)"
            rules={[{ required: true, message: 'গ্রামের নাম (বাংলা) প্রয়োজন' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="name_en"
            label="গ্রামের নাম (ইংরেজি)"
            rules={[{ required: true, message: 'গ্রামের নাম (ইংরেজি) প্রয়োজন' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="word_no"
            label="ওয়ার্ড নম্বর"
            rules={[{ required: true, message: 'ওয়ার্ড নম্বর প্রয়োজন' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">
              আপডেট করুন
            </Button>
          </Form.Item>
        </Form>
      </Modal>


    </div>
  );
};

export default ProfilePage;
