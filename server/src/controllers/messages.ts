import { Response } from "express";
import { RequestWithUser } from "../types/requestWithUser";
import { prismaClient } from "..";
import { CREATED, ErrorCode } from "../exceptions/root";
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

  const sentMessage = sendMessage({ senderId, receiverId, message });

  res.status(CREATED).json(sentMessage);
};
