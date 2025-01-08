import e from "express";
import { prismaClient } from "..";
import {
  ForbiddenException,
  NotFoundException,
} from "../exceptions/exceptions";
import { ErrorCode } from "../exceptions/root";

export interface Event {
  title: string;
  content: string;
  date: Date;
  userId: string;
}

export const createEvent = async (eventData: Event) => {
  const event = await prismaClient.event.create({
    data: {
      ...eventData,
    },
  });

  return event;
};

export const deleteEvent = async (eventId: string, userId: string) => {
  const event = await prismaClient.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new NotFoundException("Event not found", ErrorCode.EVENT_NOT_FOUND);
  }

  const user = await prismaClient.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  const isUsersEvent = event.userId === userId;
  const isUserAdmin = user.role === "ADMIN";

  if (!isUsersEvent && !isUserAdmin) {
    throw new ForbiddenException(
      "You are not authorized to delete this event",
      ErrorCode.UNAUTHORIZED
    );
  }

  const deletedEvent = await prismaClient.event.delete({
    where: { id: eventId },
  });

  if (!deletedEvent) {
    throw new NotFoundException("Event not found", ErrorCode.EVENT_NOT_FOUND);
  }

  return deletedEvent;
};

export const updatedEvent = () => {};
