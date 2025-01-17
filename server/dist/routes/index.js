"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const auth_2 = __importDefault(require("../middlewares/auth"));
const session_1 = __importDefault(require("./session"));
const event_1 = __importDefault(require("./event"));
const job_1 = __importDefault(require("./job"));
const rootRouter = (0, express_1.Router)();
rootRouter.use("/auth", auth_1.default);
rootRouter.use("/user", [auth_2.default], user_1.default);
rootRouter.use("/sessions", [auth_2.default], session_1.default);
rootRouter.use("/events", event_1.default);
rootRouter.use("/jobs", job_1.default);
exports.default = rootRouter;
