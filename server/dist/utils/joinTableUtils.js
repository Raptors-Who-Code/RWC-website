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
exports.removeUserFromJob = exports.unregisterUserFromEvent = exports.applyUserForJob = exports.registerUserForEvent = void 0;
const __1 = require("..");
// Function to register a user for an event
const registerUserForEvent = (eventId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield __1.prismaClient.registeredEvent.create({
        data: {
            userId,
            eventId,
        },
    });
});
exports.registerUserForEvent = registerUserForEvent;
// Function to apply a user for a job
const applyUserForJob = (jobId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield __1.prismaClient.appliedJob.create({
        data: {
            userId,
            jobId,
        },
    });
});
exports.applyUserForJob = applyUserForJob;
// Function to unregister a user from an event. Use when a user wants to unregister from an event. But still keep the event in the database.
const unregisterUserFromEvent = (eventId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield __1.prismaClient.registeredEvent.deleteMany({
        where: {
            userId,
            eventId,
        },
    });
});
exports.unregisterUserFromEvent = unregisterUserFromEvent;
// Function to remove a user from a job. Use when a user wants to unregister from a job. But still keep the job in the database.
const removeUserFromJob = (jobId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield __1.prismaClient.appliedJob.deleteMany({
        where: {
            userId,
            jobId,
        },
    });
});
exports.removeUserFromJob = removeUserFromJob;
