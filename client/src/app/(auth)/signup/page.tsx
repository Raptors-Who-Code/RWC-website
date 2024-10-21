"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";

function SignUp() {
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-5 items-center">
      <div>
        <h1 className="text-xl text-gray-500 text-center mt-[4rem] tracking-wider">
          WELCOME TO <span className="font-extrabold">RAPTORS WHO CODE</span>
        </h1>
      </div>

      <div className="">
        <Card className="flex flex-col items-center bg-gray-700 border-none p-4 w-[400px] gap-4">
          <Button className="font-semibold text-md p-7 transition-transform transform hover:scale-[1.02] active:scale-[.98]">
            <MdEmail className="mr-4" />
            SIGN UP WITH MC EMAIL
          </Button>

          <div className="flex flex-row items-center">
            <hr className="border-gray-500 flex-grow" />
            <p className="text-gray-500 mx-3 font-bold tracking-wider">OR</p>
            <hr className="border-gray-500 flex-grow" />
          </div>

          <form className="flex flex-col gap-3">
            <Input className="p-7" placeholder="Username" required></Input>
            <Input
              type="email"
              className="p-7"
              placeholder="Email"
              required
            ></Input>
            <Input
              type="password"
              className="p-7"
              placeholder="Password"
              required
            ></Input>
            <Button className="font-semibold text-md p-7 transition-transform transform hover:scale-[1.02] active:scale-[.98]">
              <p className="mr-2">SIGN UP</p>
              <FaArrowRight className="text-xl" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default SignUp;
