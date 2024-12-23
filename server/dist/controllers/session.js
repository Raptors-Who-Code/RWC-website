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
exports.deleteSessionHandler = exports.getSessionHandler = void 0;
const __1 = require("..");
const root_1 = require("../exceptions/root");
const zod_1 = __importDefault(require("zod"));
const exceptions_1 = require("../exceptions/exceptions");
const library_1 = require("@prisma/client/runtime/library");
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
const deleteSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = zod_1.default.string().parse(req.params.id);
    try {
        const deleted = yield __1.prismaClient.session.delete({
            where: { id: sessionId, userId: req.userId },
        });
        // Will not be reached since prismaClient will throw an error if the session is not found
        if (!deleted) {
            throw new exceptions_1.NotFoundException("Session not found", root_1.ErrorCode.SESSION_NOT_FOUND);
        }
        if (sessionId === req.sessionId) {
            throw new exceptions_1.ForbiddenException("Cannot delete current session", root_1.ErrorCode.CANNOT_DELETE_CURRENT_SESSION);
        }
        return res.status(root_1.OK).json({ message: "Session removed" });
    }
    catch (error) {
        if (error instanceof library_1.PrismaClientKnownRequestError &&
            error.code === "P2025") {
            throw new exceptions_1.NotFoundException("Session not found", root_1.ErrorCode.SESSION_NOT_FOUND);
        }
        throw error;
    }
});
exports.deleteSessionHandler = deleteSessionHandler;
