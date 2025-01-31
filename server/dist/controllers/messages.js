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
exports.sendMessageHandler = void 0;
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
    const sentMessage = (0, messageService_1.sendMessage)({ senderId, receiverId, message });
    res.status(root_1.CREATED).json(sentMessage);
});
exports.sendMessageHandler = sendMessageHandler;
