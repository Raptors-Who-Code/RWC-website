"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const error_handler_1 = require("../error-handler");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/", (0, error_handler_1.errorHandler)(user_1.getUserHanlder));
exports.default = userRoutes;
