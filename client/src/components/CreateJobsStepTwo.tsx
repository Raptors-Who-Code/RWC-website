import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { JobLocation } from "@/api/jobApi";
import { JobHourTypes } from "@/api/jobApi";

interface JobsStepTwoProps {
  jobLink: string;
  setJobLink: (jobLink: string) => void;
  jobLocation: JobLocation | null;
  setJobLocation: (jobLocation: JobLocation) => void;
  jobHoursType: JobHourTypes | null;
  setJobHoursType: (jobHoursType: JobHourTypes) => void;
}

function CreateJobsStepTwo({
  jobLink,
  setJobLink,
  setJobLocation,
  setJobHoursType,
  jobLocation,
  jobHoursType,
}: JobsStepTwoProps) {
  const handleJobLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobLink(e.target.value);
  };

  return (
    <>
      <header>
        <h1 className="font-extrabold text-4xl text-center lg:text-left">
          Create Job
        </h1>
      </header>

      <div className="flex flex-col gap-4">
        <Label htmlFor="title" className="text-lg font-medium text-gray-300">
          Job Link
        </Label>
        <Input
          type="text"
          id="link"
          placeholder="Enter the valid link here"
          onChange={handleJobLinkChange}
          value={jobLink}
          autoComplete="off"
          className="border border-gray-600 rounded-lg p-6 bg-neutral-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
        ></Input>
      </div>

      <div className="flex flex-col gap-4">
        <Label htmlFor="title" className="text-lg font-medium text-gray-300">
          Work Type
        </Label>
        <Select value={jobLocation ?? ""} onValueChange={setJobLocation}>
          <SelectTrigger className="w-full p-6 border-mainPurple">
            <SelectValue placeholder="Select Work Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ONSITE">Onsite</SelectItem>
              <SelectItem value="REMOTE">Remote</SelectItem>
              <SelectItem value="HYBRID">Hybrid</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-4">
        <Label htmlFor="title" className="text-lg font-medium text-gray-300">
          Employment Type
        </Label>
        <Select value={jobHoursType ?? ""} onValueChange={setJobHoursType}>
          <SelectTrigger className="w-full p-6 border-mainPurple">
            <SelectValue placeholder="Select Employment Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="fullTime">Full-Time</SelectItem>
              <SelectItem value="partTime">Part-Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

export default CreateJobsStepTwo;
