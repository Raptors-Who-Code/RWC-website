import { prismaClient } from "..";
import {
  NotFoundException,
  UnauthorizedException,
} from "../exceptions/exceptions";
import { CREATED, DELETED, ErrorCode } from "../exceptions/root";
import { eventSchema } from "../schema/event";
import { createEvent, deleteEvent } from "../services/eventService";
import { RequestWithUser } from "../types/requestWithUser";
import { Request, Response } from "express";
import z from "zod";

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

export const deleteEventHandler = async (
  req: RequestWithUser,
  res: Response
) => {
  const eventId = z.string().parse(req.params.id);
  const userId = req.userId;

  if (!userId) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  const deletedEvent = await deleteEvent(eventId, userId);

  return res.status(DELETED).json({ message: "Event deleted" });
};
