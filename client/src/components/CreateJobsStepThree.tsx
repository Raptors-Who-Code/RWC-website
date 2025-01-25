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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { JobLevel } from "@/api/jobApi";
import { yesNoToBoolean } from "@/app/jobs/create/page";

interface JobStepThreeProps {
  jobLevel: JobLevel | null;
  setJobLevel: (jobLevel: JobLevel) => void;
  isInternship: boolean;
  setIsInternship: (isInternship: boolean) => void;
}

function CreateJobsStepThree({
  jobLevel,
  setJobLevel,
  isInternship,
  setIsInternship,
}: JobStepThreeProps) {
  const handleInternshipChange = (value: string) => {
    setIsInternship(yesNoToBoolean(value));
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
          Experience Level
        </Label>
        <Select value={jobLevel ?? ""} onValueChange={setJobLevel}>
          <SelectTrigger className="w-full p-6 border-mainPurple">
            <SelectValue placeholder="Select Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="JUNIOR">Junior</SelectItem>
              <SelectItem value="MID_LEVEL">Mid Level</SelectItem>
              <SelectItem value="SENIOR">Senior</SelectItem>
              <SelectItem value="UNKNOWN">Unknown</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-4">
        <Label
          htmlFor="internship"
          className="text-lg font-medium text-gray-300"
        >
          Is this an internship?
        </Label>
        <RadioGroup
          id="internship"
          value={isInternship ? "yes" : "no"}
          onValueChange={handleInternshipChange}
          defaultValue="yes"
          className="flex flex-row gap-6 mt-4 mb-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>

        <div className="bg-orange-500 text-white p-4 rounded-xl">
          <p>
            <span className="font-extrabold">Notice</span>: Sharing malicious
            links or disseminating inaccurate information may result in account
            suspension or the removal of job postings.
          </p>
        </div>
      </div>
    </>
  );
}

export default CreateJobsStepThree;
