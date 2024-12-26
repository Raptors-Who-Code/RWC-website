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

export function SignInForm() {
  return (
    <div className="dark flex items-center justify-center min-h-screen">
      <Card className="mx-auto w-[36rem] min-h-[20rem] border-none flex flex-col gap-[3rem] p-6">
        <CardHeader className="flex flex-row">
          <div className="flex flex-col gap-2 justify-center">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter email and password to Login to your account
            </CardDescription>
          </div>
          <Image
            src="/assets/images/logo.png"
            alt="Raptors Who Code Logo"
            className="w-48 h-[10rem] object-contain"
            width={10000}
            height={10000}
          />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
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

            <div className="mt-4">
              <Button
                type="submit"
                className="w-full p-6 transform transition-all duration-200 hover:scale-105 hover:z-10 hover:shadow-lg active:scale-100"
              >
                Login
              </Button>

              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
