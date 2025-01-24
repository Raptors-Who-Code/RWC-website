import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/exceptions";
import { ErrorCode } from "../exceptions/root";
import { Job } from "../types/jobTypes";
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