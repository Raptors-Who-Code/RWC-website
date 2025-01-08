import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/exceptions";
import { CREATED, ErrorCode } from "../exceptions/root";
import { eventSchema } from "../schema/event";
import { createEvent } from "../services/eventService";
import { RequestWithUser } from "../types/requestWithUser";
import { Response } from "express";

export const createEventHandler = async (
  req: RequestWithUser,
  res: Response
) => {
  const user = await prismaClient.user.findUnique({
    where: { id: req.userId },
  });

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  const request = eventSchema.parse({
    ...req.body,
  }); // Perform Zod Validation First

  // Convert date string to JavaScript Date object
  const eventData = {
    ...request,
    date: new Date(request.date),
    userId: user.id,
  };

  // call service

  const event = await createEvent(eventData);

  return res.status(CREATED).json(event);
};
