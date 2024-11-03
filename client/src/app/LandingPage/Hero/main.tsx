import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  return (
    <div className="flex flex-col justify-evenly lg:flex-row text-center mt-36">
      <div className="my-auto">
        <h1 className="font-extrabold text-4xl">We&apos;re RWC,</h1>
        <h2>Montgomery College&apos;s</h2>
        <h2>Computer Science Club</h2>
        <Link href="/signup">
          <Button className="mt-4 text-white hover:bg-purple-500 transition-transform duration-300 ease-in-out transform hover:scale-105">
            Sign Up
          </Button>
        </Link>
      </div>
      <Image
        src="/assets/images/logo.png"
        alt="Raptors Who Code Logo"
        width={400}
        height={400}
      />
    </div>
  );
}

export default Hero;
