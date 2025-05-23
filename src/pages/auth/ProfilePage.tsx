import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();
  
  const site_settings = useAppSelector((state: RootState) => state.union.site_settings);
  const is_union = site_settings?.union;

  // Dynamic labels based on is_union
  const labels = {
    organization: is_union == 'true' ? "ইউনিয়ন" : "পৌরসভা",
    organizationProfile: is_union == 'true' ? "ইউনিয়ন প্রোফাইল" : "পৌরসভা প্রোফাইল",
  };

  // Determine the initial tab from the query parameter (or default to "UnionProfile")
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'UnionProfile';

  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Handle tab change
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    // Update the URL to reflect the active tab
    navigate({
      pathname: location.pathname,
      search: `?tab=${key}`,
    });
  };

  // Sync the active tab with the URL when the component mounts
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabFromUrl = queryParams.get('tab') || 'UnionProfile';
    setActiveTab(tabFromUrl);
  }, [location]);

  return (
    <div className="container card p-4">
      <Breadcrumbs current="প্রোফাইল" />
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab={labels.organizationProfile} key="UnionProfile">
          <UnionProfileTab />
        </TabPane>
        <TabPane tab="ব্যাংক অ্যাকাউন্ট সেটআপ" key="BankAccount">
          <BankAccountTab />
        </TabPane>
        <TabPane tab="পাসওয়ার্ড পরিবর্তন" key="PasswordChange">
          <PasswordChangeTab />
        </TabPane>
        <TabPane tab="গ্রাম সেটিংস" key="VillageSettings">
          <VillageSettingsTab />
        </TabPane>
        <TabPane tab="ডাকঘর" key="PostOffice">
          <PostOfficeTab />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
