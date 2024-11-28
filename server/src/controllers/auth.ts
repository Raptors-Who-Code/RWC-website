import { NextFunction, Request, RequestHandler, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import {
  NotFoundException,
  UnauthorizedException,
} from "../exceptions/exceptions";
import { CREATED, ErrorCode } from "../exceptions/root";
import { SignupSchema } from "../schema/user";
import { RequestWithUser } from "../types/requestWithUser";
import { createAccount } from "../services/authService";
import { setAuthCookies } from "../utils/cookies";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const request = SignupSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  }); // Perform Zod Validation First

  // call service

  const { user, accessToken, refreshToken } = await createAccount(request);

  // return response

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({
    where: { email: email },
  });

  if (!user) {
    throw new NotFoundException(
      "User does not exist",
      ErrorCode.USER_NOT_FOUND
    );
  }

  if (!compareSync(password, user.password)) {
    throw new UnauthorizedException(
      "Incorrect password!",
      ErrorCode.INCORRECT_PASSWORD
    );
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);

  // Do not send back hashed password back to frontend
  const { password: _, ...userWithoutPassword } = user;

  res.json({ user: userWithoutPassword, token });
};

export const me = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED);
  }

  const { password: _, ...userWithoutPassword } = req.user;

  // Do not send back hashed password back to frontend

  res.json(userWithoutPassword);
};
