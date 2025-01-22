"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

function CreateJobsPage() {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-full">
        {/*Left Side Content*/}
        <nav className="flex flex-row h-[10%] items-center justify-evenly py-6 px-6 md:px-24 lg:justify-between">
          {/* Left section: Logo */}
          <div className="flex items-center justify-center w-full md:w-auto relative">
            <Link href="/">
              <div className="flex flex-col justify-center items-center text-xl font-semibold mx-auto md:mx-0">
                <h1 className="transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95">
                  Raptors
                </h1>
              </div>
            </Link>
          </div>
        </nav>
        {/* Create Job Form */}
        <div className="flex items-start mx-auto justify-center h-screen md:pt-16">
          <Card className="flex flex-col w-full h-[35rem] md:w-[40rem] md:h-[35rem] lg:h-[35rem] lg:mr-[5rem] rounded-lg gap-7 dark p-10 border-none lg:w-[40rem] bg-transparent lg:bg-darkCard">
            <header>
              <h1 className="font-extrabold text-4xl text-center lg:text-left">
                Create Job
              </h1>
            </header>
            <>
              {" "}
              <div className="flex flex-col gap-4">
                <Label
                  htmlFor="title"
                  className="text-lg font-medium text-gray-300"
                >
                  Title
                </Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Job Title"
                  className="border border-gray-600 rounded-lg p-6 bg-neutral-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 "
                ></Input>
              </div>
              <div className="flex flex-col gap-4 h-[400rem]">
                <Label
                  htmlFor="content"
                  className="text-lg font-medium text-gray-300"
                >
                  Description
                </Label>
                <Textarea
                  id="content"
                  placeholder="Provide a brief description of the job"
                  className="border border-gray-600 rounded-lg p-4 bg-neutral-800 text-white h-40 resize-none  focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 overflow-hidden"
                />
                {/* <div>{description.length}/255 characters</div> */}
              </div>
            </>
            <div className="flex flex-row justify-between">
              <Button
                type="button"
                className="flex justify-center items-center gap-[10px] rounded-lg bg-[#1A202C] mt-[10px] hover:bg-[#1A202C] transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95"
              >
                <MdArrowBack />
                Back
              </Button>

              <Button
                type="button"
                className="flex justify-center items-center gap-[10px] rounded-lg bg-mainPurple mt-[10px] hover:bg-mainPurple transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95"
              >
                Next
                <MdArrowForward />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CreateJobsPage;
