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
exports.updatedEvent = exports.deleteEvent = exports.createEvent = void 0;
const __1 = require("..");
const exceptions_1 = require("../exceptions/exceptions");
const root_1 = require("../exceptions/root");
const createEvent = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield __1.prismaClient.event.create({
        data: Object.assign({}, eventData),
    });
    return event;
});
exports.createEvent = createEvent;
const deleteEvent = (eventId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield __1.prismaClient.event.findUnique({
        where: { id: eventId },
    });
    if (!event) {
        throw new exceptions_1.NotFoundException("Event not found", root_1.ErrorCode.EVENT_NOT_FOUND);
    }
    const user = yield __1.prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new exceptions_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    const isUsersEvent = event.userId === userId;
    const isUserAdmin = user.role === "ADMIN";
    if (!isUsersEvent && !isUserAdmin) {
        throw new exceptions_1.ForbiddenException("You are not authorized to delete this event", root_1.ErrorCode.UNAUTHORIZED);
    }
    const deletedEvent = yield __1.prismaClient.event.delete({
        where: { id: eventId },
    });
    if (!deletedEvent) {
        throw new exceptions_1.NotFoundException("Event not found", root_1.ErrorCode.EVENT_NOT_FOUND);
    }
    return deletedEvent;
});
exports.deleteEvent = deleteEvent;
const updatedEvent = () => { };
exports.updatedEvent = updatedEvent;
