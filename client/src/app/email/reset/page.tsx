"use client";

import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

function ResetEmailPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();
  const linkIsValid = code && exp && now < exp;

  //   const {
  //     mutate: resetUserPassword,
  //     isSuccess,
  //     isError,
  //     error,
  //   } = useMutation({
  //     mutationFn: resetEmail,
  //   });

  return <div>ResetEmailPage</div>;
}

export default ResetEmailPage;
