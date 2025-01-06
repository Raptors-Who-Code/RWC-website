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
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetEmail } from "@/api/authApi";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function ForgotPasswordPage() {
  const [passwordResetEmailSent, setPasswordResetEmailSent] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const { mutate: sendPasswordReset, isPending: isPendingEmail } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendPasswordReset(email);
    setPasswordResetEmailSent(true);
  };

  return (
    <div className="dark flex items-center justify-center h-[100%] overflow-hidden">
      <Card className="mx-auto w-[36rem] min-h-[20rem] border-none flex flex-col gap-[3rem] p-6 mt-[8rem] overflow-hidden">
        <CardHeader className="flex flex-row text-center justify-center">
          <div className="flex flex-col gap-2">
            <CardTitle className="text-2xl font-bold">
              {passwordResetEmailSent
                ? "Password Reset Email Sent"
                : "Request Password Reset"}
            </CardTitle>
            <CardDescription>
              {passwordResetEmailSent
                ? "If an account corresponds with the email you entered, a link to reset your password has been sent."
                : "Enter email to request password reset"}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col">
          {passwordResetEmailSent ? (
            <div className="flex flex-col items-center">
              <h1>
                {" "}
                <IoIosCheckmarkCircle className="text-green-500 text-9xl" />
              </h1>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    required
                    className="p-6"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="flex flex-col mt-4 gap-4">
                  <Button
                    type="submit"
                    className="w-full p-6 transform transition-all duration-200 hover:scale-105 hover:z-10 hover:shadow-lg active:scale-100 bg-transparent border border-white text-white hover:bg-white hover:text-black"
                  >
                    {isPendingEmail
                      ? "Sending... "
                      : "Send Password Reset Email"}
                  </Button>

                  <div className="flex flex-row items-center">
                    <hr className="border-gray-500 flex-grow" />
                    <p className="text-gray-500 mx-3 font-bold">OR</p>
                    <hr className="border-gray-500 flex-grow" />
                  </div>

                  <Link href="/login">
                    <Button
                      type="button"
                      className="w-full p-6 transform transition-all duration-200 hover:scale-105 hover:z-10 hover:shadow-lg active:scale-100"
                    >
                      Go Back To Log In 🔑
                    </Button>
                  </Link>

                  <div className="mt-4 text-center text-sm">
                    If you need help, please contact{" "}
                    <Link href="#" className="font-bold">
                      example@email.com
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
