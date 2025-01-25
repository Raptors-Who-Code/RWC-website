import React from "react";
import { Skeleton } from "./ui/skeleton";

function CreateJobsLoadingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {" "}
        <Skeleton className="h-10 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>
    </div>
  );
}

export default CreateJobsLoadingPage;
