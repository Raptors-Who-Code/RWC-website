"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import useAuth from "@/hooks/useAuth";
import { IoIosCheckmark } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import React, { useState } from "react";
import "@/styles/glow.css";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { LuPencilLine } from "react-icons/lu";
import { Label } from "@/components/ui/label";
import { User } from "@/api/authApi";

interface PersonInfoProps {
  buttonTransformation: string;
  user: User | undefined | null;
}

function UserPersonalInfo({ buttonTransformation, user }: PersonInfoProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const correctlyCapitalize = (word: string) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  };

  return (
    <>
      {isEditing ? (
        <div className="flex flex-col gap-4 p-6 border-gray-900 border rounded-3xl bg-gray-900">
          <header className="flex flex-row items-center justify-between">
            <h1 className="text-white font-bold">Personal Info</h1>
            <p
              className="text-gray-500 hover:cursor-pointer"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </p>
          </header>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="full-name" className="font-bold text-gray-500">
              Full name
            </Label>
            <p
              id="Full Name"
              className="text-sm text-white font-bold truncate max-w-[10rem]"
            >
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="email" className="font-bold text-gray-500">
              Email
            </Label>
            <p
              id="email"
              className="text-sm text-white font-bold truncate max-w-[10rem]"
            >
              {user?.email}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="gender" className="font-bold text-gray-500">
              Gender
            </Label>
            <p
              id="gender"
              className="text-sm text-white font-bold truncate max-w-[10rem]"
            >
              {user?.gender ? correctlyCapitalize(user.gender) : "N/A"}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-4 border-gray-900 border rounded-3xl bg-lighterDarkCard">
          <header className="flex flex-row items-center justify-between">
            <h1 className="text-white font-bold">Personal Info</h1>
            <Button
              className={`bg-gray-800 ${buttonTransformation} hover:bg-gray-700`}
              onClick={() => setIsEditing(true)}
            >
              <LuPencilLine /> Edit
            </Button>
          </header>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="full-name" className="font-bold text-gray-500">
              Full name
            </Label>
            <p
              id="Full Name"
              className="text-sm text-white font-bold truncate max-w-[10rem]"
            >
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="email" className="font-bold text-gray-500">
              Email
            </Label>
            <p
              id="email"
              className="text-sm text-white font-bold truncate max-w-[10rem]"
            >
              {user?.email}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="gender" className="font-bold text-gray-500">
              Gender
            </Label>
            <p
              id="gender"
              className="text-sm text-white font-bold truncate max-w-[10rem]"
            >
              {user?.gender ? correctlyCapitalize(user.gender) : "N/A"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default UserPersonalInfo;
{
  /* <div className="flex flex-col gap-4 p-4 border-gray-900 border rounded-3xl bg-lighterDarkCard">
  <header className="flex flex-row items-center justify-between">
    <h1 className="text-white font-bold">Personal Info</h1>
    <Button className={`bg-gray-800 ${buttonTransformation} hover:bg-gray-700`}>
      <LuPencilLine /> Edit
    </Button>
  </header>
  <div className="flex flex-row justify-between items-center">
    <Label htmlFor="full-name" className="font-bold text-gray-500">
      Full name
    </Label>
    <p
      id="Full Name"
      className="text-sm text-white font-bold truncate max-w-[10rem]"
    >
      {user?.firstName} {user?.lastName}
    </p>
  </div>
  <div className="flex flex-row justify-between items-center">
    <Label htmlFor="email" className="font-bold text-gray-500">
      Email
    </Label>
    <p
      id="email"
      className="text-sm text-white font-bold truncate max-w-[10rem]"
    >
      {user?.email}
    </p>
  </div>
  <div className="flex flex-row justify-between items-center">
    <Label htmlFor="gender" className="font-bold text-gray-500">
      Gender
    </Label>
    <p
      id="gender"
      className="text-sm text-white font-bold truncate max-w-[10rem]"
    >
      {user?.gender ? correctlyCapitalize(user.gender) : "N/A"}
    </p>
  </div>
</div>; */
}
