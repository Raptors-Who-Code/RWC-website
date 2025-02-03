"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { navLinks } from "@/lib/links";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { logUserOut } from "@/api/authApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "@/config/queryClient";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import useAuth from "@/hooks/useAuth";
import { User } from "@/api/authApi";
import { useAuthContext } from "@/providers/AuthProvider";
import { TailSpin } from "react-loader-spinner";
import { getUser } from "@/api/userApi";

function Navbar() {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const router = useRouter();
  const { isPending } = useAuth();

  const { user, setClientUser } = useAuthContext();

  const { mutate: signOut } = useMutation({
    mutationFn: logUserOut,
    onSettled: () => {
      queryClient.clear();
    },
    onSuccess: () => {
      setClientUser(null);
      router.replace("/");
    },
  });

  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen);
  };

  const handleLogoutClick = () => {
    signOut();
    router.replace("/");
  };

  const handleSettingsClick = () => {
    router.push("/user/settings");
  };

  const userIsThereAndLoaded = user && !isPending;
  const userIsNotThere = !user && !isPending;

  if (isPending) {
    console.log("Loading...");
  }

  return (
    <nav className="flex flex-col md:flex-row items-center md:items-center justify-between py-6 px-6 md:px-24 border-b border-[rgba(77,72,72,0.16)] ">
      {/* Left section: Logo */}

      {/* Container for Logo and Mobile Navbar button on small screens*/}

      <div className="flex items-center justify-center w-full md:w-auto relative">
        {/*Mobile Navbar button (left of the logo on small screens) */}
        <div className="absolute left-0 md:hidden">
          <button
            className="p-0 m-0 bg-transparent border-none cursor-pointer"
            aria-label="Open navagation"
            onClick={toggleMenu}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <Link href="/">
          <div className="flex flex-col justify-center items-center font-semibold text-4xl mx-auto md:mx-0 md:text-xl">
            <h1 className="transform transition-all duration-200 hover:scale-110 hover:text-mainPurple hover:z-10 hover:shadow-lg active:scale-95">
              Raptors
            </h1>
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

      {/*Mobile Menu */}
      {isMenuOpen ? (
        <ul className="flex-col md:hidden w-full py-4 px-6 space-y-4 shadow-md">
          {navLinks.map((link) => (
            <li key={link.name} className="py-2">
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>
      ) : null}

      {/* Right section: Buttons */}

      {userIsThereAndLoaded && (
        <div className="flex items-center space-x-2 absolute top-4 right-4 md:relative md:top-0 md:right-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 hover:cursor-pointer transform transition-all duration-200 hover:scale-105 hover:z-10 hover:shadow-lg active:scale-100">
                <Avatar className="bg-mainPurple md:flex space-x-4 hover:cursor-pointer absolute top-2 right-4 md:relative md:top-0 md:right-0">
                  <AvatarImage
                    src={user.profilePicUrl}
                    alt={`${user.firstName}-${user.lastName}-profile-pic`}
                  ></AvatarImage>
                  <AvatarFallback className="bg-black-500 text-white"></AvatarFallback>
                </Avatar>
                <p className="hidden md:inline">{user.firstName}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-white bg-transparent border border-neutral-800 shadow-lg p-4 space-y-2 mt-12 md:mt-0 md:ml-0 md:relative md:top-0 md:left-0">
              <DropdownMenuItem
                className="p-2 hover:bg-neutral-800 transform transition-all duration-200 hover:scale-105 hover:cursor-pointer"
                onClick={handleSettingsClick}
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2 border-t border-neutral-700" />
              <DropdownMenuItem
                className="p-2 hover:bg-neutral-800 transform transition-all duration-200 hover:scale-105 hover:cursor-pointer"
                onClick={handleLogoutClick}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {userIsNotThere && (
        <div className="flex absolute top-4 right-4 md:relative md:top-0 md:right-0 md:flex space-x-4">
          <Link
            href="/login"
            className="hidden md:flex bg-transparent items-center justify-center gap-2 w-[100px] h-[41.6px] rounded-[30px] transform transition-all duration-200 hover:scale-105 active:scale-95 hover:z-10"
          >
            Login
          </Link>
          <Link href="/signup">
            <Button
              className="flex items-center justify-center gap-2 w-[80px] h-[35px] rounded-[30px] bg-gradient-to-r from-[#9632D7] to-[#4F1A71] px-[16px] py-[10px] md:px-[24px] mt-2 md:mt-0 md:py-[13px] transform transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 hover:z-10 md:w-[100px] md:h-[41.6px]"
              style={{
                background:
                  "linear-gradient(99deg, #9632D7 9.07%, #4F1A71 96.43%)",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </div>
      )}

      {isPending && (
        <div className="flex items-center justify-center space-x-2 absolute top-4 right-4 md:relative md:top-0 md:right-0">
          <TailSpin
            visible={true}
            height="40"
            width="40"
            color="#9632D7"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
