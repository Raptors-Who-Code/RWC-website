import { prismaClient } from "..";
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
