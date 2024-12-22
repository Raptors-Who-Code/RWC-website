import { compareSync, hashSync } from "bcrypt";
import { prismaClient } from "..";
import {
  ConflictException,
  InternalException,
  NotFoundException,
  UnauthorizedException,
} from "../exceptions/exceptions";
import { ErrorCode } from "../exceptions/root";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_REFRESH_SECRET } from "../secrets";
import {
  ONE_DAY_IN_MS,
  oneYearFromNow,
  thirtyDaysFromNow,
} from "../utils/date";
import { VerificationCodeType } from "@prisma/client";
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from "../utils/jwt";

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

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });

  if (!payload) {
    throw new UnauthorizedException(
      "Invalid refresh token",
      ErrorCode.UNAUTHORIZED
    );
  }

  const session = await prismaClient.session.findUnique({
    where: { id: payload.sessionId },
  });

  const now = Date.now();

  if (!session || session.expiresAt.getTime() < now) {
    throw new UnauthorizedException("Session Expired", ErrorCode.UNAUTHORIZED);
  }

  // refresh the token if it expires in the next 24 hours

  const sessionNeedsRefresh =
    session.expiresAt.getTime() - now <= ONE_DAY_IN_MS;

  if (sessionNeedsRefresh) {
    session.expiresAt = thirtyDaysFromNow();
    await prismaClient.session.update({
      where: { id: session.id },
      data: { expiresAt: session.expiresAt },
    });
  }

  const newRefreshToken = sessionNeedsRefresh
    ? signToken({ sessionId: session.id }, refreshTokenSignOptions)
    : undefined;

  const accessToken = signToken({
    userId: session.userId,
    sessionId: session.id,
  });

  return { accessToken, newRefreshToken };
};

export const verifyEmail = async (code: string) => {
  // get the verification code
  const validCode = await prismaClient.verificationCode.findFirst({
    where: {
      id: code,
      type: VerificationCodeType.EMAIL_VERIFICATION,
      expiresAt: { gt: new Date() },
    },
  });

  if (!validCode) {
    throw new UnauthorizedException(
      "Invalid verification code",
      ErrorCode.INVALID_VERIFICATION_CODE
    );
  }

  // update user to verified true
  const updatedUser = await prismaClient.user.update({
    where: { id: validCode.userId },
    data: { verified: true },
  });

  if (!updatedUser) {
    throw new InternalException(
      "Failed to verify email",
      ErrorCode.INTERNALEXCEPTION
    );
  }

  // delete verification code
  await prismaClient.verificationCode.delete({ where: { id: code } });
  // return user

  //Do not return password with user object
  const { password: userPassword, ...userWithoutPassword } = updatedUser;

  return { user: userWithoutPassword };
};
