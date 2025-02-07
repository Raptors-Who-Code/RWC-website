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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

interface UserProfileSettingsProps {
  user: User | undefined | null;
  buttonTransformation: string;
}

function UserAccountSettings({
  user,
  buttonTransformation,
}: UserProfileSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="h-auto w-full md:w-[80%] lg:w-[80%] mx-auto">
      <Card className="flex flex-col gap-4 bg-darkerCardForProfile border-none h-[80%] w-[80%] mx-auto lg:p-10 lg:mb-[10rem] p-6">
        <CardContent className="flex flex-col gap-10 justify-center">
          <div className="flex flex-col gap-4 p-4 border-gray-900 border rounded-3xl bg-lighterDarkCard">
            <Label htmlFor="email" className="font-bold text-gray-500">
              Email
            </Label>
            <Input
              id="email"
              className="border-mainPurple md:w-3/4 text-left text-white"
              disabled={!isEditing}
              value={user?.email || ""}
            />
            <Label htmlFor="password" className="font-bold text-gray-500">
              Password
            </Label>
            <Input
              id="password"
              className="border-mainPurple md:w-3/4 text-left text-white"
              disabled={!isEditing}
              type="password"
              value={"********"}
            />
            <div className="flex flex-row items-center">
              <Button
                className="ml-auto p-4"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>
          </div>
          <div></div>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserAccountSettings;
