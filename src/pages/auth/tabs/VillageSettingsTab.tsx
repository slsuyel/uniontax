import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input, message, Tabs } from "antd";
import Loader from "@/components/reusable/Loader";

// Define the types for Village and VillageFormValues
interface Village {
  id: string;
  word_no: number;
  name_bn: string;
  name_en: string;
}

interface VillageFormValues {
  word_no: number;
  name_bn: string;
  name_en: string;
}

const VillageSettingsTab: React.FC = () => {
  const [villageData, setVillageData] = useState<Village[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateVillageModalVisible, setIsCreateVillageModalVisible] = useState(false);
  const [editingVillage, setEditingVillage] = useState<Village | null>(null);
  const [selectedWordNo, setSelectedWordNo] = useState<number | null>(null);

  const token = localStorage.getItem("token");

  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

  const apiUrl = `${BASE_API_URL}/user/unioun-info/village`; // Adjust the base URL for your API

  // Fetch villages by word_no
  const fetchVillagesByWordNo = async (wordNo: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}?word_no=${wordNo}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
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
      setIsLoading(false);
    }
  };

  // On initial render, fetch villages for word_no=1
  useEffect(() => {
    fetchVillagesByWordNo(1);
    setSelectedWordNo(1);
  }, []);

  // Handle word tab change
  const handleWordTabChange = (key: string) => {
    const wordNo = parseInt(key);
    setSelectedWordNo(wordNo);
    fetchVillagesByWordNo(wordNo);
  };

  const handleEditVillage = (village: Village) => {
    setEditingVillage(village);
    setIsModalVisible(true);
  };

  const handleCreateVillage = () => {
    setIsCreateVillageModalVisible(true);
  };

  const handleDeleteVillage = async (villageId: string) => {
    try {
      const response = await fetch(`${apiUrl}/${villageId}?token=${token}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        message.success("গ্রাম সফলভাবে মুছে ফেলা হয়েছে।");
        fetchVillagesByWordNo(selectedWordNo!);
      } else {
        message.error("গ্রাম মুছে ফেলতে সমস্যা হয়েছে।");
      }
    } catch (error) {
      message.error("Error deleting village.");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setIsCreateVillageModalVisible(false);
    setEditingVillage(null);
  };

  const handleModalOk = async (values: VillageFormValues) => {
    if (editingVillage) {
      const response = await fetch(`${apiUrl}/${editingVillage.id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        message.success("গ্রাম সফলভাবে আপডেট করা হয়েছে।");
        setIsModalVisible(false);
        setEditingVillage(null);
        fetchVillagesByWordNo(selectedWordNo!);
      } else {
        message.error("গ্রাম আপডেট করতে সমস্যা হয়েছে।");
      }
    }
  };

  const handleCreateVillageOk = async (values: VillageFormValues) => {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      message.success("গ্রাম সফলভাবে তৈরি করা হয়েছে।");
      setIsCreateVillageModalVisible(false);
      fetchVillagesByWordNo(selectedWordNo!);
    } else {
      message.error("গ্রাম তৈরি করতে সমস্যা হয়েছে।");
    }
  };

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
    <>
      <Button type="primary" onClick={handleCreateVillage}>গ্রাম তৈরি করুন</Button>
      <Tabs onChange={handleWordTabChange} type="card">
        {Array.from({ length: 9 }, (_, index) => (
          <Tabs.TabPane tab={`ওয়ার্ড নম্বর ${index + 1}`} key={`${index + 1}`}>
            {isLoading ? <Loader /> : <Table dataSource={villageData} columns={columns} rowKey="id" />}
          </Tabs.TabPane>
        ))}
      </Tabs>

      {/* Edit Village Modal */}
      <Modal
        title="এডিট গ্রাম"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          initialValues={{
            word_no: editingVillage?.word_no,
            name_bn: editingVillage?.name_bn,
            name_en: editingVillage?.name_en,
          }}
          onFinish={handleModalOk}
          layout="vertical"
        >
          <Form.Item
            label="ওয়ার্ড নম্বর"
            name="word_no"
            rules={[{ required: true, message: "ওয়ার্ড নম্বর প্রদান করুন!" }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="গ্রামের নাম (বাংলা)"
            name="name_bn"
            rules={[{ required: true, message: "গ্রামের নাম (বাংলা) প্রদান করুন!" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="গ্রামের নাম (ইংরেজি)"
            name="name_en"
            rules={[{ required: true, message: "গ্রামের নাম (ইংরেজি) প্রদান করুন!" }]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              আপডেট করুন
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Create Village Modal */}
      <Modal
        title="গ্রাম তৈরি করুন"
        visible={isCreateVillageModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          onFinish={handleCreateVillageOk}
          layout="vertical"
        >
          <Form.Item
            label="ওয়ার্ড নম্বর"
            name="word_no"
            rules={[{ required: true, message: "ওয়ার্ড নম্বর প্রদান করুন!" }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="গ্রামের নাম (বাংলা)"
            name="name_bn"
            rules={[{ required: true, message: "গ্রামের নাম (বাংলা) প্রদান করুন!" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="গ্রামের নাম (ইংরেজি)"
            name="name_en"
            rules={[{ required: true, message: "গ্রামের নাম (ইংরেজি) প্রদান করুন!" }]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              সেভ করুন
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default VillageSettingsTab;
