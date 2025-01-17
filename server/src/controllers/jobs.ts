import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/exceptions";
import { CREATED, ErrorCode } from "../exceptions/root";
import { jobSchema } from "../schema/job";
import { RequestWithUser } from "../types/requestWithUser";
import { Response } from "express";
import { Role, UserData } from "../types/userTypes";
import { mapPrismaRoleToCustomRole } from "../utils/mapRoleToCustomRole";
import { createJob } from "../services/jobService";

export const createJobHanlder = async (req: RequestWithUser, res: Response) => {
  // Perform Zod Validation First
  const jobData = jobSchema.parse({ ...req.body });

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

  // Call Service
  const job = createJob(jobData, userData);

  return res.status(CREATED).json(job);
};
