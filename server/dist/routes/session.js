"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_handler_1 = require("../error-handler");
const session_1 = require("../controllers/session");
const sessionRoutes = (0, express_1.Router)();
sessionRoutes.get("/", (0, error_handler_1.errorHandler)(session_1.getSessionHandler));
sessionRoutes.delete("/:id", (0, error_handler_1.errorHandler)(session_1.deleteSessionHandler));
exports.default = sessionRoutes;
