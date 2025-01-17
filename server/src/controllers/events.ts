import { prismaClient } from "..";
import {
  NotFoundException,
  UnauthorizedException,
} from "../exceptions/exceptions";
import { CREATED, DELETED, ErrorCode, OK } from "../exceptions/root";
import { eventSchema } from "../schema/event";
import { createEvent, deleteEvent } from "../services/eventService";
import { RequestWithUser } from "../types/requestWithUser";
import { Request, Response } from "express";
import z from "zod";
import { Role, UserData } from "../types/userTypes";
import { mapPrismaRoleToCustomRole } from "../utils/mapRoleToCustomRole";
import { decode } from "base64-arraybuffer";
import { Event } from "../types/eventTypes";

export const createEventHandler = async (
  req: RequestWithUser,
  res: Response
) => {
  const file = req.file;
  let fileBase64 = null;

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

  if (file) {
    fileBase64 = decode(file.buffer.toString("base64"));
  }

  // call service
  const roleWithCorrectType: Role = mapPrismaRoleToCustomRole(user.role);
  // Need this because Prisma client returns the role as a type of $Enum.Role but we need it of type Role

  const userData: UserData = {
    ...user,
    role: roleWithCorrectType,
  };

  const event = await createEvent(eventData, userData, file, fileBase64);

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

export const getAllEventsHandler = async (req: Request, res: Response) => {
  const events = await prismaClient.event.findMany();

  return res.status(OK).json(events);
};
