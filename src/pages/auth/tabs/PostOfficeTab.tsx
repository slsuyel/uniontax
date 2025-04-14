import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";

const PostOfficeTab: React.FC = () => {
  const token = localStorage.getItem("token"); // Ensure the token is available for authorization
  const [postOffices, setPostOffices] = useState<{ id: string; name_bn: string; name_en: string; post_code: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPostOffice, setSelectedPostOffice] = useState<{ id: string; name_bn: string; name_en: string; post_code: string } | null>(null);

  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;


  const apiUrl = `${BASE_API_URL}/user/unioun-info/post-office`;

  useEffect(() => {
    fetchPostOffices();
  }, []);

  // Fetch Post Offices
  const fetchPostOffices = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPostOffices(data.data || []);
      } else {
        message.error("ডাকঘরগুলি লোড করতে সমস্যা হয়েছে।");
      }
    } catch (error) {
      message.error("ডাকঘরগুলি লোড করতে সমস্যা হয়েছে।");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Edit Post Office
  const handleEditPostOffice = (record: { id: string; name_bn: string; name_en: string; post_code: string }) => {
    setSelectedPostOffice(record);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  // Handle Create Post Office
  const handleCreatePostOffice = () => {
    setIsEditing(false);
    setSelectedPostOffice(null);
    setIsModalVisible(true);
  };

  // Handle Save Post Office (Create or Update)
  const handleSavePostOffice = async (values: { name_bn: string; name_en: string; post_code: string }) => {
    if (isEditing && selectedPostOffice) {
      // Update Post Office
      const response = await fetch(`${apiUrl}/${selectedPostOffice.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name_bn: values.name_bn,
          name_en: values.name_en,
          post_code: values.post_code,
        }),
      });

      if (response.ok) {
        message.success("ডাকঘর সফলভাবে আপডেট করা হয়েছে।");
        fetchPostOffices(); // Refresh the list
      } else {
        message.error("ডাকঘর আপডেট করতে সমস্যা হয়েছে।");
      }
    } else {
      // Create Post Office
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name_bn: values.name_bn,
          name_en: values.name_en,
          post_code: values.post_code,
        }),
      });

      if (response.ok) {
        message.success("ডাকঘর সফলভাবে তৈরি হয়েছে।");
        fetchPostOffices(); // Refresh the list
      } else {
        message.error("ডাকঘর তৈরি করতে সমস্যা হয়েছে।");
      }
    }
    setIsModalVisible(false); // Close modal after saving
  };

  // Handle Delete Post Office
  const handleDeletePostOffice = async (postOfficeId: string) => {
    try {
      const response = await fetch(`${apiUrl}/${postOfficeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        message.success("ডাকঘর সফলভাবে মুছে ফেলা হয়েছে।");
        fetchPostOffices(); // Refresh the list
      } else {
        message.error("ডাকঘর মুছে ফেলতে সমস্যা হয়েছে।");
      }
    } catch (error) {
      message.error("ডাকঘর মুছে ফেলতে সমস্যা হয়েছে।");
    }
  };

  const columns = [
    {
      title: "বাংলা নাম",
      dataIndex: "name_bn",
      key: "name_bn",
    },
    {
      title: "English Name",
      dataIndex: "name_en",
      key: "name_en",
    },
    {
      title: "পোস্ট কোড",
      dataIndex: "post_code",
      key: "post_code",
    },
    {
      title: "অপশন",
      key: "action",
      render: (_: unknown, record: { id: string; name_bn: string; name_en: string; post_code: string }) => (
        <div>
          <Button onClick={() => handleEditPostOffice(record)} type="link">এডিট</Button>
          <Button onClick={() => handleDeletePostOffice(record.id)} type="link" danger>মুছে ফেলুন</Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={handleCreatePostOffice}>
        ডাকঘর তৈরি করুন
      </Button>
      <Table
        dataSource={postOffices}
        columns={columns}
        rowKey="id"
        loading={isLoading}
      />

      <Modal
        title={isEditing ? "এডিট ডাকঘর" : "নতুন ডাকঘর তৈরি করুন"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={{
            name_bn: isEditing ? selectedPostOffice?.name_bn : "", // Set initial value for editing
            name_en: isEditing ? selectedPostOffice?.name_en : "",
            post_code: isEditing ? selectedPostOffice?.post_code : "",
          }}
          onFinish={handleSavePostOffice}
          layout="vertical"
        >
          <Form.Item
            label="বাংলা নাম"
            name="name_bn"
            rules={[{ required: true, message: "দয়া করে পোস্ট অফিসের বাংলা নাম লিখুন!" }]}
          >
            <Input style={{ height: 40 }} />
          </Form.Item>

          <Form.Item
            label="English Name"
            name="name_en"
            rules={[{ required: true, message: "Please enter the English name!" }]}
          >
            <Input style={{ height: 40 }} />
          </Form.Item>

          <Form.Item
            label="পোস্ট কোড"
            name="post_code"
            rules={[{ required: true, message: "পোস্ট কোড লিখুন!" }]}
          >
            <Input style={{ height: 40 }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {isEditing ? "আপডেট করুন" : "সেভ করুন"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PostOfficeTab;
