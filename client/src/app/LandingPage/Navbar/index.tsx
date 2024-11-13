"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex flex-col md:flex-row items-center md:items-center justify-between py-6 px-6 md:px-24 border-b border-[rgba(77,72,72,0.16)]">
      {/* Left section: Logo */}
      <Link href="/">
        <div className="flex flex-col justify-center items-center font-semibold text-4xl mx-auto md:mx-0 lg:text-xl">
          <h1>Raptors</h1>
        </div>
      </Link>

      {/* Center section: Links */}
      <div className="hidden md:flex space-x-6 text-white text-justify font-medium text-[18px] leading-[27px] tracking-[-0.36px]">
        <Link href="/events">Events</Link>
        <Link href="/jobs">Jobs</Link>
        <Link href="/about">About Us</Link>
      </div>

      {/* Right section: Buttons */}
      <div className="hidden md:flex space-x-4">
        <Link
          href="/login"
          className="bg-transparent flex items-center justify-center gap-2 w-[100px] h-[41.6px] rounded-[30px]"
        >
          Login
        </Link>
        <Link href="/signup">
          <Button
            className="flex items-center justify-center gap-2 w-[100px] h-[41.6px] rounded-[30px] bg-gradient-to-r from-[#9632D7] to-[#4F1A71] px-[24px] py-[13px]"
            style={{
              background:
                "linear-gradient(99deg, #9632D7 9.07%, #4F1A71 96.43%)",
            }}
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
