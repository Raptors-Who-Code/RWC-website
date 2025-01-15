"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { logUserOut } from "@/api/authApi";
import queryClient from "@/config/queryClient";
import { logout, User } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { createEvent } from "@/api/eventApi";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { isBefore, startOfToday } from "date-fns";
import { toast } from "react-toastify";

interface StepCounterProps {
  currentStep: number;
  totalSteps: number;
}

function CreateEventPage() {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [description, setDescription] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [stepOneError, setStepOneError] = useState<string | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileError, setFileError] = useState<string | null>(null);
  const today = startOfToday();
  const router = useRouter();

  const titleInputRef = useRef<HTMLInputElement>(null);

  const {
    mutate: createTheEvent,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      router.replace("/events");
    },
  });

  const handleNextClick = () => {
    if (title && description) {
      setStepOneError(null);
      setStep((prev) => prev + 1);
    } else {
      setStepOneError("Please fill all required fields");
    }
  };

  const handleSubmitClick = () => {
    if (title && description && date) {
      const eventData = {
        title: title,
        content: description,
        date: date,
        ...(file && { image: file }),
      };

      console.log("Client Event Data", eventData);
      createTheEvent(eventData);
    }
  };

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.length <= 255) {
      setDescription(e.target.value);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBackClick = () => {
    setStep((prev) => prev - 1);
  };

  const validFileTypes = ["image/png", "image/jpeg", "image/jpg"];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!validFileTypes.find((type) => type === file?.type)) {
      setFileError("File must be in JPG/PNG format");
      return;
    }

    setFileError(null);
    setFile(file);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-full lg:w-1/2">
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

          <div className="lg:hidden">
            <StepCounter currentStep={step} totalSteps={2} />
          </div>
        </nav>
        {/* Create Event Form */}
        <div className="flex items-start justify-center h-screen pt-16">
          <Card className="flex flex-col w-1/2 h-[65%] mr-[5rem] rounded-lg gap-7 dark p-10 border-none">
            <header>
              <h1 className="font-extrabold text-4xl">Create Event</h1>
            </header>
            {step === 1 && (
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
                    placeholder="Event Title"
                    className="border border-gray-600 rounded-lg p-6 bg-neutral-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 "
                    value={title}
                    onChange={handleTitleChange}
                    ref={titleInputRef}
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
                    placeholder="Provide a brief description of the event"
                    className="border border-gray-600 rounded-lg p-4 bg-neutral-800 text-white h-40 resize-none  focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 overflow-hidden"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                  <div>{description.length}/255 characters</div>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <Label
                    htmlFor="event-image"
                    className="text-md font-medium text-gray-300"
                  >
                    Choose an Image (Optional) :
                  </Label>
                  <Input
                    id="event-image"
                    type="file"
                    className="hover:curor-pointer"
                    onChange={handleFileUpload}
                  />
                  {fileError && (
                    <div>
                      <p className="text-red-500">
                        File must be in JPG/PNG format
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <Label
                    htmlFor="calendar"
                    className="text-lg font-medium text-gray-300 text-md "
                  >
                    Select Date :
                  </Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md shadow p-4 mx-auto"
                    id="calendar"
                    disabled={(date) => isBefore(date, today)}
                  />
                </div>
              </div>
            )}
            {/* justify-between items-center */}
            <div
              className={`flex flex-row ${
                step === 1 && !stepOneError ? "justify-end" : "justify-between"
              } ${stepOneError && "justify-between items-center"} mt-4`}
            >
              {step === 1 || (
                <Button
                  type="button"
                  className="flex justify-center items-center gap-[10px] rounded-lg bg-[#1A202C] mt-[10px] hover:bg-[#1A202C] transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95"
                  onClick={handleBackClick}
                >
                  <MdArrowBack />
                  Back
                </Button>
              )}

              {stepOneError && (
                <div>
                  <p className="text-red-500">{stepOneError}</p>
                </div>
              )}

              {step === 1 ? (
                <Button
                  type="button"
                  className="flex justify-center items-center gap-[10px] rounded-lg bg-mainPurple mt-[10px] hover:bg-mainPurple transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95"
                  onClick={handleNextClick}
                >
                  Next
                  <MdArrowForward />
                </Button>
              ) : (
                <Button
                  type="button"
                  className="flex justify-center items-center gap-[10px] rounded-lg bg-mainPurple mt-[10px] hover:bg-mainPurple transform transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95"
                  onClick={handleSubmitClick}
                >
                  Submit
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative h-full w-1/2 hidden lg:block">
        <div className="absolute inset-0 z-[-2] w-full h-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        {/* Navbar */}
        <nav className="flex flex-col h-[10%] md:flex-row items-center md:items-center justify-end py-6 px-6 md:px-24">
          <StepCounter currentStep={step} totalSteps={2} />
        </nav>
        <div className="flex flex-col items-center justify-center h-[90%] ">
          <Image
            src="/assets/images/logo.png"
            width={600}
            height={600}
            className="rounded-full shadow-lg "
            alt="hackathon"
          />
        </div>
      </div>
    </div>
  );
}

export default CreateEventPage;

function StepCounter({ currentStep, totalSteps }: StepCounterProps) {
  return (
    <div className="bg-mainPurple p-[12px]">
      <h1 className="text-white font-bold">
        Step {currentStep} of {totalSteps}
      </h1>
    </div>
  );
}
