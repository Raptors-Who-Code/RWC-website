import { Response } from "express";
import { RequestWithUser } from "../types/requestWithUser";
import { prismaClient } from "..";
import { CREATED, ErrorCode, OK } from "../exceptions/root";
import { BadRequestsException } from "../exceptions/exceptions";
import { sendMessage } from "../services/messageService";

export const sendMessageHandler = async (
  req: RequestWithUser,
  res: Response
) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.userId;

  if (!message) {
    throw new BadRequestsException(
      "Message cannot be empty",
      ErrorCode.BAD_REQUEST
    );
  }

  if (!receiverId) {
    throw new BadRequestsException(
      "Receiver ID is required",
      ErrorCode.BAD_REQUEST
    );
  }

  if (!senderId) {
    throw new BadRequestsException(
      "Sender ID is required",
      ErrorCode.BAD_REQUEST
    );
  }

  if (senderId === receiverId) {
    throw new BadRequestsException(
      "Cannot send message to yourself",
      ErrorCode.BAD_REQUEST
    );
  }

  const sentMessage = await sendMessage({ senderId, receiverId, message });

  res.status(CREATED).json(sentMessage);
};

export const getMessagesHandler = async (
  req: RequestWithUser,
  res: Response
) => {
  const { id: userToChatId } = req.params;
  const senderId = req.userId;

  if (!senderId) {
    throw new BadRequestsException(
      "Sender ID is required",
      ErrorCode.BAD_REQUEST
    );
  }

  if (senderId === userToChatId) {
    throw new BadRequestsException(
      "Cannot get messages you sent to yourself",
      ErrorCode.BAD_REQUEST
    );
  }

  const conversation = await prismaClient.conversation.findFirst({
    where: {
      participantIds: {
        hasEvery: [senderId, userToChatId],
      },
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc", // Last message will be at the end
        },
      },
    },
  });

  if (!conversation) {
    return res.status(OK).json([]);
  }

  return res.status(OK).json(conversation);
};

export const getUsersForSidebarHandler = async (
  req: RequestWithUser,
  res: Response
) => {
  const userGettingSidebar = req.userId;

  const users = await prismaClient.user.findMany({
    where: {
      id: {
        not: userGettingSidebar,
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      profilePicUrl: true,
    },
  });

  res.status(OK).json(users);
};
