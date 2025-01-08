import e from "express";
import { prismaClient } from "..";

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

export const updatedEvent = () => {};

export const deleteEvent = () => {};
