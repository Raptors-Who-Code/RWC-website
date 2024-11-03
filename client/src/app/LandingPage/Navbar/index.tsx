import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between py-6 px-24 border-b border-[rgba(255,255,255,0.16)]">
      {/* Left section: Logo */}
      <Link href="/">
        <div className="flex flex-col justify-center items-start font-semibold">
          <h1>RWC</h1>
        </div>
      </Link>

      {/* Center section: Links */}
      <div className="flex space-x-6 text-white text-justify font-medium text-[18px] leading-[27px] tracking-[-0.36px]">
        <Link href="/events">Events</Link>
        <Link href="/jobs">Jobs</Link>
        <Link href="/about">About Us</Link>
      </div>

      {/* Right section: Buttons */}
      <div className="flex space-x-4">
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
