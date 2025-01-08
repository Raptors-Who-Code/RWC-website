import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "../types/requestWithUser";
import {
  NotFoundException,
  UnauthorizedException,
} from "../exceptions/exceptions";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "..";

export const verifiedMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  if (!userId) {
    return next(
      new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED)
    );
  }

  const user = await prismaClient.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return next(
      new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND)
    );
  }

  if (user.verified) {
    next();
  } else {
    next(
      new UnauthorizedException("User is not verified", ErrorCode.UNAUTHORIZED)
    );
  }
};
