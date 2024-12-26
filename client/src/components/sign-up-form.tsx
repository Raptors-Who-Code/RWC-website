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
import Image from "next/image";
import { useState } from "react";

export function SignUpForm() {
  const [confirmPasswordOpen, setConfirmPasswordOpen] =
    useState<boolean>(false);

  const handleSignUpConfirmation = () => {
    // handle sign up confirmation
  };

  return (
    <div className="dark absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Card className="w-[36rem] min-h-[20rem] border-none flex flex-col gap-[3rem] p-6">
        <CardHeader className="flex flex-row justify-evenly">
          <div className="flex flex-col gap-2 justify-center">
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create an account
            </CardDescription>
          </div>
          <Image
            src="/assets/images/logo.png"
            alt="Raptors Who Code Logo"
            className="w-48 h-[10rem] object-contain transform transition-all duration-200 hover:scale-105 hover:z-10 hover:shadow-lg"
            width={10000}
            height={10000}
          />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="m@example.com"
                required
                className="p-6"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="p-6"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required className="p-6" />
            </div>

            {confirmPasswordOpen && (
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required className="p-6" />
              </div>
            )}

            <div className="mt-4">
              <Button
                type="submit"
                className="w-full p-6 transform transition-all duration-200 hover:scale-105 hover:z-10 hover:shadow-lg active:scale-100"
                onClick={() => setConfirmPasswordOpen(true)}
              >
                Sign Up
              </Button>

              <div className="mt-4 text-center text-sm">
                Have an account?{" "}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
