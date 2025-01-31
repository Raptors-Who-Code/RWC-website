"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const __1 = require("..");
const sendMessage = (messageData) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receiverId, message } = messageData;
    let conversation = yield __1.prismaClient.conversation.findFirst({
        where: {
            participantIds: {
                hasEvery: [senderId, receiverId],
            },
        },
    });
    // If conversation does not exist, create a new one, first message sent between users
    if (!conversation) {
        conversation = yield __1.prismaClient.conversation.create({
            data: {
                participantIds: {
                    set: [senderId, receiverId],
                },
            },
        });
    }
    const newMessage = yield __1.prismaClient.message.create({
        data: {
            senderId,
            body: message,
            conversationId: conversation.id,
        },
    });
    if (newMessage) {
        conversation = yield __1.prismaClient.conversation.update({
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
});
exports.sendMessage = sendMessage;
