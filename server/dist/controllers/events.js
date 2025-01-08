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
exports.createEventHandler = void 0;
const __1 = require("..");
const exceptions_1 = require("../exceptions/exceptions");
const root_1 = require("../exceptions/root");
const event_1 = require("../schema/event");
const eventService_1 = require("../services/eventService");
const createEventHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield __1.prismaClient.user.findUnique({
        where: { id: req.userId },
    });
    if (!user) {
        throw new exceptions_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    const request = event_1.eventSchema.parse(Object.assign({}, req.body)); // Perform Zod Validation First
    // Convert date string to JavaScript Date object
    const eventData = Object.assign(Object.assign({}, request), { date: new Date(request.date), userId: user.id });
    // call service
    const event = yield (0, eventService_1.createEvent)(eventData);
    return res.status(root_1.CREATED).json(event);
});
exports.createEventHandler = createEventHandler;
