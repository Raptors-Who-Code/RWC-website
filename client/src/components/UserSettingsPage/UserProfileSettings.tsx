"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import useAuth from "@/hooks/useAuth";
import { IoIosCheckmark } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import React from "react";
import "@/styles/glow.css";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import PersonalInfo from "@/components/UserSettingsPage/UserPersonalInfo";
import UserBiography from "@/components/UserSettingsPage/UserBiography";
import UserLocation from "@/components/UserSettingsPage/UserLocation";
import { User } from "@/api/authApi";

interface UserProfileSettingsProps {
  user: User | undefined | null;
  buttonTransformation: string;
}

function UserProfileSettings({
  user,
  buttonTransformation,
}: UserProfileSettingsProps) {
  return (
    <div className="h-auto w-full md:w-[80%] lg:w-[80%] mx-auto">
      <Card className="flex flex-col gap-4 bg-darkerCardForProfile border-none h-[80%] w-[80%] mx-auto lg:p-10 lg:mb-[10rem]">
        <CardHeader className="flex flex-row gap-6 md:gap-8 text-gray-500 px-8 py-12 md:px-12">
          <Avatar className="w-24 h-24 lg:w-32 lg:h-32">
            <AvatarImage src={user?.profilePicUrl}></AvatarImage>
            <AvatarFallback className="bg-black-500 text-white">
              {user?.firstName[0]}
              {user?.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 lg:justify-center">
            <Button className="py-6 px-3 w-[10rem] h-[10px] bg-gray-800 text-white font-bold border-b-2 border-mainPurple hover:bg-gray-700 rounded transform transition-all duration-200 hover:scale-105 hover:z-10 hover:shadow-lg active:scale-100">
              Upload New Photo
            </Button>
            <p className="text-gray-500 text-sm max-w-[24rem] lg:max-w-[10rem]">
              At least 200x200 px recommended. JPG or PNG is allowed
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-10 justify-center">
          <PersonalInfo
            user={user}
            buttonTransformation={buttonTransformation}
          />
          <UserLocation
            user={user}
            buttonTransformation={buttonTransformation}
          />
          <UserBiography
            buttonTransformation={buttonTransformation}
            user={user}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default UserProfileSettings;
