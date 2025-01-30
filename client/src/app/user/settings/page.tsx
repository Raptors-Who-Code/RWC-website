"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";
import ProfileSettings from "@/components/ProfileSettings";
import AccountSettings from "@/components/AccountSettings";

enum UserSettingsEnum {
  Profile,
  Account,
}

function UserSettings() {
  const [profileState, setProfileState] = useState<UserSettingsEnum>(
    UserSettingsEnum.Profile
  );

  const handleProfileClick = () => {
    setProfileState(UserSettingsEnum.Profile);
  };

  const handleAccountClick = () => {
    setProfileState(UserSettingsEnum.Account);
  };

  return (
    <div className="flex justify-center items-center pt-16 settings-col:pt-8 min-h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-6xl p-4 h-auto my-auto gap-8">
        {/* Settings Navigation */}
        <div className="flex flex-col gap-2 text-center settings-col:text-left w-full settings-col:w-1/4">
          <Label
            htmlFor="settings-nav"
            className="text-2xl font-bold text-center settings-col:text-left"
          >
            Settings
          </Label>
          <Card
            id="settings-nav"
            className="bg-lighterCardForProfile font-bold text-white border-none h-auto w-full md:w-[12rem] rounded-none shadow-2xl text-center md:text-left mx-auto md:mx-0"
          >
            <CardContent className="p-4 md:p-6">
              <ul className="flex flex-col gap-4">
                <li
                  className="text-lg text-center md:text-left hover:border-b-[1px] hover:border-mainPurple hover:cursor-pointer hover:text-mainPurple hover:pb-2"
                  onClick={handleProfileClick}
                >
                  PROFILE
                </li>
                <li
                  className="text-lg text-center md:text-left hover:border-b-[1px] hover:border-mainPurple hover:cursor-pointer hover:text-mainPurple hover:pb-2"
                  onClick={handleAccountClick}
                >
                  ACCOUNT
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* User Settings Content */}
        <div className="flex flex-col gap-4 w-full text-center">
          <Card className="p-4 bg-lighterCardForProfile font-bold text-white border-none mt-9 h-[40rem] w-full rounded-none shadow-2xl">
            {profileState === UserSettingsEnum.Profile && <ProfileSettings />}
            {profileState === UserSettingsEnum.Account && <AccountSettings />}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
