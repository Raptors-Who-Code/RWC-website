import Link from "next/link";
import React from "react";
import { navLinks } from "@/lib/links";
import Image from "next/image";
import { ChevronFirst, MoreVertical } from "lucide-react";

// function Sidebar() {
//   return (
//     <nav>
//       <ul></ul>
//       <li>
//         <Link href="/"></Link>
//       </li>
//       {navLinks.map((item, index) => {
//         return (
//           <li key={index}>
//             <Link href={item.href}>
//               {item.icon}
//               <span>{item.name}</span>
//             </Link>
//           </li>
//         );
//       })}
//     </nav>
//   );
// }

// export default Sidebar;

function Sidebar({}) {
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src="/assets/images/logo.png"
            alt="Raptors Who Code Logo"
            width={400}
            height={400}
          />
          <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
            <ChevronFirst />
          </button>
        </div>

        <ul className="flex-1 px-3">{}</ul>

        <div className="border-t flex p-3">
          <Image
            src="/assets/images/logo.png"
            alt="Raptors Who Code Logo"
            width={10}
            height={10}
            className="rounded-md"
          ></Image>

          <div className={`flex justify-between items-center w-52 ml-3`}>
            <div>
              <h4 className="font-semibold">Amanuel</h4>
              <span className="text-xs text-gray-600">
                amanuelabiy@gmail.com
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
