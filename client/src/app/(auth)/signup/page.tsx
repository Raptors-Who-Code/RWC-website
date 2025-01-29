"use client";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { SignupSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signup, SignUpFormFields, User } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/providers/AuthProvider";

export default function SignUpPage() {
  const [confirmPasswordOpen, setConfirmPasswordOpen] =
    useState<boolean>(false);

  const { register, handleSubmit, watch } = useForm<SignUpFormFields>({
    resolver: zodResolver(SignupSchema),
  });

  const { setClientUser } = useAuthContext();

  const {
    mutate: createAccount,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: (data: User) => {
      setClientUser(data);
      router.replace("/");
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpFormFields> = (data) => {
    const { firstName, lastName, ...rest } = data;

    const capitalizedFirstName =
      firstName.toLowerCase().charAt(0).toUpperCase() + firstName.slice(1);

    const capitalizedLastName =
      lastName.toLowerCase().charAt(0).toUpperCase() + lastName.slice(1);

    const dataWithCapitalizedNames = {
      firstName: capitalizedFirstName,
      lastName: capitalizedLastName,
      ...rest,
    };

    createAccount(dataWithCapitalizedNames);
  };

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center h-[100%] w-full overflow-hidden">
        <Card className="dark w-[36rem] min-h-[20rem] border-none flex flex-col gap-[3rem] p-6 mt-[2rem] overflow-hidden">
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
              className="w-48 h-[10rem] object-contain transform transition-all duration-200 hover:scale-105 hover:z-10"
              width={10000}
              height={10000}
              priority
            />
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">First Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John"
                  required
                  className="p-6"
                  {...register("firstName")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Last Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Doe"
                  required
                  className="p-6"
                  {...register("lastName")}
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
                  {...register("email")}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="p-6"
                  {...register("password")}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="p-6"
                  {...register("confirmPassword")}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(onSubmit)}
                />

                {isError && (
                  <p className="text-red-500">
                    {error?.message || "An error occured"}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <Button
                  type={confirmPasswordOpen ? "submit" : "button"}
                  className="w-full p-6 transform transition-all duration-200 hover:scale-105 hover:z-10 hover:shadow-lg active:scale-100"
                  onClick={() => setConfirmPasswordOpen(true)}
                  disabled={
                    isPending ||
                    password !== confirmPassword ||
                    !firstName ||
                    !lastName ||
                    !email ||
                    !password ||
                    !confirmPassword
                  }
                >
                  {isPending ? "Loading..." : "Sign Up"}
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
    </form>
  );
}
