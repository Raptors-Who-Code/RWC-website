import { User } from "@/api/authApi";
import React from "react";
import { Button } from "../ui/button";
import { LuPencilLine } from "react-icons/lu";
import { MdLocationOn, MdLocationOff } from "react-icons/md";

interface UserLocationProps {
  buttonTransformation: string;
  user: User | undefined | null;
}

function UserLocation({ buttonTransformation, user }: UserLocationProps) {
  const isUserLocationEnabled = user?.longitude && user?.latitude;

  return (
    <div className="flex flex-col gap-4 p-4 border-gray-900 border rounded-3xl bg-lighterDarkCard">
      <header className="flex flex-row items-center justify-between">
        <h1 className="text-white font-bold">Location</h1>
        {isUserLocationEnabled ? (
          <Button
            className={`bg-red-800 ${buttonTransformation} hover:bg-red-800`}
          >
            <MdLocationOff /> Disable
          </Button>
        ) : (
          <Button
            className={`bg-green-800 ${buttonTransformation} hover:bg-green-800`}
          >
            <MdLocationOn /> Enable
          </Button>
        )}
      </header>
      {isUserLocationEnabled ?? (
        <p className="text-gray-500 text-xs max-w-[20rem] max-h-[5rem] lg:max-w-[40rem] overflow-hidden">
          When disabled, location will be set to Montgomery College Rockville
          Campus
        </p>
      )}
    </div>
  );
}

export default UserLocation;
