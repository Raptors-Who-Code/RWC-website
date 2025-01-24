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

function CreateJobsStepThree() {
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
        <Select>
          <SelectTrigger className="w-full p-6 border-mainPurple">
            <SelectValue placeholder="Select Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="onsite">Junior</SelectItem>
              <SelectItem value="remote">Mid Level</SelectItem>
              <SelectItem value="hybrid">Senior</SelectItem>
              <SelectItem value="other">Unknown</SelectItem>
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
          defaultValue="yes"
          className="flex flex-row gap-6 mt-4 mb-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="yes" />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="no" />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </>
  );
}

export default CreateJobsStepThree;
