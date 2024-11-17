import { NextFunction, Request, RequestHandler, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import {
  BadRequestsException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../exceptions/exceptions";
import { ErrorCode } from "../exceptions/root";
import { SignupSchema } from "../schema/user";
import { RequestWithUser } from "../types/requestWithUser";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SignupSchema.parse(req.body); // Perform Zod Validation First

  const { email, password, name } = req.body;

  const schoolDomain = "@montgomerycollege.edu";

  const guestLogin = !email.endsWith(schoolDomain);

  if (!email.endsWith(schoolDomain)) {
    // throw new BadRequestsException(
    //   "Invalid email domain",
    //   ErrorCode.INVALIDDOMAIN
    // );
  }

  let user = await prismaClient.user.findFirst({
    where: { email: email },
  });

  if (user) {
    throw new ConflictException(
      "User already exists",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
      verified: false,
    },
  });

  // Do not send back hashed password back to frontend
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
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
