"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import useAuth from "@/hooks/useAuth";
import { IoIosCheckmark } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import React, { useState } from "react";
import "@/styles/glow.css";
import UserProfileSettings from "@/components/UserSettingsPage/UserProfileSettings";
import UserAccountSettings from "@/components/UserSettingsPage/UserAccountSettings";

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
  const percentage = 50;

  const { data: user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  const handleAccountClick = () => {
    setSettingsTab(SettingTabs.ACCOUNT);
  };

  const handleProfileClick = () => {
    setSettingsTab(SettingTabs.PROFILE);
  };

  const profileCompleteness = {
    setUpAccount: user?.firstName && user?.lastName && user?.verified,
    uploadProfilePhoto: user?.customProfilePic,
    personalInfo:
      user?.firstName &&
      user?.lastName &&
      (user?.gender as string) !== "UNSPECIFIED",
    location: user?.latitude && user?.longitude,
    biography: user?.biography,
  };

  const profileCompletenessValues = Object.values(profileCompleteness);
  const nonNullValues = Object.values(profileCompleteness).filter(
    (value) => value
  );

  const profileCompletenessPercentage = Math.round(
    (nonNullValues.length / profileCompletenessValues.length) * 100
  );

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
      <div className="flex flex-col-reverse gap-8 lg:gap-4 md:flex md:flex-row-reverse justify-center items-center lg:items-start w-full lg:mr-[10rem]">
        <div className="w-[16rem]">
          <Card
            className={`flex flex-col gap-4 bg-darkerCardForProfile rounded-3xl shadow-2xl border-none h-[32rem]`}
          >
            <CardHeader className="flex flex-col gap-4 items-center justify-center">
              <CardTitle className="text-lg text-center text-white font-bold">
                Complete your profile
              </CardTitle>
              <h1 className="text-4xl text-center text-white font-bold glow-text">
                {profileCompletenessPercentage}%
              </h1>
              <Progress
                value={profileCompletenessPercentage}
                className="w-[80%] h-[1rem]"
              />
            </CardHeader>
            <CardContent className="flex flex-col gap-4 items-center justify-center">
              <ul>
                <li className="flex flex-row text-white font-bold justify-center items-center gap-1">
                  <IoIosCheckmark className="text-4xl" />{" "}
                  <p className="text-sm">Setup Account</p>
                  <span className="ml-2 text-gray-500 text-sm">10%</span>
                </li>
                <li className="flex flex-row text-white font-bold justify-center items-center gap-1">
                  <IoIosCheckmark className="text-4xl" />{" "}
                  <p className="text-sm">Upload your photo</p>
                  <span className="ml-2 text-gray-500 text-sm">5%</span>
                </li>
                <li className="flex flex-row text-white font-bold justify-center items-center gap-1">
                  <IoIosCheckmark className="text-4xl" />{" "}
                  <p className="text-sm">Personal Info</p>
                  <span className="ml-2 text-gray-500 text-sm">10%</span>
                </li>
                <li className="flex flex-row text-white font-bold justify-center items-center gap-1">
                  <IoIosClose className="text-4xl text-gray-500" />{" "}
                  <p className="text-sm text-gray-500">Location</p>
                  <span className="ml-2 text-mainPurple glow-text">+10%</span>
                </li>
                <li className="flex flex-row text-white font-bold justify-center items-center gap-1">
                  <IoIosCheckmark className="text-4xl" />{" "}
                  <p className="text-sm ">Biography</p>
                  <span className="ml-2 text-gray-500 text-sm">+10%</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
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

export default UserSettings;
