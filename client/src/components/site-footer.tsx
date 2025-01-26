"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FaDiscord,
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const socialIconSize = "text-[24px]";

const socials = [
  {
    name: "Discord",
    icon: <FaDiscord className={socialIconSize} />,
    href: "#",
  },
  {
    name: "Twitter",
    icon: <FaTwitter className={socialIconSize} />,
    href: "#",
  },
  {
    name: "Youtube",
    icon: <FaYoutube className={socialIconSize} />,
    href: "#",
  },
  {
    name: "Facebook",
    icon: <FaFacebook className={socialIconSize} />,
    href: "#",
  },
  {
    name: "Instagram",
    icon: <FaInstagram className={socialIconSize} />,
    href: "#",
  },
];

export default function SiteFooter() {
  const pathname = usePathname();

  const notLandingPage = pathname !== "/";
  return (
    <div
      className={`flex flex-col gap-[10rem] ${notLandingPage && "bg-gray-950"}`}
    >
      <footer className="flex w-[full] py-[100px] pt-[100px] pb-[40px] flex-col lg:flex-row justify-evenly items-center flex-shrink-0 gap-[10rem] lg:gap-[-6rem]">
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-[15px] justify-center items-center sm:justify-start sm:items">
            <h1 className="text-white font-[Plus Jakarta Sans] lg:text-2xl font-semibold leading-[24px] text-lg lg:text-leftt text-center">
              Enter your Email to Get The Latest News
            </h1>
            <p className="text-gray-600 font-inter lg:text-base font-normal leading-6 lg:max-w-sm text-sm max-w-[20rem] lg:text-left text-center">
              Stay updated with the latest news, events, and exclusive offers
              from our club.
            </p>
          </div>

          <div className="flex flex-row gap-0">
            <Input
              className="flex lg:w-[473px] h-[60px] pl-[30px] items-center gap-[10px] rounded-[3px] border border-[#565859]"
              placeholder="Enter email address..."
            ></Input>
            <Button
              className="flex lg:w-[114px] h-[60px] py-[18px] px-[30px] justify-center items-center gap-[10px] rounded-none bg-gradient-to-r from-[#9632D7] to-[#4F1A71]"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
          <h1 className="lg:text-left text-center">Follow us on: </h1>
          <div className="flex flex-row items-start gap-[15px]">
            {socials.map((social, index) => (
              <Link href={social.href} key={index}>
                <p className="text-[40px] hover:cursor-pointer">
                  {social.icon}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </footer>

      <div className="flex flex-row justify-center items-center gap-4 py-4">
        <h1>Made with ❤️ by Raptors Who Code</h1>
      </div>
    </div>
  );
}
