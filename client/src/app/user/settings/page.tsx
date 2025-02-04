"use client";

import React, { useState } from "react";
import "@/styles/glow.css";
import UserProfileSettings from "@/components/UserSettingsPage/UserProfileSettings";
import UserAccountSettings from "@/components/UserSettingsPage/UserAccountSettings";
import UserCompleteYourProfile from "@/components/UserSettingsPage/UserCompleteYourProfile";
import { useAuthContext } from "@/providers/AuthProvider";
import withAuth from "@/providers/withAuth";

const buttonTransformation =
  "transform transition-all duration-200 hover:scale-105 hover:z-10 hover:shadow-lg active:scale-100";

enum SettingTabs {
  ACCOUNT,
  PROFILE,
}

function UserSettings() {
  const [settingsTab, setSettingsTab] = useState<SettingTabs>(
    SettingTabs.PROFILE
  );

  const { user, isLoading } = useAuthContext();

  if (isLoading) return <div>Loading...</div>;

  const handleAccountClick = () => {
    setSettingsTab(SettingTabs.ACCOUNT);
  };

  const handleProfileClick = () => {
    setSettingsTab(SettingTabs.PROFILE);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-start pt-4 min-h-screen">
      <nav className="w-full md:w-[85%] flex flex-row items-center justify-center md:justify-start pt-4">
        <header className="flex flex-row gap-8 items-center">
          <h1
            onClick={handleProfileClick}
            className={`text-xl text-white font-bold hover:${buttonTransformation} hover:cursor-pointer hover:text-mainPurple hover:underline`}
          >
            Profile
          </h1>
          <h1
            onClick={handleAccountClick}
            className={`text-xl text-white font-bold hover:${buttonTransformation} hover:cursor-pointer hover:text-mainPurple hover:underline`}
          >
            Account
          </h1>
        </header>
      </nav>
      <div className="flex flex-col-reverse gap-8 md:gap-4 md:flex md:flex-row-reverse justify-center items-center md:items-start w-full lg:mr-[10rem] md:pr-10">
        <UserCompleteYourProfile user={user} />
        {/**User profile settings */}
        {settingsTab === SettingTabs.PROFILE && (
          <UserProfileSettings
            user={user}
            buttonTransformation={buttonTransformation}
          />
        )}

        {settingsTab === SettingTabs.ACCOUNT && (
          <UserAccountSettings
            user={user}
            buttonTransformation={buttonTransformation}
          />
        )}
      </div>
    </div>
  );
}

export default withAuth(UserSettings);
