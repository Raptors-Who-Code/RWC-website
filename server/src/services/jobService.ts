import { prismaClient } from "..";
import { Response } from "express";
import { NotFoundException } from "../exceptions/exceptions";
import { ErrorCode } from "../exceptions/root";
import { Job, JobLocation, JobLevel, JobHourTypes, APIJob } from "../types/jobTypes";
import { UserData } from "../types/userTypes";

export const createJob = async (jobData: Job, userData: UserData) => {
    const {title, content, jobLink, internship, jobLocation, jobHoursType, jobLevel} = jobData;

    const job = await prismaClient.job.create({
        data: {
            title,
            content,
            jobLink,
            internship,
            jobLocation,
            jobHoursType,
            userId: userData.id,
            ...(jobLevel && { jobLevel })
        }
    })

    return job;
};

export const deleteJob = async (jobId: string, userId: string) => {
    const job = await prismaClient.job.findUnique({where: {
        id: jobId
    }});

    if (!job){
        throw new NotFoundException("Job not found", ErrorCode.JOB_NOT_FOUND);
    }

    const user = await prismaClient.user.findUnique({ where: { id: userId } });

    if (!user) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
      }

      const isUsersJob = job.userId == userId; 
      const isUserAdmin = user.role == "ADMIN";

      if (!isUsersJob && !isUserAdmin){
          throw new NotFoundException("You are not authorized to delete this job", ErrorCode.UNAUTHORIZED);
      }

      const deletedJob = await prismaClient.job.delete({
        where: {
            id: jobId
        },
      })

      if (!deletedJob){
        throw new NotFoundException("Job not found", ErrorCode.JOB_NOT_FOUND);
      }

      return deletedJob;
}

export const fetchJobsFromAPI = async (numberOfJobs: number) => {

    const apiUrl = "https://api.github.com/repos/cvrve/Summer2025-Internships/contents/.github/scripts/listings.json?ref=dev";

    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const metadata = await response.json();
      const downloadUrl = metadata.download_url;
      const jsonResponse = await fetch(downloadUrl);
      const jsonData = await jsonResponse.json(); // returns json file containing over 3000 unique job objects 
      
      return jsonData.slice(0, numberOfJobs); 
    } catch (err) {
      console.error("Error fetching the JSON file:", err);
    }
    return;
  }

  export const fetchAndStoreJobs = async () => {
    const totalNeeded = 50;
    const batchSize = 100;
    const maxAttempts = 2;

    // fetch active jobs from API
    const activeJobs = await fetchActiveJobs(totalNeeded, batchSize, maxAttempts);

    if (activeJobs.length === 0) {
        console.log("No active jobs found.");
        return;
    }

    // upsert jobs into db
    await Promise.all(activeJobs.map(upsertJob));
};

// fetch jobs from API with retry logic
const fetchActiveJobs = async (totalNeeded: number, batchSize: number, maxAttempts: number): Promise<APIJob[]> => {
  let activeJobs: APIJob[] = [];
  let attemptCount = 0;

  while (activeJobs.length < totalNeeded && attemptCount < maxAttempts) {
      attemptCount++;
      const jobs: APIJob[] = await fetchJobsFromAPI(batchSize);
      const filteredJobs = jobs.filter(job => job.active === true);
      activeJobs = [...activeJobs, ...filteredJobs];

      if (jobs.length < batchSize) break;
  }

  return activeJobs.slice(0, totalNeeded);
};
const formatJobForDB = (job: APIJob) => {
  if (!job.company_name || !job.season || !job.title) {
      throw new Error(`Missing fields in job data`);
  }

  return {
      jobLink: job.url,
      title: job.title,
      content: `Company: ${job.company_name} - Season: ${job.season}`,
      jobLevel: JobLevel.INTERNSHIP, // all jobs from the api are internships
      jobLocation: job.locations?.includes("Remote") ? JobLocation.REMOTE : JobLocation.ONSITE,
      jobHoursType: JobHourTypes.UNKNOWN,
      internship: true,
  };
};
// upsert job into database
const upsertJob = async (job: APIJob) => {
  try {
      const formattedJob = formatJobForDB(job);

      await prismaClient.job.upsert({
          where: { jobLink: formattedJob.jobLink },
          update: formattedJob, 
          create: formattedJob, 
      });
  } catch (err) {
      console.error("Error upserting job:", err);
  }
};
