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

// import { Separator } from "@/components/ui/separator";

// const sections = [
//   {
//     title: "Product",
//     links: [
//       { name: "Overview", href: "#" },
//       { name: "Pricing", href: "#" },
//       { name: "Marketplace", href: "#" },
//       { name: "Features", href: "#" },
//       { name: "Integrations", href: "#" },
//       { name: "Pricing", href: "#" },
//     ],
//   },
//   {
//     title: "Company",
//     links: [
//       { name: "About", href: "#" },
//       { name: "Team", href: "#" },
//       { name: "Blog", href: "#" },
//       { name: "Careers", href: "#" },
//       { name: "Contact", href: "#" },
//       { name: "Privacy", href: "#" },
//     ],
//   },
//   {
//     title: "Resources",
//     links: [
//       { name: "Help", href: "#" },
//       { name: "Sales", href: "#" },
//       { name: "Advertise", href: "#" },
//     ],
//   },
// ];

// // interface SiteFooterProps {}

// export default function SiteFooter() {
//   return (
//     <div className="container">
//       <footer className="py-14">
//         <Separator className="my-14" />
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//           {sections.map((section, sectionIdx) => (
//             <div key={sectionIdx}>
//               <h3 className="mb-4 font-bold">{section.title}</h3>
//               <ul className="space-y-4 text-muted-foreground">
//                 {section.links.map((link, linkIdx) => (
//                   <li key={linkIdx} className="font-medium hover:text-primary">
//                     <a href={link.href}>{link.name}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//           <div>
//             <h3 className="mb-4 font-bold">Legal</h3>
//             <ul className="space-y-4 text-muted-foreground">
//               <li className="font-medium hover:text-primary">
//                 <a href="#">Term of Services</a>
//               </li>
//               <li className="font-medium hover:text-primary">
//                 <a href="#">Privacy Policy</a>
//               </li>
//             </ul>
//             <h3 className="mb-4 mt-8 font-bold">Social</h3>
//             <ul className="flex items-center space-x-6 text-muted-foreground">
//               <li className="font-medium hover:text-primary">
//                 <a href="#">
//                   <FaDiscord className="size-6" />
//                 </a>
//               </li>
//               <li className="font-medium hover:text-primary">
//                 <a href="#">
//                   <FaRedditAlien className="size-6" />
//                 </a>
//               </li>
//               <li className="font-medium hover:text-primary">
//                 <a href="#">
//                   <FaTwitter className="size-6" />
//                 </a>
//               </li>
//               <li className="font-medium hover:text-primary">
//                 <a href="#">
//                   <FaTelegramPlane className="size-6" />
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <Separator className="my-14" />
//         <p className="text-sm text-muted-foreground">
//           Made with ❤️ by Raptors Who Code
//         </p>
//       </footer>
//     </div>
//   );
// }

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
  return (
    <div className="flex flex-col gap-[10rem]">
      <footer className="flex w-[full] py-[100px] pt-[100px] pb-[40px] flex-row justify-between items-center flex-shrink-0 gap-[-6rem]">
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-[15px]">
            <h1 className="text-white font-[Plus Jakarta Sans] text-2xl font-semibold leading-[24px]">
              Enter your Email to Get The Latest News
            </h1>
            <p className="text-gray-600 font-inter text-base font-normal leading-6 max-w-sm">
              Stay updated with the latest news, events, and exclusive offers
              from our club.
            </p>
          </div>

          <div className="flex flex-row gap-0">
            <Input
              className="flex w-[473px] h-[60px] pl-[30px] items-center gap-[10px] rounded-[3px] border border-[#565859]"
              placeholder="Enter email address..."
            ></Input>
            <Button
              className="flex w-[114px] h-[60px] py-[18px] px-[30px] justify-center items-center gap-[10px] rounded-none bg-gradient-to-r from-[#9632D7] to-[#4F1A71]"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
          <h1>Follow us on: </h1>
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
