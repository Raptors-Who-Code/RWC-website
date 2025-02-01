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
exports.getUsersForSidebarHandler = exports.getMessagesHandler = exports.sendMessageHandler = void 0;
const __1 = require("..");
const root_1 = require("../exceptions/root");
const exceptions_1 = require("../exceptions/exceptions");
const messageService_1 = require("../services/messageService");
const sendMessageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.userId;
    if (!message) {
        throw new exceptions_1.BadRequestsException("Message cannot be empty", root_1.ErrorCode.BAD_REQUEST);
    }
    if (!receiverId) {
        throw new exceptions_1.BadRequestsException("Receiver ID is required", root_1.ErrorCode.BAD_REQUEST);
    }
    if (!senderId) {
        throw new exceptions_1.BadRequestsException("Sender ID is required", root_1.ErrorCode.BAD_REQUEST);
    }
    if (senderId === receiverId) {
        throw new exceptions_1.BadRequestsException("Cannot send message to yourself", root_1.ErrorCode.BAD_REQUEST);
    }
    const sentMessage = yield (0, messageService_1.sendMessage)({ senderId, receiverId, message });
    res.status(root_1.CREATED).json(sentMessage);
});
exports.sendMessageHandler = sendMessageHandler;
const getMessagesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userToChatId } = req.params;
    const senderId = req.userId;
    if (!senderId) {
        throw new exceptions_1.BadRequestsException("Sender ID is required", root_1.ErrorCode.BAD_REQUEST);
    }
    if (senderId === userToChatId) {
        throw new exceptions_1.BadRequestsException("Cannot get messages you sent to yourself", root_1.ErrorCode.BAD_REQUEST);
    }
    const conversation = yield __1.prismaClient.conversation.findFirst({
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
        return res.status(root_1.OK).json([]);
    }
    return res.status(root_1.OK).json(conversation);
});
exports.getMessagesHandler = getMessagesHandler;
const getUsersForSidebarHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userGettingSidebar = req.userId;
    const users = yield __1.prismaClient.user.findMany({
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
    res.status(root_1.OK).json(users);
});
exports.getUsersForSidebarHandler = getUsersForSidebarHandler;
