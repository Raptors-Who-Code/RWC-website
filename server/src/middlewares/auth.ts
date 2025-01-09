import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/exceptions";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import { RequestWithUser } from "../types/requestWithUser";
import { verifyToken } from "../utils/jwt";

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken as string | undefined;

  if (!token) {
    return next(
      new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED)
    );
  }

  try {
    const { error, payload } = verifyToken(token);

    if (!payload) {
      return next(
        new UnauthorizedException(
          error === "jwt expired" ? "Token expired" : "Invalid token",
          ErrorCode.INVALID_ACCESS_TOKEN
        )
      );
    }

    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });

    if (!user) {
      return next(
        new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED)
      );
    }

    req.userId = payload.userId;
    req.sessionId = payload.sessionId;

    next();
  } catch (err) {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
};

export default authMiddleware;
