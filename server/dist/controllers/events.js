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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEventsHandler = exports.deleteEventHandler = exports.createEventHandler = void 0;
const __1 = require("..");
const exceptions_1 = require("../exceptions/exceptions");
const root_1 = require("../exceptions/root");
const event_1 = require("../schema/event");
const eventService_1 = require("../services/eventService");
const zod_1 = __importDefault(require("zod"));
const mapRoleToCustomRole_1 = require("../utils/mapRoleToCustomRole");
const base64_arraybuffer_1 = require("base64-arraybuffer");
const createEventHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    let fileBase64 = null;
    const user = yield __1.prismaClient.user.findUnique({
        where: { id: req.userId },
    });
    if (!user) {
        throw new exceptions_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    const request = event_1.eventSchema.parse(Object.assign({}, req.body)); // Perform Zod Validation First
    // Convert date string to JavaScript Date object
    const eventData = Object.assign(Object.assign({}, request), { date: new Date(request.date), userId: user.id });
    if (file) {
        fileBase64 = (0, base64_arraybuffer_1.decode)(file.buffer.toString("base64"));
    }
    // call service
    const roleWithCorrectType = (0, mapRoleToCustomRole_1.mapPrismaRoleToCustomRole)(user.role);
    // Need this because Prisma client returns the role as a type of $Enum.Role but we need it of type Role
    const userData = Object.assign(Object.assign({}, user), { role: roleWithCorrectType });
    const event = yield (0, eventService_1.createEvent)(eventData, userData, file, fileBase64);
    return res.status(root_1.CREATED).json(event);
});
exports.createEventHandler = createEventHandler;
const deleteEventHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = zod_1.default.string().parse(req.params.id);
    const userId = req.userId;
    if (!userId) {
        throw new exceptions_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    const deletedEvent = yield (0, eventService_1.deleteEvent)(eventId, userId);
    return res.status(root_1.DELETED).json({ message: "Event deleted" });
});
exports.deleteEventHandler = deleteEventHandler;
const getAllEventsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield __1.prismaClient.event.findMany();
    return res.status(root_1.OK).json(events);
});
exports.getAllEventsHandler = getAllEventsHandler;
