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
exports.getSessionHandler = void 0;
const __1 = require("..");
const root_1 = require("../exceptions/root");
const getSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessions = yield __1.prismaClient.session.findMany({
        where: {
            userId: req.userId, // Filter by userId
            expiresAt: { gt: new Date() }, // Greater than the current time
        },
        select: {
            id: true, // Select the ID field
            userAgent: true, // Select the userAgent field
            createdAt: true, // Select the createdAt field
        },
        orderBy: {
            createdAt: "desc", // Sort by createdAt descending
        },
    });
    return res.status(root_1.OK).json(sessions.map((session) => (Object.assign(Object.assign({}, session), (session.id === req.sessionId && { isCurrent: true })))));
});
exports.getSessionHandler = getSessionHandler;
