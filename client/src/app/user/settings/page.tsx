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
    <div className="flex justify-center items-center pt-16">
      <div className="flex flex-col w-full settings-col:flex-row sm:gap-32 p-4 settings-col:h-[80vh] my-auto">
        {/* Settings Navigation */}
        <div className="flex flex-col gap-2 text-center settings-col:text-left w-full sm:w-1/4">
          <Label htmlFor="settings-nav" className="text-2xl font-bold">
            Settings
          </Label>
          <Card
            id="settings-nav"
            className="dark border-none h-[20rem] w-[15rem] rounded-none shadow-2xl text-center settings-col:text-left mx-auto"
          >
            <CardContent className="p-16">
              <ul className="flex flex-col gap-4">
                <li
                  className="text-lg text-center hover:border-b-[1px] hover:border-mainPurple hover:cursor-pointer hover:text-mainPurple hover:pb-2"
                  onClick={handleProfileClick}
                >
                  PROFILE
                </li>
                <li
                  className="text-lg text-center hover:border-b-[1px] hover:border-mainPurple hover:cursor-pointer hover:text-mainPurple hover:pb-2"
                  onClick={handleAccountClick}
                >
                  ACCOUNT
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* User Settings Content */}
        <div className="flex flex-col gap-4 w-full sm:w-3/4 text-center">
          <Card className="p-4 dark border-none mt-9 h-[50rem] w-full sm:h-[40rem] sm:w-[50rem] rounded-none shadow-2xl">
            {profileState === UserSettingsEnum.Profile && <ProfileSettings />}
            {profileState === UserSettingsEnum.Account && <AccountSettings />}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
