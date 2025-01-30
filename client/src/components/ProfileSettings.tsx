"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CardContent } from "./ui/card";
import useAuth from "@/hooks/useAuth";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { FaCamera } from "react-icons/fa";
import { Button } from "./ui/button";
import { useState } from "react";

function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const { data: user, isLoading } = useAuth();

  const handleSaveClick = () => {
    setIsEditing(false);
    //#TODO: Update User Profile
  };

  console.log("User", user);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <CardContent className="flex flex-col gap-8">
      {/*User Avatar */}
      <div className="flex justify-center items-center">
        <div className="flex flex-row justify-center items-center gap-4 relative hover:cursor-pointer">
          <Avatar className="bg-mainPurple md:flex space-x-4 hover:cursor-pointer w-24 h-24">
            <AvatarImage
              src={user?.profilePicUrl}
              alt={`${user?.firstName}-${user?.lastName}-profile-pic`}
              className="w-24 h-24"
            ></AvatarImage>
            <AvatarFallback className="bg-black-500 text-white"></AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">{`${user?.firstName} ${user?.lastName}`}</h1>
          <FaCamera className="absolute text-mainPurple bottom-[2px] right-[140px] text-2xl m-1" />
        </div>
      </div>

      <Textarea
        disabled={!isEditing}
        placeholder={`${user?.biography ?? "Tell us about yourself"}`}
        className="border-2 border-mainPurple rounded-lg p-4 text-white h-64 resize-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 overflow-hidden"
      />

      <div className="flex flex-col gap-6">
        <Label
          htmlFor="gender"
          className="text-lg font-medium text-gray-300 text-left"
        >
          Gender:{" "}
        </Label>
        <RadioGroup
          disabled={!isEditing}
          id="gender"
          defaultValue={user?.gender}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="MALE" id="MALE" />
            <Label htmlFor="MALE">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="FEMALE" id="FEMALE" />
            <Label htmlFor="FEMALE">Female</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="NON_BINARY" id="NON_BINARY" />
            <Label htmlFor="NON_BINARY">Non Binary</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="UNSPECIFIED" id="NON_BINARY" />
            <Label htmlFor="UNSPECIFIED">Unspecified</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-row justify-end">
        {isEditing ? (
          <Button
            className="p-6 transform transition-all duration-200 hover:scale-105 hover:z-10 hover:shadow-lg active:scale-100"
            onClick={handleSaveClick}
          >
            Save
          </Button>
        ) : (
          <Button
            className="p-6 transform transition-all duration-200 hover:scale-105 hover:z-10 hover:shadow-lg active:scale-100"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </div>
    </CardContent>
  );
}

export default ProfileSettings;
