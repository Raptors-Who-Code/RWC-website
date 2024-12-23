import { ErrorCode, OK } from "../exceptions/root";
import { prismaClient } from "..";
import { RequestWithUser } from "../types/requestWithUser";
import { Response } from "express";
import { NotFoundException } from "../exceptions/exceptions";

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
