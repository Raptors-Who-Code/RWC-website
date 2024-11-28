import { hashSync } from "bcrypt";
import { prismaClient } from "..";
import { ConflictException } from "../exceptions/exceptions";
import { ErrorCode } from "../exceptions/root";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_REFRESH_SECRET } from "../secrets";

export type CreateAccountParams = {
  name: string;
  email: string;
  password: string;
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

  const user = await prismaClient.user.create({
    data: {
      name: name,
      email: email,
      password: hashSync(password, 10),
      verified: false,
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

  return {
    user,
    accessToken,
    refreshToken,
  };
};
