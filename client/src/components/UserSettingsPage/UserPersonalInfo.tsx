"use client";
import React, { useState } from "react";
import "@/styles/glow.css";
import { Button } from "@/components/ui/button";
import { LuPencilLine } from "react-icons/lu";
import { Label } from "@/components/ui/label";
import { User } from "@/api/authApi";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/api/userApi";
import { emailSchema } from "@/schema/auth.schema";

interface PersonInfoProps {
  buttonTransformation: string;
  user: User | undefined | null;
}

function UserPersonalInfo({ buttonTransformation, user }: PersonInfoProps) {
  const [firstName, setFirstName] = useState<string>(user?.firstName || "");
  const [lastName, setLastName] = useState<string>(user?.lastName || "");
  const [gender, setGender] = useState<string>(user?.gender || "");

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    mutate: updateTheUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      setIsEditing(false);
    },
  });

  const handleCancelClick = () => {
    setFirstName(user?.firstName || "");
    setFirstName(user?.firstName || "");
    setIsEditing(false);
  };

  const correctlyCapitalize = (word: string) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleSaveChanges = () => {
    if (firstName && lastName) {
      updateTheUser({ firstName, lastName });
    }
  };

  return (
    <>
      {isEditing ? (
        <div className="flex flex-col gap-4 p-6 border-gray-900 border rounded-3xl bg-gray-950">
          <header className="flex flex-row items-center justify-between">
            <h1 className="text-white font-bold">Personal Info</h1>
            <p
              className="text-gray-500 hover:cursor-pointer text-sm"
              onClick={handleCancelClick}
            >
              Cancel
            </p>
          </header>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="first-name" className="font-bold text-gray-500">
              First Name
            </Label>
            <Input
              id="first-name"
              value={firstName}
              onChange={handleFirstNameChange}
              className="text-white border-mainPurple w-1/2 lg:w-1/6 text-center"
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="last-name" className="font-bold text-gray-500">
              Last Name
            </Label>
            <Input
              id="last-name"
              value={lastName}
              onChange={handleLastNameChange}
              className="text-white border-mainPurple w-1/2 text-center"
            />
          </div>

          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="gender" className="font-bold text-gray-500">
              Gender
            </Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="w-[65%] border-mainPurple text-white">
                <SelectValue
                  placeholder="Select Experience"
                  className="text-white"
                />
              </SelectTrigger>
              <SelectContent className="bg-gray-950 border-mainPurple text-white">
                <SelectGroup>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="NON_BINARY">Non-Binary</SelectItem>
                  <SelectItem value="UNSPECIFIED">Unspecified</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="text-right mt-4">
            <Button
              onClick={handleSaveChanges}
              className={`${buttonTransformation} p-4`}
            >
              Save Changes
            </Button>
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
