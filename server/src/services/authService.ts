import { compareSync, hashSync } from "bcrypt";
import { prismaClient } from "..";
import {
  ConflictException,
  InternalException,
  NotFoundException,
  TooManyRequestsException,
  UnauthorizedException,
} from "../exceptions/exceptions";
import { ErrorCode } from "../exceptions/root";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_REFRESH_SECRET, APP_ORIGIN } from "../secrets";
import {
  fiveMinutesAgo,
  ONE_DAY_IN_MS,
  oneHourFromNow,
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
import {
  getPasswordResetTemplate,
  getVerifyEmailTemplate,
} from "../utils/emailTemplates";
import { sendMail } from "../utils/sendMail";
import { v4 as uuidv4 } from "uuid";
import { generateDefaultProfilePicture } from "../utils/generateDefaultProfilePic";
import supabase from "../utils/supabaseStorage";

export type CreateAccountParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userAgent?: string;
};

export const createAccount = async (userData: CreateAccountParams) => {
  const existingUser = await prismaClient.user.findFirst({
    where: { email: userData.email },
  });

  if (existingUser) {
    throw new ConflictException(
      "User already exists",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }

  const { firstName, lastName, email, password, userAgent } = userData;

  // Create User

  const user = await prismaClient.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashSync(password, 10),
      verified: false,
      profilePicUrl: "",
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

  const url = `${APP_ORIGIN}/verify-email/${verificationCode.id}`;

  // Send verification email
  try {
    await sendMail({
      to: user.email,
      ...getVerifyEmailTemplate(url),
    });
  } catch (error) {
    console.log(error);
  }

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

  // Create Image file path

  const uniqueImageName = `${uuidv4()}-${user.id}.png`;

  const filePath = `users/${user.id}/profile/${uniqueImageName}`;

  // Generate default profile picture

  const defaultProfilePic = await generateDefaultProfilePicture(
    user.firstName,
    user.lastName
  );

  // Upload image to Supabase Storage

  const { data, error } = await supabase.storage
    .from("images")
    .upload(filePath, defaultProfilePic, {
      contentType: "image/png",
    });

  if (error) {
    console.log("Error uploading image", error);
    throw new InternalException(
      "Failed to upload image to Supabase Storage",
      ErrorCode.UPLOAD_FAILED
    );
  }

  // get public url of the uploaded file

  const { data: image } = supabase.storage
    .from("images")
    .getPublicUrl(data.path);

  // update user with profile picture
  const updatedUser = await prismaClient.user.update({
    where: { id: user.id },
    data: {
      profilePicUrl: image.publicUrl,
    },
  });

  // Do not return password with user object
  const { password: userPassword, ...userWithoutPassword } = updatedUser;
  // return user and tokens
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

export const sendPasswordResetEmail = async (email: string) => {
  // Catch any erros that were thrown and log them ( but always return a success )
  // Prevents leaking sensitive data back to the client (e.g. user not found, email not sent)

  // get the user by email

  try {
    const user = await prismaClient.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }
    // check email rate limit

    const fiveMinAgo = fiveMinutesAgo();

    const count = await prismaClient.verificationCode.count({
      where: {
        userId: user.id,
        type: VerificationCodeType.PASSWORD_RESET,
        createdAt: { gte: fiveMinAgo },
      },
    });

    if (!(count <= 1)) {
      throw new TooManyRequestsException(
        "Too many requests, please try again later",
        ErrorCode.TOO_MANY_REQUESTS
      );
    }

    // create verification code

    const expiresAt = oneHourFromNow();

    const verificationCode = await prismaClient.verificationCode.create({
      data: {
        userId: user.id,
        type: VerificationCodeType.PASSWORD_RESET,
        expiresAt,
      },
    });

    // send verification email

    const url = `${APP_ORIGIN}/password/reset?code=${
      verificationCode.id
    }&exp=${expiresAt.getTime()}`;

    const { data, error } = await sendMail({
      to: user.email,
      ...getPasswordResetTemplate(url),
    });

    if (!data?.id) {
      throw new InternalException(
        `${error?.name} - ${error?.message}`,
        ErrorCode.INTERNALEXCEPTION
      );
    }
    // return success message

    return { url, emailId: data.id };
  } catch (error: any) {
    console.log("SendPasswordResetError:", error.message);
    return {};
  }
};

type ResetPasswordParams = {
  password: string;
  verificationCode: string;
};

export const resetPassword = async ({
  password,
  verificationCode,
}: ResetPasswordParams) => {
  // get verification code

  const validCode = await prismaClient.verificationCode.findFirst({
    where: {
      id: verificationCode,
      type: VerificationCodeType.PASSWORD_RESET,
      expiresAt: { gt: new Date() },
    },
  });

  if (!validCode) {
    throw new UnauthorizedException(
      "Invalid verification code",
      ErrorCode.INVALID_VERIFICATION_CODE
    );
  }

  // update users password

  const updatedUser = await prismaClient.user.update({
    where: { id: validCode.userId },
    data: { password: hashSync(password, 10) },
  });

  if (!updatedUser) {
    throw new InternalException(
      "Failed to reset password",
      ErrorCode.INTERNALEXCEPTION
    );
  }
  // delete the verification code

  await prismaClient.verificationCode.delete({
    where: { id: verificationCode },
  });
  // delete all sessions

  await prismaClient.session.deleteMany({
    where: { userId: updatedUser.id },
  });

  // Do not return user's password

  const { password: userPassword, ...userWithoutPassword } = updatedUser;

  return { user: userWithoutPassword };
};
