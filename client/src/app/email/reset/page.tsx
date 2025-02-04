"use client";

import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

function ResetEmailPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();
  const linkIsValid = code && exp && now < exp;

  //#TODO: Implement the reset email page, similar to the verifiy email page on initial page load we will send backend request to verify the code and will return corresponding error or success message

  return <div>ResetEmailPage</div>;
}

export default ResetEmailPage;
