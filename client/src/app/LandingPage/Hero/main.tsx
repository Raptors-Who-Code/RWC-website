"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthContext } from "@/providers/AuthProvider";

function Hero() {
  const { user } = useAuthContext();

  const isAuthenticated = user ? true : false;

  const authenticatedButtonStyles =
    "flex w-[187px] h-[52px] px-[24px] py-[13px] justify-center items-center gap-[10px] rounded-[4px] bg-gradient-to-r from-[#9632D7] to-[#4F1A71] mt-[10px] transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95";

  return (
    <div className="flex flex-col items-center lg:justify-evenly lg:flex-row text-center mt-36 gap-6 lg:gap-0">
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <h1 className="font-bold text-5xl lg:text-[56px]">We&apos;re RWC,</h1>
        <h2 className="text-3xl lg:text-[32px] leading-[61px] tracking-[4%] mt-4">
          Montgomery College&apos;s Computer Science Club
        </h2>

        <div className="flex flex-row gap-4 items-center">
          {isAuthenticated || (
            <Link href="/signup">
              <Button className="flex w-[187px] h-[52px] px-[24px] py-[13px] justify-center items-center gap-[10px] rounded-[4px] bg-gradient-to-r from-[#9632D7] to-[#4F1A71] mt-[10px] transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95">
                <span className="text-white text-center font-semibold text-[16px] leading-[24px] tracking-[-0.32px]">
                  Sign Up
                </span>
              </Button>
            </Link>
          )}

          <Link href="/about">
            <Button
              className={`${
                isAuthenticated
                  ? authenticatedButtonStyles
                  : "flex w-[141px] h-[52px] px-[24px] py-[13px] justify-center items-center gap-[10px] rounded-[4px] bg-[#1A202C] hover:bg-none mt-[10px] transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95"
              }`}
            >
              <span className="text-white text-center font-semibold text-[16px] leading-[24px] tracking-[-0.32px]">
                About Us
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="lg:w-[679px] lg:h-[515px] w-[400px] h-[400px]">
        <Image
          src="/assets/images/logo.png"
          alt="Raptors Who Code Logo"
          className="w-full h-full object-contain"
          width={10000}
          height={10000}
        />
      </div>
    </div>
  );
}

export default Hero;
