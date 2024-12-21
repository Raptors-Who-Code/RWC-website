import { NextFunction, Request, RequestHandler, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import {
  NotFoundException,
  UnauthorizedException,
} from "../exceptions/exceptions";
import { CREATED, ErrorCode, OK } from "../exceptions/root";
import { LoginSchema, SignupSchema } from "../schema/user";
import { RequestWithUser } from "../types/requestWithUser";
import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
} from "../services/authService";
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthCookies,
} from "../utils/cookies";
import { verifyToken } from "../utils/jwt";

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
  // Perform Zod Validation First
  const request = LoginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call service

  const { accessToken, refreshToken } = await loginUser(request);

  // return response
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: "Login Sucessful" });
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  const { payload } = verifyToken(accessToken || "");

  if (!accessToken) {
    return res.status(401).json({ message: "Access token not provided" });
  }

  // If there is a valid token delete that user's session
  if (payload) {
    await prismaClient.session.delete({ where: { id: payload.sessionId } });
  }

  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Logout successful" });
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

export const refreshHanlder = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken as string | undefined;

  if (!refreshToken) {
    console.log("Inside missing resfresh token check", refreshToken);
    throw new UnauthorizedException(
      "Missing refresh Token",
      ErrorCode.UNAUTHORIZED
    );
  }

  const { accessToken, newRefreshToken } = await refreshUserAccessToken(
    refreshToken
  );

  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }

  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({ message: "Access token refreshed" });
};
