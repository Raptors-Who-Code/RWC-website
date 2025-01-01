import { verifiyEmail } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";

function VerifyEmail() {
  const router = useRouter();
  const params = useParams();
  const code = Array.isArray(params.code) ? params.code[0] : params.code; // Ensure code is a string

  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifiyEmail(code as string),
  });

  return <div>page</div>;
}
export default VerifyEmail;
