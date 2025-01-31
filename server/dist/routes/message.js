"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_1 = require("../controllers/messages");
const auth_1 = __importDefault(require("../middlewares/auth"));
const error_handler_1 = require("../error-handler");
const messageRoutes = (0, express_1.Router)();
messageRoutes.post("/send/:id", [auth_1.default], (0, error_handler_1.errorHandler)(messages_1.sendMessageHandler));
exports.default = messageRoutes;
