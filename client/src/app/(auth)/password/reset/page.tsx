"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import { MdError } from "react-icons/md";

function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();
  const linkIsValid = code && exp && now < exp;

  return (
    <div className="dark flex items-center justify-center h-screen overflow-hidden">
      <Card className="mx-auto w-full max-w-lg min-h-[20rem] border-none flex flex-col p-6 overflow-hidden justify-center items-center">
        <CardContent>
          {linkIsValid ? (
            <ResetPasswordForm code={code} />
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
