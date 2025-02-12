import { MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JobResponse } from "@/api/jobApi";
import Link from "next/link";

interface Job {
  title: string;
  level: string;
  description: string;
  isRemote: boolean;
  isFullTime: boolean;
}

interface JobCardItemProps {
  item: JobResponse;
}

// id: string;
//   createdAt: string;
//   updatedAt: string;
//   userId: string;
//   title: string;
//   content: string;
//   jobLink: string;
//   jobLocation: JobLocation;
//   jobHoursType: JobHourTypes;
//   internship: boolean;
//   jobLevel: JobLevel;

export const replaceUnderscoreWithMinus = (string: string) => {
  if (typeof string !== "string") {
    return "";
  }
  return string.replace(/_/g, "-");
};

export function JobCardItem({ item }: JobCardItemProps) {
  const {
    title,
    content,
    jobLink,
    jobLevel,
    jobLocation,
    jobHoursType,
    internship,
  } = item;

  const isRemote = jobLocation === "REMOTE";
  const isFullTime = jobHoursType === "FULL_TIME";

  return (
    <Card className="flex flex-col h-full bg-[#1a1d24] border border-gray-600 rounded-[5px]">
      <CardHeader className="space-y-2 px-5 py-4">
        <CardTitle className="text-xl font-semibold text-white">
          {title}
        </CardTitle>
        <div className="inline-flex">
          <span className="text-gray-300 text-xs px-3 py-1 rounded-sm border border-gray-600">
            {replaceUnderscoreWithMinus(jobLevel)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 px-4 pb-5">
        <p className="text-gray-400 text-lg">{content}</p>
        <div className="flex items-center space-x-6">
          {isRemote && (
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="w-4 h-4" />
              <span className="text-md">Remote</span>
            </div>
          )}
          {isFullTime && (
            <div className="flex items-center space-x-2 text-gray-300">
              <Clock className="w-4 h-4" />
              <span className="text-md">Full-time</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Link
          href={jobLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button
            className="w-full bg-transparent hover:bg-purple-500 text-white border border-purple-500 rounded-[4px] py-5 text-md font-medium transition-colors duration-200"
            variant="outline"
          >
            Apply Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
