"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import useAuth from "@/hooks/useAuth";
import { IoIosCheckmark } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import React, { useEffect, useState } from "react";
import "@/styles/glow.css";
import UserProfileSettings from "@/components/UserSettingsPage/UserProfileSettings";
import UserAccountSettings from "@/components/UserSettingsPage/UserAccountSettings";
import { User } from "@/api/authApi";

interface UserCompleteYourProfileProps {
  user: User | undefined | null;
}

function UserCompleteYourProfile({ user }: UserCompleteYourProfileProps) {
  const [usersLocationEnabled, setUsersLocationEnabled] = useState<boolean>(
    () => {
      return !!localStorage.getItem("userLocation");
    }
  );

  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      setUsersLocationEnabled(true);
    }
  }, [localStorage.getItem("userLocation")]);

  const setUpAccountComplete = [
    user?.firstName,
    user?.lastName,
    user?.verified,
  ];
  const uploadProfilePhotoComplete = [user?.customProfilePic];
  const personalInfoComplete = [
    user?.firstName,
    user?.lastName,
    (user?.gender as string) !== "UNSPECIFIED",
  ];
  const locationComplete = [usersLocationEnabled];
  const biographyComplete = [user?.biography];

  const profileCompleteness = {
    setUpAccount: setUpAccountComplete.every(Boolean),
    uploadProfilePhoto: uploadProfilePhotoComplete.every(Boolean),
    personalInfo: personalInfoComplete.every(Boolean),
    location: locationComplete.every(Boolean),
    biography: biographyComplete.every(Boolean),
  };

  const totalProfileValues =
    setUpAccountComplete.length +
    uploadProfilePhotoComplete.length +
    personalInfoComplete.length +
    locationComplete.length +
    biographyComplete.length;

  const profileCompletenessPercentages = {
    setUpAccount: Math.floor(
      (setUpAccountComplete.length / totalProfileValues) * 100
    ),
    uploadProfilePhoto: Math.floor(
      (uploadProfilePhotoComplete.length / totalProfileValues) * 100
    ),
    personalInfo: Math.floor(
      (personalInfoComplete.length / totalProfileValues) * 100
    ),
    location: Math.floor((locationComplete.length / totalProfileValues) * 100),
    biography: Math.floor(
      (biographyComplete.length / totalProfileValues) * 100
    ),
  };

  const profileCompletenessValues = Object.entries(profileCompleteness);
  const completedValues = profileCompletenessValues.filter(
    ([key, value]) => value
  );

  const profileCompletenessPercentage = completedValues.reduce(
    (total, [key]) => {
      // Type assertion to ensure key is one of the keys in profileCompletenessPercentages
      const percentageKey = key as keyof typeof profileCompletenessPercentages;
      return total + profileCompletenessPercentages[percentageKey];
    },
    0
  );

  return (
    <div className="w-[16rem]">
      <Card
        className={`flex flex-col gap-4 bg-darkerCardForProfile rounded-3xl shadow-2xl border-none h-[30rem] lg:h-[26rem]`}
      >
        <CardHeader className="flex flex-col gap-4 items-center justify-center">
          <CardTitle className="text-lg text-center text-white font-bold">
            Complete your profile
          </CardTitle>
          <h1 className={`text-4xl text-center text-white font-bold glow-text`}>
            {profileCompletenessPercentage}%
          </h1>
          <Progress
            value={profileCompletenessPercentage}
            className="w-[80%] h-[1rem]"
          />
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center justify-center">
          <ul className="flex flex-col gap-4 lg:gap-0">
            <li className="flex flex-row text-white font-bold justify-center items-center gap-1">
              {profileCompleteness.setUpAccount ? (
                <IoIosCheckmark className="text-4xl text-white" />
              ) : (
                <IoIosClose className="text-4xl text-gray-500" />
              )}
              <p
                className={`text-sm ${
                  profileCompleteness.setUpAccount
                    ? "text-white"
                    : "text-gray-500"
                }`}
              >
                Setup Account
              </p>
              <span
                className={`ml-2 ${
                  profileCompleteness.setUpAccount
                    ? "text-gray-500"
                    : "text-mainPurple glow-text"
                } text-sm`}
              >
                {!profileCompleteness.setUpAccount && "+"}
                {profileCompletenessPercentages.setUpAccount}%
              </span>
            </li>
            <li className="flex flex-row text-white font-bold justify-center items-center gap-1">
              {profileCompleteness.uploadProfilePhoto ? (
                <IoIosCheckmark className="text-4xl text-white" />
              ) : (
                <IoIosClose className="text-4xl text-gray-500" />
              )}
              <p
                className={`text-sm ${
                  profileCompleteness.uploadProfilePhoto
                    ? "text-white"
                    : "text-gray-500"
                }`}
              >
                Upload your photo
              </p>
              <span
                className={`ml-2 ${
                  profileCompleteness.uploadProfilePhoto
                    ? "text-gray-500"
                    : "text-mainPurple glow-text"
                } text-sm`}
              >
                {!profileCompleteness.uploadProfilePhoto && "+"}
                {profileCompletenessPercentages.uploadProfilePhoto}%
              </span>
            </li>
            <li className="flex flex-row text-white font-bold justify-center items-center gap-1">
              {profileCompleteness.personalInfo ? (
                <IoIosCheckmark className="text-4xl text-white" />
              ) : (
                <IoIosClose className="text-4xl text-gray-500" />
              )}
              <p
                className={`text-sm ${
                  profileCompleteness.personalInfo
                    ? "text-white"
                    : "text-gray-500"
                }`}
              >
                Personal Info
              </p>
              <span
                className={`ml-2 ${
                  profileCompleteness.personalInfo
                    ? "text-gray-500"
                    : "text-mainPurple glow-text"
                } text-sm`}
              >
                {!profileCompleteness.personalInfo && "+"}
                {profileCompletenessPercentages.personalInfo}%
              </span>
            </li>
            <li className="flex flex-row text-white font-bold justify-center items-center gap-1">
              {profileCompleteness.location ? (
                <IoIosCheckmark className="text-4xl text-white" />
              ) : (
                <IoIosClose className="text-4xl text-gray-500" />
              )}
              <p
                className={`text-sm ${
                  profileCompleteness.location ? "text-white" : "text-gray-500"
                }`}
              >
                Location
              </p>
              <span
                className={`ml-2 ${
                  profileCompleteness.location
                    ? "text-gray-500"
                    : "text-mainPurple glow-text"
                } text-sm`}
              >
                {!profileCompleteness.location && "+"}
                {profileCompletenessPercentages.location}%
              </span>
            </li>
            <li className="flex flex-row text-white font-bold justify-center items-center gap-1">
              {profileCompleteness.biography ? (
                <IoIosCheckmark className="text-4xl text-white" />
              ) : (
                <IoIosClose className="text-4xl text-gray-500" />
              )}
              <p
                className={`text-sm ${
                  profileCompleteness.biography ? "text-white" : "text-gray-500"
                }`}
              >
                Biography
              </p>
              <span
                className={`ml-2 ${
                  profileCompleteness.biography
                    ? "text-gray-500"
                    : "text-mainPurple glow-text"
                } text-sm`}
              >
                {!profileCompleteness.biography && "+"}
                {profileCompletenessPercentages.biography}%
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserCompleteYourProfile;
