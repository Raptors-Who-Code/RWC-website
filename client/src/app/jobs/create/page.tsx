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
import {
  JobHourTypes,
  JobLevel,
  jobLinkSchema,
  JobLocation,
} from "@/api/jobApi";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

export const yesNoToBoolean = (value: string) => {
  return value === "yes" ? true : false;
};

function CreateJobsPage() {
  const { data: user, isLoading } = useAuth();
  // Component pagination state
  const [step, setStep] = useState<number>(1);
  // Step 1
  const [jobTitle, setJobTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [stepOneError, setStepOneError] = useState<boolean>(false);

  // Step 2

  const [jobLink, setJobLink] = useState<string>("");
  const [jobLocation, setJobLocation] = useState<JobLocation | null>(null);
  const [jobHoursType, setJobHoursType] = useState<JobHourTypes | null>(null);
  const [stepTwoError, setStepTwoError] = useState<boolean>(false);

  // Step 3 (Final Step)
  const [jobLevel, setJobLevel] = useState<JobLevel | null>(null);
  const [isInternship, setIsInternship] = useState<boolean>(
    yesNoToBoolean("yes")
  );
  const [stepThreeError, setStepThreeError] = useState<boolean>(false);

  const handleSumbitClick = () => {
    if (!jobLevel || !isInternship) {
      setStepThreeError(true);
      return;
    } else {
      setStepThreeError(false);
    }

    if (!user?.verified) {
      toast.error("You must be verified to create a job", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
    const jobLinkValidation = jobLinkSchema.safeParse(jobLink);

    if (jobLinkValidation.success && jobLocation && jobHoursType) {
      setStep((prev) => prev + 1);
      setStepTwoError(false);
    } else {
      setStepTwoError(true);
    }
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

            {step === 2 && (
              <CreateJobsStepTwo
                jobLink={jobLink}
                setJobLink={setJobLink}
                jobLocation={jobLocation}
                setJobLocation={setJobLocation}
                jobHoursType={jobHoursType}
                setJobHoursType={setJobHoursType}
              />
            )}

            {step === 3 && (
              <CreateJobsStepThree
                jobLevel={jobLevel}
                setJobLevel={setJobLevel}
                isInternship={isInternship}
                setIsInternship={setIsInternship}
              />
            )}

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

              {stepTwoError && (
                <div className="flex flex-col w-full justify-center">
                  <p className="text-red-500 text-xs text-left">
                    Invalid or missing fields
                  </p>
                </div>
              )}

              {stepThreeError && (
                <div className="flex flex-col w-full justify-center">
                  <p className="text-red-500 text-xs text-left">
                    Invalid or missing fields
                  </p>
                </div>
              )}

              {step !== 1 && (
                <Button
                  type="button"
                  className={`flex justify-center ${
                    (stepTwoError || stepThreeError) && "mr-2 lg:mr-4"
                  } items-center gap-[10px] rounded-lg bg-[#1A202C] mt-[10px] hover:bg-[#1A202C] transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95`}
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
