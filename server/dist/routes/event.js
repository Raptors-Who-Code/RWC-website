"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_handler_1 = require("../error-handler");
const auth_1 = __importDefault(require("../middlewares/auth"));
const events_1 = require("../controllers/events");
const verified_1 = require("../middlewares/verified");
const eventRoutes = (0, express_1.Router)();
eventRoutes.post("/", [auth_1.default, verified_1.verifiedMiddleware], (0, error_handler_1.errorHandler)(events_1.createEventHandler));
eventRoutes.delete("/:id", [auth_1.default, verified_1.verifiedMiddleware], (0, error_handler_1.errorHandler)(events_1.deleteEventHandler));
eventRoutes.get("/", (0, error_handler_1.errorHandler)(events_1.getAllEventsHandler));
exports.default = eventRoutes;
