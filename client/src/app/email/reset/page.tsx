"use client";

import { resetEmail } from "@/api/userApi";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdError } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";

function ResetEmailPage() {
  const [isLinkValid, setIsLinkValid] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();
  // Check if the link is valid
  const linkIsValid = Boolean(code && exp && now < exp);

  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => resetEmail(code as string),
  });

  useEffect(() => {
    setIsLinkValid(linkIsValid);
  }, [linkIsValid]);

  //#TODO: Implement the reset email page, similar to the verifiy email page on initial page load we will send backend request to verify the code and will return corresponding error or success message

  const error = !isLinkValid || isError;
  return (
    <div className="dark flex items-center justify-center h-screen overflow-hidden">
      <Card className="mx-auto w-full max-w-lg min-h-[20rem] border-none flex flex-col p-6 overflow-hidden justify-center items-center">
        {isSuccess && (
          <>
            {" "}
            <CardHeader>
              <IoIosCheckmarkCircle className="text-green-500 text-9xl" />
            </CardHeader>
            <div className="flex flex-col gap-10 items-center">
              <h1>Email was successfully chanaged!</h1>
              <Link href="/login" replace>
                <Button className="text-lg py-6 px-12 bg-green-500 hover:bg-green-400">
                  Back to login
                </Button>
              </Link>
            </div>
          </>
        )}

        {isPending && (
          <CardHeader>
            <TailSpin
              visible={true}
              height="100"
              width="100"
              color="#9632D7"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </CardHeader>
        )}

        {error && (
          <>
            <CardHeader>
              <MdError className="text-red-500 text-9xl" />
            </CardHeader>
            <div className="flex flex-col gap-10 items-center">
              <h1>The link is either invalid or expired. </h1>
              <Link href="/" replace>
                <Button className="text-lg py-6 px-12 bg-mainPurple">
                  Back to home
                </Button>
              </Link>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

export default ResetEmailPage;
