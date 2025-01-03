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
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/api/api";

interface ResetPasswordFormProps {
  code: string | null;
}

function ResetPasswordForm({ code }: ResetPasswordFormProps) {
  const [newPassword, setNewPassword] = useState<string>("");

  const {
    mutate: resetUserPassword,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: resetPassword,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetUserPassword({ verificationCode: code as string, newPassword });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader className="flex flex-col gap-2 items-center justify-center">
        <CardTitle className="text-2xl font-bold text-center">
          Change your password
        </CardTitle>
        <CardDescription>
          {isSuccess
            ? "Password updated successfully!"
            : "Enter your new password below to reset"}
        </CardDescription>
        {isError && (
          <p className="text-red-500">{error.message || "An error occured"}</p>
        )}
      </CardHeader>
      {isSuccess ? (
        <>
          <div className="flex flex-col gap-8 items-center">
            <h1 className="text-green-500 text-9xl text-center">
              <IoIosCheckmarkCircle />
            </h1>
            <h1 className="text-l text-center">
              Your password was updated successfully.{" "}
              <Link href="/login" className="text-blue-500" replace>
                Log In
              </Link>
            </h1>
          </div>
        </>
      ) : (
        <>
          {" "}
          <CardContent className="flex flex-col gap-4">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="********"
              required
              className="p-6"
              autoComplete="new-password"
              onChange={(e) => setNewPassword(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                resetUserPassword({
                  newPassword,
                  verificationCode: code as string,
                })
              }
              autoFocus
            />
            <Button type="submit" className="w-full p-6 mt-4">
              Reset Password
            </Button>
          </CardContent>
        </>
      )}
    </form>
  );
}
export default ResetPasswordForm;
