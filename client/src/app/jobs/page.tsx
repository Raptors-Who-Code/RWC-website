"use client";

import { getAllJobs, JobResponse } from "@/api/jobApi";
import JobsEventsLoadingPage from "@/components/CreateJobsLoadingPage";
import JobCardList from "@/components/job-card-list";
import JobPagination from "@/components/job-pagination";
import SiteFooter from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  searchParams: {
    page?: string;
    pageSize?: string;
  };
};

interface Job {
  id: number;
  title: string;
  level: string;
  description: string;
  isRemote: boolean;
  isFullTime: boolean;
}

export default function Jobs({ searchParams }: Props) {
  const { data: user, isLoading: authLoading } = useAuth();

  const [allJobs, setAllJobs] = useState<JobResponse[]>([]);
  const [count, setCount] = useState<number>(0);
  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = parseInt(searchParams.pageSize || "9", 10);

  const {
    mutate: getAllTheJobs,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: getAllJobs,
    onSuccess: (data: JobResponse[]) => {
      handleSuccessfulJobGet(data);
    },
  });

  const handleSuccessfulJobGet = (data: JobResponse[]) => {
    // Calculate the start and end indices for the current page
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    // Slice the jobs array to get the current page's events
    setAllJobs(data.slice(start, end));
    // Get the total count of jobs
    setCount(data.length);
  };

  useEffect(() => {
    getAllTheJobs();
  }, [page, pageSize]);

  if (isPending) {
    return <JobsEventsLoadingPage />;
  }

  
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 p-20">
      <div className="flex flex-col items-center justify-center h-screen text-center">
          <h2 className="text-3xl font-bold text-white-500">Something went wrong!</h2>
          <p className="text-gray-400 mt-2">We couldn't fetch jobs at the moment. Please try again later.</p>
          <Button onClick={() => getAllTheJobs()} className="mt-4">Retry</Button>
          </div>
      </div>
  );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-950 text-gray-100 p-20"> 
        <div className="max-w-6xl mx-auto space-y-12">
          {/*  Page Title*/}
          <div className="text-center space-y-8">
            <h1 className="text-4xl font-bold">Latest Job Openings</h1>
            <p className="text-lg text-gray-400">
            Browse the latest internship/job opportunities from top firms and take the next step in your career.
            </p>
          </div>

          {user && (
            <div className="text-center">
              <Link href="/jobs/create">
                <Button className="rounded-none">Create Job</Button>
              </Link>
            </div>
          )}

          <JobCardList data={allJobs} />

          <JobPagination
            page={page}
            pageSize={pageSize}
            totalCount={count}
            pageSizeSelectOptions={{ pageSizeOptions: [9, 18, 36, 72] }}
          />
        </div>
      </div>
      <SiteFooter />
    </>
  );
}

// async function getJobsWithCount(
//   page: number,
//   pageSize: number
// ): Promise<[Job[], number]> {
//   // Total job list (simulating 500 jobs)
//   const allJobs = Array(500)
//     .fill({
//       title: "Mern Stack Developer",
//       level: "Mid Level",
//       description:
//         "We're looking for a mid-level product designer to join our team.",
//       isRemote: true,
//       isFullTime: true,
//     })
//     .map((job, index) => ({
//       ...job,
//       id: index + 1,
//       title: `${job.title} #${index + 1}`,
//     }));

//   // Slice the allJobs array to get the current page's jobs
//   const start = (page - 1) * pageSize;
//   const data = allJobs.slice(start, start + pageSize);

//   return [data, allJobs.length];
// }
