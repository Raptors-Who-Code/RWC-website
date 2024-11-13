"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { navLinks } from "@/lib/links";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex flex-col md:flex-row items-center md:items-center justify-between py-6 px-6 md:px-24 border-b border-[rgba(77,72,72,0.16)]">
      {/* Left section: Logo */}

      {/* Container for Logo and Mobile Navbar button on small screens*/}

      <div className="flex items-center justify-center w-full md:w-auto relative">
        {/*Mobile Navbar button (left of the logo on small screens) */}
        <div className="absolute left-0 md:hidden">
          <button
            className="p-0 m-0 bg-transparent border-none cursor-pointer"
            aria-label="Open navagation"
            onClick={() => {}}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <Link href="/">
          <div className="flex flex-col justify-center items-center font-semibold text-4xl mx-auto md:mx-0 md:text-xl">
            <h1>Raptors</h1>
          </div>
        </Link>
      </div>

      {/* Center section: Links */}
      <div className="hidden md:flex space-x-6 text-white text-justify font-medium text-[18px] leading-[27px] tracking-[-0.36px]">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href}>
            {link.name}
          </Link>
        ))}
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
