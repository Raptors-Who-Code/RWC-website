import { SignUpForm } from "@/components/sign-up-form";
import SiteFooter from "@/components/site-footer";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <SignUpForm />
    </div>
  );
}
