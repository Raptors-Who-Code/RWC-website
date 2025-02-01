import { User } from "@/api/authApi";
import React from "react";
import { Button } from "../ui/button";
import { LuPencilLine } from "react-icons/lu";
import { Textarea } from "../ui/textarea";

interface UserBiographyProps {
  user: User | undefined | null;
  buttonTransformation: string;
}

function UserBiography({ user, buttonTransformation }: UserBiographyProps) {
  const noBiographyMessage = `Hi 👋 ${user?.firstName}, write a biography to connect better with other club members`;

  return (
    <div className="flex flex-col gap-4 p-4 border-gray-900 border rounded-3xl bg-lighterDarkCard">
      <header className="flex flex-row items-center justify-between">
        <h1 className="text-white font-bold">Bio</h1>
        <Button
          className={`bg-gray-800 ${buttonTransformation} hover:bg-gray-700`}
        >
          <LuPencilLine /> Edit
        </Button>
      </header>
      <div>
        <Textarea
          disabled={true}
          id="biography"
          className="border-gray-800 border rounded-3xl bg-lighterDarkCard p-6 text-sm text-white overflow-hidden"
          value={user?.biography ? user?.biography : noBiographyMessage}
          style={{ resize: "none" }}
        />
      </div>
    </div>
  );
}

export default UserBiography;
