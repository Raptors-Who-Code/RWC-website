"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  return (
    <form>
      {" "}
      <div className="flex flex-col gap-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Verification Code</Label>
            <Input
              id="verification-code"
              type="text"
              placeholder="123456"
              required
              className="p-6"
            />
          </div>
        </div>{" "}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="********"
              required
              className="p-6"
            ></Input>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full p-6 transform transition-all duration-200 hover:scale-105 hover:z-10 hover:shadow-lg active:scale-100"
        >
          Reset Password
        </Button>
      </div>
    </form>
  );
}
export default ResetPasswordForm;
