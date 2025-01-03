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
import { useState } from "react";

function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState<string>("");

  return (
    <form>
      <CardHeader className="flex flex-col gap-2 items-center justify-center">
        <CardTitle className="text-2xl font-bold">
          Change your password
        </CardTitle>
        <CardDescription>
          Enter your new password below to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Label htmlFor="new-password">New Password</Label>
        <Input
          id="new-password"
          type="password"
          placeholder="********"
          required
          className="p-6"
        />
        <Button type="submit" className="w-full p-6 mt-4">
          Reset Password
        </Button>
      </CardContent>
    </form>
  );
}
export default ResetPasswordForm;
