import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/exceptions";
import { CREATED, DELETED, ErrorCode, OK } from "../exceptions/root";
import { jobSchema } from "../schema/job";
import { RequestWithUser } from "../types/requestWithUser";
import { Response } from "express";
import { Role, UserData } from "../types/userTypes";
import { mapPrismaRoleToCustomRole } from "../utils/mapRoleToCustomRole";
import { createJob, deleteJob, fetchAndStoreJobs } from "../services/jobService";
import { JobLocation, JobHourTypes, JobLevel, Job, APIJob } from "../types/jobTypes";
import { z } from "zod";

export const createJobHanlder = async (req: RequestWithUser, res: Response) => {
  // Perform Zod Validation First
  const request = jobSchema.parse({ ...req.body });

  // Make sure user exists
  const user = await prismaClient.user.findUnique({
    where: { id: req.userId },
  });

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  const roleWithCorrectType: Role = mapPrismaRoleToCustomRole(user.role);
  // Need this because Prisma client returns the role as a type of $Enum.Role but we need it of type Role

  const userData: UserData = {
    ...user,
    role: roleWithCorrectType,
  };

  const jobData = {
    ...request,
    userId: user.id,
    jobLocation: JobLocation[request.jobLocation as keyof typeof JobLocation],
    jobHoursType:
      JobHourTypes[request.jobHoursType as keyof typeof JobHourTypes],
    jobLevel: request.jobLevel
      ? JobLevel[request.jobLevel as keyof typeof JobLevel]
      : undefined,
  };

  //   Call Service
  const job = await createJob(jobData, userData);

  return res.status(CREATED).json(job);
};

export const deleteJobHandler = async (req: RequestWithUser, res: Response) => {
  const jobId = z.string().parse(req.params.id);
  const userId = req.userId;

  if (!userId) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  const deletedJob = await deleteJob(jobId, userId);

  return res.status(DELETED).json({ message: "Job deleted successfully" });
};

export const getAllJobsHandler = async (req: Request, res: Response) => {
  const jobs = await prismaClient.job.findMany();

  return res.status(OK).json(jobs);
};

export const jobAPIHandler = async (req: Request, res: Response) => {
  try {
    await fetchAndStoreJobs();
    res.status(200).json({ message: "Jobs added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
}; 
