import React from "react";
import { Tabs } from "antd";
import Breadcrumbs from "@/components/reusable/Breadcrumbs";
import UnionProfileTab from "./tabs/UnionProfileTab";
import BankAccountTab from "./tabs/BankAccountTab";
import PasswordChangeTab from "./tabs/PasswordChangeTab";
import VillageSettingsTab from "./tabs/VillageSettingsTab";
import PostOfficeTab from "./tabs/PostOfficeTab";
import { useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";

const { TabPane } = Tabs;

const ProfilePage: React.FC = () => {
  const site_settings = useAppSelector((state: RootState) => state.union.site_settings);
  const is_union = site_settings?.union;

  // Dynamic labels based on is_union
  const labels = {
    organization: is_union == 'true' ? "ইউনিয়ন" : "পৌরসভা",
    organizationProfile: is_union == 'true' ? "ইউনিয়ন প্রোফাইল" : "পৌরসভা প্রোফাইল",
  };

  return (
    <div className="container card p-4">
      <Breadcrumbs current="প্রোফাইল" />
      <Tabs defaultActiveKey="1">
        <TabPane tab={labels.organizationProfile} key="3">
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