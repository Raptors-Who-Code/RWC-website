import React from "react";
import Image from "next/image";

function LandingAbout() {
  return (
    <div className="flex flex-col md:flex-row mt-[8rem] mb-[8rem]">
      {/* Left Section Start */}
      <div className="flex flex-col md:w-[700px] gap-6 2xl:p-8 md:p-[200px_80px] pr-0 self-stretch text-center lg:flex-col 2xl:self-start 2xl:text-left mx-auto 2xl:mx-0">
        <h2 className="text-white font-['Plus_Jakarta_Sans'] text-4xl font-bold leading-[78px] tracking-[-1.44px] text-center 2xl:text-left">
          Who We Are
        </h2>
        <div className="flex flex-col lg:flex-row gap-9">
          <p className="text-lg">
            At RWC, we foster a collaborative environment where students can
            explore coding, share ideas, and work on projects that spark
            creativity and innovation. Whether you&apos;re just starting out or
            looking to enhance your skills, our community is here to support
            your journey in technology.
          </p>
          <p className="text-lg">
            We recognize that our success is deeply intertwined with the growth
            and accomplishments of our members. That’s why we prioritize
            learning, collaboration, and inclusivity in all our activities.
            Together, we build skills, embrace challenges, and create
            opportunities that prepare us for a future in technology.
          </p>
        </div>

        {/* Image 1 */}
        <div className="relative 2xl:w-[675px] 2xl:h-[425px] w-[420px] h-[264px] flex-shrink-0 hidden lg:block mx-auto 2xl:mx-0">
          <Image
            src="/assets/images/LandingAbout1.png"
            alt="Collaborative Workspace"
            width={675}
            height={425}
            className="2xl:absolute 2xl:top-0 2xl:left-0 rounded-[27px] w-full h-full text-center"
          />
        </div>
      </div>
      {/* Left Section End */}

      {/* Right Section Start */}
      <div className="flex-row gap-12 w-[600px] p-[180px_80px] pt-[180px] self-stretch hidden 2xl:flex">
        {/* Image 2 */}
        <div className="relative w-[690px] h-[685px] flex-shrink-0 hidden 2xl:block">
          <Image
            src="/assets/images/LandingAbout2.png"
            alt="Coding Environment"
            width={690}
            height={685}
            className="absolute top-0 rounded-[27px] w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default LandingAbout;
