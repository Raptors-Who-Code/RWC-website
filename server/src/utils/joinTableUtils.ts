import { prismaClient } from "..";

// Function to register a user for an event
export const registerUserForEvent = async (eventId: string, userId: string) => {
  return await prismaClient.registeredEvent.create({
    data: {
      userId,
      eventId,
    },
  });
};

// Function to apply a user for a job
export const applyUserForJob = async (jobId: string, userId: string) => {
  return await prismaClient.appliedJob.create({
    data: {
      userId,
      jobId,
    },
  });
};

// Function to unregister a user from an event. Use when a user wants to unregister from an event. But still keep the event in the database.
export const unregisterUserFromEvent = async (
  eventId: string,
  userId: string
) => {
  return await prismaClient.registeredEvent.deleteMany({
    where: {
      userId,
      eventId,
    },
  });
};

// Function to remove a user from a job. Use when a user wants to unregister from a job. But still keep the job in the database.
export const removeUserFromJob = async (jobId: string, userId: string) => {
  return await prismaClient.appliedJob.deleteMany({
    where: {
      userId,
      jobId,
    },
  });
};
