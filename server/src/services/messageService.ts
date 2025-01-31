import { prismaClient } from "..";

interface MessageData {
  senderId: string;
  receiverId: string;
  message: string;
}

export const sendMessage = async (messageData: MessageData) => {
  const { senderId, receiverId, message } = messageData;

  let conversation = await prismaClient.conversation.findFirst({
    where: {
      participantIds: {
        hasEvery: [senderId, receiverId],
      },
    },
  });

  // If conversation does not exist, create a new one, first message sent between users
  if (!conversation) {
    conversation = await prismaClient.conversation.create({
      data: {
        participantIds: {
          set: [senderId, receiverId],
        },
      },
    });
  }

  const newMessage = await prismaClient.message.create({
    data: {
      senderId,
      body: message,
      conversationId: conversation.id,
    },
  });

  if (newMessage) {
    conversation = await prismaClient.conversation.update({
      where: {
        id: conversation.id,
      },
      data: {
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
    });
  }

  // #TODO: Setup socket.io

  return newMessage;
};
