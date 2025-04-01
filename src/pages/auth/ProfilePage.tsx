import React from "react";
import { Tabs } from "antd";
import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import UnionProfileTab from "./tabs/UnionProfileTab"; // Adjusted the path to match the relative location
import BankAccountTab from "./tabs/BankAccountTab"; // Adjusted the path to match the correct location
import PasswordChangeTab from "./tabs/PasswordChangeTab";
import VillageSettingsTab from "./tabs/VillageSettingsTab";
import PostOfficeTab from "./tabs/PostOfficeTab";

const { TabPane } = Tabs;

const ProfilePage: React.FC = () => {
  return (
    <div className="container card p-4">
      <Breadcrumbs current="প্রোফাইল" />
      <Tabs defaultActiveKey="1">
        <TabPane tab="ইউনিয়ন প্রোফাইল" key="3">
          <UnionProfileTab />
        </TabPane>
        <TabPane tab="ব্যাংক অ্যাকাউন্ট সেটআপ" key="4">
          <BankAccountTab />
        </TabPane>
        <TabPane tab="পাসওয়ার্ড পরিবর্তন" key="2">
          <PasswordChangeTab />
        </TabPane>
        <TabPane tab="গ্রাম সেটিংস" key="5">
          <VillageSettingsTab />
        </TabPane>
        <TabPane tab="ডাকঘর" key="6">
          <PostOfficeTab />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
