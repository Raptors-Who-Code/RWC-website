"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const error_handler_1 = require("../error-handler");
const auth_2 = __importDefault(require("../middlewares/auth"));
const authRoutes = (0, express_1.Router)();
authRoutes.post("/signup", (0, error_handler_1.errorHandler)(auth_1.signup));
authRoutes.post("/login", (0, error_handler_1.errorHandler)(auth_1.login));
authRoutes.get("/refresh", (0, error_handler_1.errorHandler)(auth_1.refreshHanlder));
authRoutes.get("/logout", [auth_2.default], (0, error_handler_1.errorHandler)(auth_1.logout));
authRoutes.get("/email/verify/:code", (0, error_handler_1.errorHandler)(auth_1.verifyEmailHandler));
authRoutes.post("/password/forgot", (0, error_handler_1.errorHandler)(auth_1.sendPasswordResetHandler)); //first
authRoutes.post("/password/reset", (0, error_handler_1.errorHandler)(auth_1.resetPasswordHandler));
exports.default = authRoutes;
