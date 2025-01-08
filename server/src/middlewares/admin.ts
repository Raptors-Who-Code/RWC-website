import { NextFunction, Request, Response } from "express";
import {
  NotFoundException,
  UnauthorizedException,
} from "../exceptions/exceptions";
import { ErrorCode } from "../exceptions/root";
import { RequestWithUser } from "../types/requestWithUser";
import { prismaClient } from "..";

const adminMiddleware = async (
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

  if (user.role == "ADMIN") {
    next();
  } else {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
};

export default adminMiddleware;
