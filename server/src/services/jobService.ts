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
