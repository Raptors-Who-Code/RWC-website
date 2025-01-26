import React from "react";
import { Skeleton } from "./ui/skeleton";

function JobsEventsLoadingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Title Skeleton */}
        <div className="text-center space-y-8">
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>

        {/* Create Job Button Skeleton */}
        <div className="text-center">
          <Skeleton className="h-10 w-32 mx-auto" />
        </div>

        {/* Job Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>

        {/* Pagination Skeleton */}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export default JobsEventsLoadingPage;
