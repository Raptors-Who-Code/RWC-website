import { Button } from "@/components/ui/button";
import React from "react";

function JoinSection() {
  return (
    <div className="flex items-center gap-12 p-[120px_80px] self-stretch">
      <div>
        <div className="flex flex-col items-start">
          <h2 className="text-white font-['Plus_Jakarta_Sans'] text-4xl font-bold leading-[78px] tracking-[-1.44px] text-center">
            Show your talent on a bigger stage
          </h2>
          <p className="text-[var(--Gray-25,#FCFCFD)] font-['Sansation'] text-[19px] font-normal leading-[36px] tracking-[0.048px] capitalize text-center mt-4">
            Join us now, as we{" "}
            <span className="font-bold">
              &quot;Empower students to build, innovate, and lead in tech.&quot;
            </span>
          </p>
        </div>

        <Button className="flex w-[187px] h-[52px] px-[24px] py-[13px] justify-center items-center gap-[10px] rounded-[4px] bg-gradient-to-r from-[#9632D7] to-[#4F1A71] mt-[10px] transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale- mx-auto lg:mx-0">
          <span className="text-white text-center font-semibold text-[16px] leading-[24px] tracking-[-0.32px]">
            View Hackathons
          </span>
        </Button>
      </div>
    </div>
  );
}

export default JoinSection;
