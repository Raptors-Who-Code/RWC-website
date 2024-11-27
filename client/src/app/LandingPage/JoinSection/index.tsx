import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";

function JoinSection() {
  return (
    <div className="flex flex-col items-center gap-12 p-[120px_80px] self-stretch lg:flex-row">
      <div className="flex flex-col gap-9">
        <div className="flex flex-col items-start">
          <h2 className="text-white font-['Plus_Jakarta_Sans'] text-4xl font-bold leading-[78px] tracking-[-1.44px] text-center lg:text-left">
            Show your talent on a bigger stage
          </h2>
          <p className="text-[var(--Gray-25,#FCFCFD)] font-['Sansation'] text-[19px] font-normal leading-[36px] tracking-[0.048px] capitalize text-center mt-4 lg:text-left">
            &quot;Join us now, as we empower students to unleash their
            potential, drive innovation, and lead the way in shaping the future
            of technology. Together, we build skills, foster creativity, and
            inspire leadership that transforms ideas into reality.&quot;
          </p>
        </div>

        <Button className="flex w-[187px] h-[52px] px-[24px] py-[13px] justify-center items-center gap-[10px] rounded-[4px] bg-gradient-to-r from-[#9632D7] to-[#4F1A71] mt-[10px] transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale- mx-auto lg:mx-0">
          <span className="text-white text-center font-semibold text-[16px] leading-[24px] tracking-[-0.32px]">
            View Hackathons
          </span>
        </Button>
      </div>

      <div className="relative w-[559px] h-[352px] flex-shrink-0">
        {/* Binary Digits Image */}
        <Image
          src="/assets/images/JoinSection1.png"
          alt="Binary Digits"
          className="absolute top-0 left-0 rounded-[27px] w-full h-full object-cover z-10"
          width={559}
          height={352}
        />

        {/* Code Image */}
        <Image
          src="/assets/images/JoinSection2.png"
          alt="Code"
          className="absolute top-[100%] left-[5%] translate-y-[-50%] rounded-[22px] w-[259px] h-[303.378px] object-cover z-30"
          width={259}
          height={303.378}
        />

        {/* AI Logo Image */}
        <Image
          src="/assets/images/JoinSection3.png"
          alt="AI Logo"
          className="absolute top-[110%] left-[75%] translate-x-[-50%] translate-y-[-60%] rounded-[12px] w-[189px] h-[233px] object-cover z-30"
          width={189}
          height={233}
        />
      </div>
    </div>
  );
}

export default JoinSection;
