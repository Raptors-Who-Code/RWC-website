"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import CreateJobsStepOne from "@/components/CreateJobsStepOne";
import CreateJobsStepTwo from "@/components/CreateJobsStepTwo";
import CreateJobsStepThree from "@/components/CreateJobsStepThree";

export const yesNoToBoolean = (value: string) => {
  return value === "yes" ? true : false;
};

function CreateJobsPage() {
  const [step, setStep] = useState<number>(1);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [jobLink, setJobLink] = useState<string>("");
  const [workType, setWorkType] = useState<string>("");
  const [employmentType, setEmploymentType] = useState<string>("");
  const [experienceLevel, setExperienceLevel] = useState<string>("");
  const [isInternship, setIsInternship] = useState<boolean>(true);
  const [stepOneError, setStepOneError] = useState<boolean>(false);

  const handleSumbitClick = () => {
    console.log("Submit Clicked");
  };

  const handleStepOneNextClick = () => {
    if (jobTitle && description) {
      setStep((prev) => prev + 1);
      setStepOneError(false);
    } else {
      setStepOneError(true);
    }
  };

  const handleStepTwoNextClick = () => {
    console.log("Step Two Next Clicked");
    setStep((prev) => prev + 1);
  };

  const handleNextClick = () => {
    if (step === 1) {
      handleStepOneNextClick();
    } else if (step === 2) {
      handleStepTwoNextClick();
    }
  };

  const handleBackClick = () => {
    console.log("Back Clicked");
    setStep((prev) => prev - 1);
  };

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
            {step === 1 && (
              <CreateJobsStepOne
                jobTitle={jobTitle}
                setJobTitle={setJobTitle}
                description={description}
                setDescription={setDescription}
              />
            )}

            {step === 2 && <CreateJobsStepTwo />}

            {step === 3 && <CreateJobsStepThree />}

            <div
              className={`flex flex-row ${
                step == 1 ? "justify-end" : "justify-between"
              }`}
            >
              {stepOneError && (
                <div className="flex flex-col w-full justify-center">
                  <p className="text-red-500 text-xs text-left">
                    Please fill all required fields
                  </p>
                </div>
              )}
              {step !== 1 && (
                <Button
                  type="button"
                  className="flex justify-center items-center gap-[10px] rounded-lg bg-[#1A202C] mt-[10px] hover:bg-[#1A202C] transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95"
                  onClick={handleBackClick}
                >
                  <MdArrowBack />
                  Back
                </Button>
              )}

              {step !== 3 && (
                <Button
                  type="button"
                  className="flex justify-center items-center gap-[10px] rounded-lg bg-mainPurple mt-[10px] hover:bg-mainPurple transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95"
                  onClick={handleNextClick}
                >
                  Next
                  <MdArrowForward />
                </Button>
              )}

              {step === 3 && (
                <Button
                  type="button"
                  className="flex justify-center items-center gap-[10px] rounded-lg bg-mainPurple mt-[10px] hover:bg-mainPurple transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95"
                  onClick={handleSumbitClick}
                >
                  Submit
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CreateJobsPage;
