import React from "react";
import Link from "next/link";
import JobCardList from "@/components/job-card-list";
import { getAllJobs } from "@/api/jobApi";

async function LatestJobs() {
  const jobData = await getAllJobs();
  const previewJobs = jobData.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-[100px] ">
      {/*  Page Title*/}
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Our Latest Jobs</h1>
        <p className="text-lg text-gray-400">
          Join our Waitlist and get access to Rumor for discounted early-bird
          prices.
        </p>
      </div>

      {/* Job Cards */}
      <div className="container mx-auto py-8">
        <JobCardList data={previewJobs} />
      </div>

      {/* View All Jobs Button */}
      <div className="text-center">
        <Link href="\jobs">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded border border-[#9030CF] transition-colors">
            View All Jobs
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LatestJobs;
