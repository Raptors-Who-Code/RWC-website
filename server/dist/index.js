"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const client_1 = require("@prisma/client");
const routes_1 = __importDefault(require("./routes"));
const errors_1 = require("./middlewares/errors");
require("./services/jobScheduler");
const secrets_1 = require("./secrets");
const WebSocketServer_1 = require("./socket/WebSocketServer");
const http_1 = __importDefault(require("http"));
/* Route imports */
/* Configurations */
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    origin: secrets_1.APP_ORIGIN,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
/* Routes */
app.use("/api", routes_1.default);
/* Middlewares */
app.use(errors_1.errorMiddleWare);
/* Create Prisma Client Instance*/
exports.prismaClient = new client_1.PrismaClient({
    log: ["query"],
});
// Create HTTP Server
const server = http_1.default.createServer(app);
/**Create Web Socket Server */
const corsOptions = {
    cors: {
        origin: secrets_1.APP_ORIGIN,
        credentials: true,
        methods: ["GET", "POST"],
    },
};
const webSocketServer = new WebSocketServer_1.WebSocketServer(server, corsOptions);
const port = process.env.PORT || 8001;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
