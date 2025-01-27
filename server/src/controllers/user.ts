import { ErrorCode, OK } from "../exceptions/root";
import { prismaClient } from "..";
import { RequestWithUser } from "../types/requestWithUser";
import { Response } from "express";
import { NotFoundException } from "../exceptions/exceptions";
import { updatedUserSchema } from "../schema/user";
import { decode } from "base64-arraybuffer";
import { updateUser } from "../services/userService";
import { Role, UserData } from "../types/userTypes";
import { mapPrismaRoleToCustomRole } from "../utils/mapRoleToCustomRole";

export const getUserHanlder = async (req: RequestWithUser, res: Response) => {
  const user = await prismaClient.user.findUnique({
    where: { id: req.userId },
  });

  // Do not send password to frontend

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  const { password: userPassword, ...userWithoutPassword } = user;

  return res.status(OK).json(userWithoutPassword);
};

export const updateUserHandler = async (
  req: RequestWithUser,
  res: Response
) => {
  const profilePicFile = req.file;
  let profilePicBase64 = null;

  const user = await prismaClient.user.findUnique({
    where: { id: req.userId },
  });

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  const request = updatedUserSchema.parse({ ...req.body });

  if (profilePicFile) {
    profilePicBase64 = decode(profilePicFile.buffer.toString("base64"));
  }

  const roleWithCorrectType: Role = mapPrismaRoleToCustomRole(user.role);
  // Need this because Prisma client returns the role as a type of $Enum.Role but we need it of type Role

  const userData: UserData = {
    ...user,
    role: roleWithCorrectType,
  };

  const updatedUser = updateUser(userData, request);
};
