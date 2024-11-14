import Link from "next/link";
import React from "react";
import { navLinks } from "@/lib/links";

function Sidebar() {
  return (
    <nav>
      <ul></ul>
      <li>
        <Link href="/"></Link>
      </li>
      {navLinks.map((item, index) => {
        return (
          <li key={index}>
            <Link href={item.href}>
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        );
      })}
    </nav>
  );
}

export default Sidebar;
