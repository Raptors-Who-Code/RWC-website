import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";

function UserSettings() {
  return (
    <div className="flex justify-center items-center pt-16">
      <div className="flex flex-col md:flex-row gap-32 p-4 h-[80vh] my-auto">
        {/* Settings Navigation */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="settings-nav" className="text-2xl font-bold">
            Settings
          </Label>
          <Card
            id="settings-nav"
            className="dark border-none h-[20rem] w-[15rem] rounded-none shadow-2xl"
          >
            <CardContent className="p-16">
              <ul className="flex flex-col gap-4">
                <li className="text-lg text-center hover:border-b-[1px] hover:border-mainPurple hover:cursor-pointer hover:text-mainPurple hover:pb-2">
                  PROFILE
                </li>
                <li className="text-lg text-center hover:border-b-[1px] hover:border-mainPurple hover:cursor-pointer hover:text-mainPurple hover:pb-2">
                  ACCOUNT
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* User Settings Content */}
        <div className="flex flex-col gap-4">
          <Card className="p-4 dark border-none mt-9 h-[40rem] w-[50rem] rounded-none shadow-2xl">
            <p>Here you can change your user settings.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
