import { prismaClient } from "..";
import { RequestWithUser } from "../types/requestWithUser";
import { Response } from "express";
import { OK } from "../exceptions/root";

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
