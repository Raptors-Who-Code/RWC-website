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

function CreateJobsStepTwo() {
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
          placeholder="Enter the job link here"
          className="border border-gray-600 rounded-lg p-6 bg-neutral-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full"
        ></Input>
      </div>

      <div className="flex flex-col gap-4">
        <Label htmlFor="title" className="text-lg font-medium text-gray-300">
          Work Type
        </Label>
        <Select>
          <SelectTrigger className="w-full p-6 border-mainPurple">
            <SelectValue placeholder="Select Work Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="onsite">Onsite</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-4">
        <Label htmlFor="title" className="text-lg font-medium text-gray-300">
          Employment Type
        </Label>
        <Select>
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
