import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="w-full p-6 flex justify-between">
      <Link href="/">
        <div className="flex flex-col justify-center items-center font-semibold">
          <h1>Raptors</h1>
          <h1>Who Code</h1>
        </div>
      </Link>

      <div className="flex flex-row gap-4 font-semibold">
        <Link
          href="/"
          className="hover:scale-105 transition-transform duration-400"
        >
          Home
        </Link>
        <Link
          href="/events"
          className="hover:scale-105 transition-transform duration-400"
        >
          Events
        </Link>
        <Link
          href="/jobs"
          className="hover:scale-105 transition-transform duration-400"
        >
          Jobs
        </Link>
        <Link
          href="/about"
          className="hover:scale-105 transition-transform duration-400"
        >
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
