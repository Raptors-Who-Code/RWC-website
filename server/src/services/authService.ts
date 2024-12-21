import { compareSync, hashSync } from "bcrypt";
import { prismaClient } from "..";
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../exceptions/exceptions";
import { ErrorCode } from "../exceptions/root";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_REFRESH_SECRET } from "../secrets";
import { oneYearFromNow } from "../utils/date";
import { VerificationCodeType } from "@prisma/client";
import { refreshTokenSignOptions, signToken } from "../utils/jwt";

export type CreateAccountParams = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  const existingUser = await prismaClient.user.findFirst({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new ConflictException(
      "User already exists",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }

  const { name, email, password, userAgent } = data;

  // Create User

  const user = await prismaClient.user.create({
    data: {
      name: name,
      email: email,
      password: hashSync(password, 10),
      verified: false,
    },
  });

  // Create Verification Code

  const verificationCode = await prismaClient.verificationCode.create({
    data: {
      userId: user.id,
      type: VerificationCodeType.EMAIL_VERIFICATION,
      expiresAt: oneYearFromNow(),
    },
  });

  //TODO: Send verification email

  // create session

  const session = await prismaClient.session.create({
    data: {
      userId: user.id,
      userAgent: userAgent,
    },
  });

  // sign access token and refresh token

  const refreshToken = jwt.sign({ sessionId: session.id }, JWT_REFRESH_SECRET, {
    audience: ["user"],
    expiresIn: "30d",
  });

  const accessToken = jwt.sign(
    { userId: user.id, sessionId: session.id },
    JWT_SECRET,
    {
      audience: ["user"],
      expiresIn: "15m",
    }
  );

  // return user and tokens

  // Do not return password with user object
  const { password: userPassword, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

export type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const loginUser = async ({
  email,
  password,
  userAgent,
}: LoginParams) => {
  // get the user by email

  const user = await prismaClient.user.findFirst({
    where: { email },
  });

  if (!user) {
    throw new NotFoundException(
      "Invalid email or password",
      ErrorCode.USER_NOT_FOUND
    );
  }

  // validate password from the request

  if (!compareSync(password, user.password)) {
    throw new UnauthorizedException(
      "Invalid email or password",
      ErrorCode.INCORRECT_PASSWORD
    );
  }

  const userId = user.id;

  // create a session

  const session = await prismaClient.session.create({
    data: {
      userId: userId,
      userAgent: userAgent,
    },
  });

  const sessionInfo = { sessionId: session.id };

  // sign access token and refresh token

  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);
  const accessToken = signToken({ ...sessionInfo, userId: user.id });

  // return user and tokens
  //Do not return password with user object
  const { password: userPassword, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, accessToken, refreshToken };
};
