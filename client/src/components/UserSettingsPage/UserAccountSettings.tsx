import { User } from "@/api/authApi";
import React from "react";

interface UserAccountSettingsProps {
  user: User | undefined | null;
  buttonTransformation: string;
}

function UserAccountSettings({
  user,
  buttonTransformation,
}: UserAccountSettingsProps) {
  return <div>UserAccountSettings</div>;
}

export default UserAccountSettings;
