"use client";

import { CardContent } from "./ui/card";
import { RxAvatar } from "react-icons/rx";

import { Label } from "./ui/label";
import { Input } from "./ui/input";

function AccountSettings() {
  return (
    <CardContent className="settings-col:flex settings-col:flex-col gap-8">
      <div>
        {/**Upper Settings First Name, Last Name, Email, OldPassword, NewPassword */}
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          className="p-6"
        />
      </div>

      <div>
        <Label htmlFor="email">First Name</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          className="p-6"
        />
      </div>

      <div>
        <Label htmlFor="email">Last Name</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          className="p-6"
        />
      </div>

      <div>
        <Label htmlFor="email">Old Password</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          className="p-6"
        />
      </div>

      <div>
        <Label htmlFor="email">New Password</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          className="p-6"
        />
      </div>
    </CardContent>
  );
}

export default AccountSettings;
