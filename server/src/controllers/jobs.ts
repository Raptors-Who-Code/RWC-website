import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/exceptions";
import { CREATED, ErrorCode } from "../exceptions/root";
import { jobSchema } from "../schema/job";
import { RequestWithUser } from "../types/requestWithUser";
import { Response } from "express";
import { Role, UserData } from "../types/userTypes";
import { mapPrismaRoleToCustomRole } from "../utils/mapRoleToCustomRole";
import { createJob } from "../services/jobService";
import { JobLocation, JobHourTypes, JobLevel } from "../types/jobTypes";

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
    jobHoursType: JobHourTypes[request.jobHoursType as keyof typeof JobHourTypes],
    jobLevel: request.jobLevel ? JobLevel[request.jobLevel as keyof typeof JobLevel] : undefined,
  };

//   Call Service
  const job = createJob(jobData, userData);

  return res.status(CREATED).json(job);
};
