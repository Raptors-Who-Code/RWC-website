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
import ResetPasswordForm from "@/components/ResetPasswordForm";
import { MdError } from "react-icons/md";

function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code ");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();
  let linkIsValid = code && exp && now < exp;
  linkIsValid = false;

  return (
    <div className="dark flex items-center justify-center h-screen overflow-hidden">
      <Card className="mx-auto w-full max-w-lg min-h-[20rem] border-none flex flex-col p-6 overflow-hidden justify-center items-center">
        <CardContent>
          {linkIsValid ? (
            <ResetPasswordForm />
          ) : (
            <div className="flex flex-col gap-10 items-center justify-center">
              <CardHeader>
                {" "}
                <MdError className="text-red-500 text-9xl" />
              </CardHeader>
              <div className="flex flex-col gap-10 items-center">
                <h1 className="text-xl text-center">
                  The password reset link is either invalid or expired.
                  <span className="ml-2">
                    <Link
                      href="/password/forgot"
                      className="text-blue-500"
                      replace
                    >
                      Get a new link
                    </Link>
                  </span>
                </h1>
                <Link href="/" className="text-blue-500 text-xl" replace>
                  Back to home
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
export default ResetPasswordPage;

// <Card className="dark mx-auto w-[36rem] min-h-[20rem] border-none flex flex-col gap-[3rem] p-6 mt-[4rem] overflow-hidden"></Card>;
