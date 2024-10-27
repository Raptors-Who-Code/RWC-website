import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../exceptions/exceptions";
import { ErrorCode } from "../exceptions/root";
import { SignupSchema } from "../schema/user";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SignupSchema.parse(req.body); // Perform Zod Validation First

  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({
    where: { email: email },
  });

  if (user) {
    return new ConflictException(
      "User already exists",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
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
    return new NotFoundException(
      "User does not exist",
      ErrorCode.USER_NOT_FOUND
    );
  }

  if (!compareSync(password, user.password)) {
    return new UnauthorizedException(
      "Incorrect password!",
      ErrorCode.INCORRECT_PASSWORD
    );
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);

  // Do not send back hashed password back to frontend
  const { password: _, ...userWithoutPassword } = user;

  res.json({ user: userWithoutPassword, token });
};
