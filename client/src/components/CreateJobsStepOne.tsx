import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface JobStepOneProps {
  jobTitle: string;
  setJobTitle: (jobTitle: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

function CreateJobsStepOne({
  jobTitle,
  setJobTitle,
  description,
  setDescription,
}: JobStepOneProps) {
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.length <= 500) {
      setDescription(e.target.value);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 60) {
      setJobTitle(e.target.value);
    }
  };
  return (
    <>
      <header>
        <h1 className="font-extrabold text-4xl text-center lg:text-left">
          Create Job
        </h1>
      </header>
      <>
        {" "}
        <div className="flex flex-col gap-4">
          <Label htmlFor="title" className="text-lg font-medium text-gray-300">
            Title
          </Label>
          <Input
            type="text"
            id="title"
            placeholder="Job Title"
            className="border border-gray-600 rounded-lg p-6 bg-neutral-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={jobTitle}
            onChange={handleTitleChange}
            autoComplete="off"
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
            value={description}
            onChange={handleDescriptionChange}
          />
          <div>{description.length}/500 characters</div>
        </div>
      </>
    </>
  );
}

export default CreateJobsStepOne;
