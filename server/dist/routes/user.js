"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const error_handler_1 = require("../error-handler");
const auth_1 = __importDefault(require("../middlewares/auth"));
const upload_1 = __importDefault(require("../middlewares/upload"));
const userRoutes = (0, express_1.Router)();
userRoutes.get("/", (0, error_handler_1.errorHandler)(user_1.getUserHanlder));
userRoutes.patch("/", [auth_1.default, upload_1.default.single("image")], (0, error_handler_1.errorHandler)(user_1.updateUserHandler));
exports.default = userRoutes;
