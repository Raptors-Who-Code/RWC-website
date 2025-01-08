import { prismaClient } from "..";
import { RequestWithUser } from "../types/requestWithUser";
import { Response } from "express";
import { ErrorCode, DELETED, OK } from "../exceptions/root";
import z from "zod";
import {
  ForbiddenException,
  NotFoundException,
} from "../exceptions/exceptions";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const getSessionHandler = async (
  req: RequestWithUser,
  res: Response
) => {
  const sessions = await prismaClient.session.findMany({
    where: {
      userId: req.userId, // Filter by userId
      expiresAt: { gt: new Date() }, // Greater than the current time
    },
    select: {
      id: true, // Select the ID field
      userAgent: true, // Select the userAgent field
      createdAt: true, // Select the createdAt field
    },
    orderBy: {
      createdAt: "desc", // Sort by createdAt descending
    },
  });

  return res.status(OK).json(
    sessions.map((session) => ({
      ...session,
      ...(session.id === req.sessionId && { isCurrent: true }),
    }))
  );
};

export const deleteSessionHandler = async (
  req: RequestWithUser,
  res: Response
) => {
  const sessionId = z.string().parse(req.params.id);

  try {
    const deleted = await prismaClient.session.delete({
      where: { id: sessionId, userId: req.userId },
    });

    // Will not be reached since prismaClient will throw an error if the session is not found
    if (!deleted) {
      throw new NotFoundException(
        "Session not found",
        ErrorCode.SESSION_NOT_FOUND
      );
    }

    if (sessionId === req.sessionId) {
      throw new ForbiddenException(
        "Cannot delete current session",
        ErrorCode.CANNOT_DELETE_CURRENT_SESSION
      );
    }

    return res.status(DELETED).json({ message: "Session removed" });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new NotFoundException(
        "Session not found",
        ErrorCode.SESSION_NOT_FOUND
      );
    }

    throw error;
  }
};
